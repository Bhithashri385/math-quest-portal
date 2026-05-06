"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProtectedParent } from "@/components/ProtectedParent";
import { AppHeader } from "@/components/AppHeader";
import { getSelectedChild } from "@/lib/childSelection";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import type { SelectedChild } from "@/lib/childSelection";

type SkillStateRow = {
  child_id: string;
  skill: string;
  mastery_score: number;
  attempts_count: number;
  correct_count: number;
  last_practiced_at: string;
};

export default function ParentDashboardPage() {
  return (
    <ProtectedParent>
      <AppHeader />
      <ParentInner />
    </ProtectedParent>
  );
}

function ParentInner() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [child, setChild] = useState<SelectedChild | null>(null);
  const [rows, setRows] = useState<SkillStateRow[]>([]);
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
          .from("skill_states")
          .select(
            "child_id, skill, mastery_score, attempts_count, correct_count, last_practiced_at"
          )
          .eq("child_id", c.id)
          .order("mastery_score", { ascending: true })
          .order("attempts_count", { ascending: false })
          .limit(10);
        if (error) throw error;
        setRows((data || []) as SkillStateRow[]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load skill dashboard."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [supabase]);

  return (
    <main>
      <div className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h1 style={{ marginTop: 0, marginBottom: 0 }}>Parent dashboard</h1>
          <div className="row">
            <Link className="btn" href="/home">
              Back to home
            </Link>
            <Link className="btn" href="/notebook">
              Notebook
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
        <h2 style={{ marginTop: 0 }}>Weakest skills (so far)</h2>
        <p className="muted" style={{ marginTop: 8 }}>
          This list appears after you save attempts from <Link href="/ask">Ask</Link>.
        </p>

        {loading ? (
          <div className="muted">Loading…</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : rows.length === 0 ? (
          <div className="muted">No skill data yet.</div>
        ) : (
          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            {rows.map((r) => {
              const masteryPct = Math.round((r.mastery_score || 0) * 100);
              const accPct =
                r.attempts_count > 0
                  ? Math.round((r.correct_count / r.attempts_count) * 100)
                  : 0;

              return (
                <div key={r.skill} className="card" style={{ padding: 12 }}>
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    <div style={{ fontWeight: 800 }}>{r.skill}</div>
                    <div className="muted">
                      Mastery: <strong>{masteryPct}%</strong>
                    </div>
                  </div>
                  <div className="muted" style={{ marginTop: 8 }}>
                    Attempts: <strong>{r.attempts_count}</strong> • Accuracy:{" "}
                    <strong>{accPct}%</strong>
                  </div>
                  <div className="muted" style={{ marginTop: 6 }}>
                    Last practiced:{" "}
                    <strong>{new Date(r.last_practiced_at).toLocaleString()}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="muted">
          Note: make sure you’ve applied{" "}
          <code>supabase/migrations/0003_skill_states.sql</code>.
        </div>
      </div>
    </main>
  );
}

