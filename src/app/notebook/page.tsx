"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProtectedParent } from "@/components/ProtectedParent";
import { AppHeader } from "@/components/AppHeader";
import { getSelectedChild } from "@/lib/childSelection";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import type { SelectedChild } from "@/lib/childSelection";
import type { AttemptRow } from "@/types/db";

export default function NotebookPage() {
  return (
    <ProtectedParent>
      <AppHeader />
      <NotebookInner />
    </ProtectedParent>
  );
}

function NotebookInner() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [child, setChild] = useState<SelectedChild | null>(null);
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const c = getSelectedChild();
    setChild(c);
    if (!c) {
      setLoading(false);
      return;
    }

    (async () => {
      setError(null);
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("attempts")
          .select("*")
          .eq("child_id", c.id)
          .order("created_at", { ascending: false })
          .limit(50);
        if (error) throw error;
        setAttempts((data || []) as AttemptRow[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load notebook.");
      } finally {
        setLoading(false);
      }
    })();
  }, [supabase]);

  return (
    <main>
      <div className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h1 style={{ marginTop: 0, marginBottom: 0 }}>Notebook</h1>
          <div className="row">
            <Link className="btn" href="/home">
              Back to home
            </Link>
            <Link className="btn primary" href="/ask">
              Ask
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
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        {loading ? (
          <div className="muted">Loading…</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : attempts.length === 0 ? (
          <div className="muted">
            No saved attempts yet. Go to <Link href="/ask">Ask</Link> and save one.
          </div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {attempts.map((a) => (
              <div key={a.id} className="card" style={{ padding: 12 }}>
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>
                      {a.input_type === "ocr" ? "📷 Photo" : "⌨️ Text"} •{" "}
                      {a.mode.toUpperCase()}
                    </div>
                    <div className="muted" style={{ marginTop: 6 }}>
                      {new Date(a.created_at).toLocaleString()}
                    </div>
                  </div>
                  {typeof a.is_correct === "boolean" ? (
                    <div className={a.is_correct ? "success" : "error"} style={{ fontWeight: 800 }}>
                      {a.is_correct ? "Correct" : "Needs work"}
                    </div>
                  ) : (
                    <div className="muted" style={{ fontWeight: 800 }}>
                      Saved
                    </div>
                  )}
                </div>

                <div style={{ marginTop: 10, whiteSpace: "pre-wrap" }}>
                  {a.problem_text}
                </div>

                {a.final_answer ? (
                  <div className="muted" style={{ marginTop: 10 }}>
                    <strong>Answer:</strong> {a.final_answer}
                  </div>
                ) : null}

                {a.skill_tags?.length ? (
                  <div className="muted" style={{ marginTop: 10 }}>
                    <strong>Skills:</strong> {a.skill_tags.join(", ")}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="muted">
          Note: make sure you’ve applied <code>supabase/migrations/0002_attempts.sql</code>.
        </div>
      </div>
    </main>
  );
}

