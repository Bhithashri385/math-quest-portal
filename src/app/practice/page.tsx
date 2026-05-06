"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProtectedParent } from "@/components/ProtectedParent";
import { AppHeader } from "@/components/AppHeader";
import { getSelectedChild } from "@/lib/childSelection";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import type { SelectedChild } from "@/lib/childSelection";
import type { PracticeQuestion, PracticeResponse } from "@/types/practice";

type AnswerState = {
  value: string;
  submitted: boolean;
  isCorrect: boolean | null;
};

export default function PracticePage() {
  return (
    <ProtectedParent>
      <AppHeader />
      <PracticeInner />
    </ProtectedParent>
  );
}

function PracticeInner() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [child, setChild] = useState<SelectedChild | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [skillsTargeted, setSkillsTargeted] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [finishing, setFinishing] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setChild(getSelectedChild());
  }, []);

  const current = questions[idx];

  function getAnswer(q: PracticeQuestion | undefined): AnswerState {
    if (!q) return { value: "", submitted: false, isCorrect: null };
    return answers[q.id] || { value: "", submitted: false, isCorrect: null };
  }

  async function startMission() {
    setError(null);
    setFinished(false);
    setQuestions([]);
    setAnswers({});
    setIdx(0);

    if (!child) {
      setError("Please select a child profile first.");
      return;
    }

    setLoading(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) throw new Error("Not signed in.");

      const res = await fetch("/api/practice", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          accessToken: token,
          child: { id: child.id, grade: child.grade },
          count: 12
        })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to start practice.");
      }
      const data = (await res.json()) as PracticeResponse;
      setQuestions(data.questions);
      setSkillsTargeted(data.skillsTargeted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start practice.");
    } finally {
      setLoading(false);
    }
  }

  function submitCurrent() {
    if (!current) return;
    const a = getAnswer(current);
    const cleaned = a.value.trim();
    const isCorrect = cleaned.length ? cleaned === current.expectedAnswer : false;

    setAnswers((prev) => ({
      ...prev,
      [current.id]: { value: a.value, submitted: true, isCorrect }
    }));
  }

  async function finishAndSave() {
    if (!child) return;
    setError(null);
    setFinishing(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) throw new Error("Not signed in.");

      // Save one attempt per question using /api/attempts (which also updates skill_states)
      for (const q of questions) {
        const a = answers[q.id];
        const val = a?.value?.trim() || "";
        const isCorrect = val.length ? val === q.expectedAnswer : false;

        const res = await fetch("/api/attempts", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            accessToken: token,
            attempt: {
              child_id: child.id,
              input_type: "text",
              problem_text: q.prompt,
              mode: "try",
              student_answer: val || null,
              is_correct: isCorrect,
              final_answer: q.expectedAnswer,
              ai_steps: [],
              skill_tags: [q.skill]
            }
          })
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to save practice results.");
        }
      }

      setFinished(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save practice results."
      );
    } finally {
      setFinishing(false);
    }
  }

  const correctCount = questions.filter((q) => answers[q.id]?.isCorrect).length;

  return (
    <main>
      <div className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h1 style={{ marginTop: 0, marginBottom: 0 }}>Practice (5‑minute mission)</h1>
          <div className="row">
            <Link className="btn" href="/home">
              Back to home
            </Link>
            <Link className="btn" href="/parent">
              Parent dashboard
            </Link>
          </div>
        </div>

        {child ? (
          <p className="muted" style={{ marginTop: 8 }}>
            For <strong>{child.name}</strong> • Grade {child.grade}
          </p>
        ) : (
          <p className="error" style={{ marginTop: 8 }}>
            No child selected. Please go to <Link href="/kids">Child profiles</Link>.
          </p>
        )}

        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn primary" disabled={loading} onClick={startMission}>
            {loading ? "Starting…" : questions.length ? "Restart mission" : "Start mission"}
          </button>
          <Link className="btn" href="/notebook">
            Notebook
          </Link>
        </div>

        {skillsTargeted.length ? (
          <div className="muted" style={{ marginTop: 10 }}>
            <strong>Targeting:</strong> {skillsTargeted.join(", ")}
          </div>
        ) : null}

        {error ? (
          <p className="error" style={{ marginTop: 12, marginBottom: 0 }}>
            {error}
          </p>
        ) : null}
      </div>

      {questions.length ? (
        <div className="card" style={{ marginTop: 16 }}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div style={{ fontWeight: 800 }}>
              Question {idx + 1} of {questions.length}
            </div>
            <div className="muted">
              Correct so far: <strong>{correctCount}</strong>
            </div>
          </div>

          <div style={{ marginTop: 12, fontSize: 18, fontWeight: 800 }}>
            {current?.prompt}
          </div>

          {current ? (
            <>
              <div style={{ marginTop: 12 }}>
                <label className="label" htmlFor="practice-answer">
                  Your answer
                </label>
                <input
                  id="practice-answer"
                  className="input"
                  value={getAnswer(current).value}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [current.id]: {
                        ...getAnswer(current),
                        value: e.target.value
                      }
                    }))
                  }
                  placeholder="Type your answer"
                  disabled={finished}
                />
              </div>

              <div className="row" style={{ marginTop: 12 }}>
                <button className="btn primary" onClick={submitCurrent} disabled={finished}>
                  Check
                </button>
                <button
                  className="btn"
                  onClick={() => setIdx((i) => Math.max(0, i - 1))}
                  disabled={idx === 0}
                >
                  Previous
                </button>
                <button
                  className="btn"
                  onClick={() => setIdx((i) => Math.min(questions.length - 1, i + 1))}
                  disabled={idx === questions.length - 1}
                >
                  Next
                </button>
              </div>

              {getAnswer(current).submitted ? (
                <div style={{ marginTop: 12 }}>
                  {getAnswer(current).isCorrect ? (
                    <div className="success" style={{ fontWeight: 800 }}>
                      Correct!
                    </div>
                  ) : (
                    <div className="error" style={{ fontWeight: 800 }}>
                      Not quite. Correct answer: {current.expectedAnswer}
                    </div>
                  )}
                </div>
              ) : null}

              {idx === questions.length - 1 ? (
                <div className="row" style={{ marginTop: 16 }}>
                  <button
                    className="btn primary"
                    disabled={finishing || finished}
                    onClick={finishAndSave}
                  >
                    {finished ? "Saved ✓" : finishing ? "Saving…" : "Finish & save results"}
                  </button>
                  <div className="muted">
                    This updates skills in <Link href="/parent">Parent dashboard</Link>.
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      ) : null}
    </main>
  );
}

