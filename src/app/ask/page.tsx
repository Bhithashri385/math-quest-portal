"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ProtectedParent } from "@/components/ProtectedParent";
import { AppHeader } from "@/components/AppHeader";
import { getSelectedChild } from "@/lib/childSelection";
import { clearDraftProblem, getDraftProblem } from "@/lib/draftProblem";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import type { SelectedChild } from "@/lib/childSelection";
import type { TutorMode, TutorResponse } from "@/types/tutor";

export default function AskPage() {
  return (
    <ProtectedParent>
      <AppHeader />
      <AskInner />
    </ProtectedParent>
  );
}

function AskInner() {
  const [child, setChild] = useState<SelectedChild | null>(null);
  const [problemText, setProblemText] = useState("");
  const [mode, setMode] = useState<TutorMode>("hint");
  const [studentAnswer, setStudentAnswer] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TutorResponse | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");

  useEffect(() => {
    setChild(getSelectedChild());

    const draft = getDraftProblem();
    if (draft?.text?.trim()) {
      setProblemText(draft.text.trim());
      clearDraftProblem();
    }
  }, []);

  const canSubmit = useMemo(() => {
    if (!child) return false;
    if (problemText.trim().length === 0) return false;
    if (mode === "try" && studentAnswer.trim().length === 0) return false;
    return true;
  }, [child, mode, problemText, studentAnswer]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setSaveStatus("idle");

    if (!child) {
      setError("Please select a child profile first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          child,
          mode,
          problemText: problemText.trim(),
          studentAnswer: mode === "try" ? studentAnswer.trim() : undefined
        })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Tutor request failed.");
      }
      const data = (await res.json()) as TutorResponse;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h1 style={{ marginTop: 0, marginBottom: 0 }}>Ask a question</h1>
          <Link className="btn" href="/home">
            Back to home
          </Link>
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

        <form onSubmit={onSubmit} style={{ marginTop: 16 }}>
          <label className="label" htmlFor="problem">
            Problem
          </label>
          <textarea
            id="problem"
            className="input"
            style={{ minHeight: 110, resize: "vertical" }}
            placeholder="Example: What is 368 + 457?"
            value={problemText}
            onChange={(e) => setProblemText(e.target.value)}
          />

          <div className="row" style={{ marginTop: 12 }}>
            <button
              type="button"
              className={`btn ${mode === "hint" ? "primary" : ""}`}
              onClick={() => setMode("hint")}
            >
              Hint
            </button>
            <button
              type="button"
              className={`btn ${mode === "show" ? "primary" : ""}`}
              onClick={() => setMode("show")}
            >
              Show me
            </button>
            <button
              type="button"
              className={`btn ${mode === "try" ? "primary" : ""}`}
              onClick={() => setMode("try")}
            >
              Let me try
            </button>
          </div>

          {mode === "try" ? (
            <div style={{ marginTop: 12 }}>
              <label className="label" htmlFor="answer">
                Your answer
              </label>
              <input
                id="answer"
                className="input"
                placeholder="Type your answer"
                value={studentAnswer}
                onChange={(e) => setStudentAnswer(e.target.value)}
              />
            </div>
          ) : null}

          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn primary" type="submit" disabled={!canSubmit || loading}>
              {loading ? "Thinking…" : "Get help"}
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => {
                setProblemText("");
                setStudentAnswer("");
                setResult(null);
                setError(null);
                setSaveStatus("idle");
              }}
              disabled={loading}
            >
              Clear
            </button>
          </div>
        </form>

        {error ? (
          <p className="error" style={{ marginTop: 12, marginBottom: 0 }}>
            {error}
          </p>
        ) : null}
      </div>

      {result ? (
        <div className="card" style={{ marginTop: 16 }}>
          <h2 style={{ marginTop: 0 }}>Tutor response</h2>

          {typeof result.isCorrect === "boolean" ? (
            <p style={{ marginTop: 8 }} className={result.isCorrect ? "success" : "error"}>
              {result.isCorrect ? "Nice! That’s correct." : "Not quite—let’s fix it together."}
            </p>
          ) : null}

          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            {result.steps.map((s, idx) => (
              <div key={idx} className="card" style={{ padding: 12 }}>
                <div style={{ fontWeight: 700 }}>{s.title}</div>
                <div className="muted" style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>
                  {s.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12 }}>
            <div className="muted">
              <strong>Next question:</strong> {result.questionBack}
            </div>
          </div>

          {result.finalAnswer ? (
            <div style={{ marginTop: 12 }}>
              <div className="muted">
                <strong>Answer:</strong> {result.finalAnswer}
              </div>
            </div>
          ) : null}

          {result.skillTags.length ? (
            <div style={{ marginTop: 12 }} className="muted">
              <strong>Skills:</strong> {result.skillTags.join(", ")}
            </div>
          ) : null}

          <div className="row" style={{ marginTop: 12 }}>
            <button
              className="btn primary"
              disabled={saving || saveStatus === "saved" || !child}
              onClick={async () => {
                if (!child) return;
                setError(null);
                setSaving(true);
                try {
                  const supabase = createSupabaseBrowserClient();
                  const session = await supabase.auth.getSession();
                  const token = session.data.session?.access_token;
                  if (!token) throw new Error("Not signed in.");

                  const res = await fetch("/api/attempts", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                      accessToken: token,
                      attempt: {
                        child_id: child.id,
                        input_type: "text",
                        problem_text: problemText.trim(),
                        mode,
                        student_answer: mode === "try" ? studentAnswer.trim() : null,
                        is_correct:
                          typeof result.isCorrect === "boolean" ? result.isCorrect : null,
                        final_answer: result.finalAnswer ?? null,
                        ai_steps: result.steps,
                        skill_tags: result.skillTags ?? []
                      }
                    })
                  });
                  if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || "Failed to save attempt.");
                  }
                  setSaveStatus("saved");
                } catch (err) {
                  setError(
                    err instanceof Error ? err.message : "Failed to save attempt."
                  );
                } finally {
                  setSaving(false);
                }
              }}
            >
              {saveStatus === "saved" ? "Saved ✓" : saving ? "Saving…" : "Save to Notebook"}
            </button>
            <Link className="btn" href="/notebook">
              Open Notebook
            </Link>
          </div>
        </div>
      ) : null}
    </main>
  );
}

