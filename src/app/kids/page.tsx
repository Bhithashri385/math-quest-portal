"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProtectedParent } from "@/components/ProtectedParent";
import { AppHeader } from "@/components/AppHeader";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { setSelectedChild } from "@/lib/childSelection";
import type { ChildGrade, ChildProfileRow } from "@/types/db";

type CreateChildForm = {
  name: string;
  grade: ChildGrade;
};

export default function KidsPage() {
  return (
    <ProtectedParent>
      <AppHeader />
      <KidsInner />
    </ProtectedParent>
  );
}

function KidsInner() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const [children, setChildren] = useState<ChildProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<CreateChildForm>({
    name: "",
    grade: 3
  });
  const [creating, setCreating] = useState(false);

  async function refresh() {
    setError(null);
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("children")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setChildren((data || []) as ChildProfileRow[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load children.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const name = form.name.trim();
    if (name.length < 1) {
      setError("Child name is required.");
      return;
    }

    setCreating(true);
    try {
      const { data: authData, error: authErr } = await supabase.auth.getUser();
      if (authErr) throw authErr;
      if (!authData.user) throw new Error("Not signed in.");

      const { error: insertErr } = await supabase.from("children").insert({
        parent_user_id: authData.user.id,
        name,
        grade: form.grade
      });
      if (insertErr) throw insertErr;

      setForm({ name: "", grade: form.grade });
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create child.");
    } finally {
      setCreating(false);
    }
  }

  function onSelect(child: ChildProfileRow) {
    const grade = (child.grade === 3 || child.grade === 4 || child.grade === 5
      ? child.grade
      : 3) as ChildGrade;

    setSelectedChild({ id: child.id, name: child.name, grade });
    router.push("/home");
  }

  return (
    <main>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Child profiles</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Create a child profile for grades 3–5, then select it to continue.
        </p>

        <div style={{ marginTop: 16 }}>
          <form onSubmit={onCreate}>
            <div className="row" style={{ alignItems: "flex-end" }}>
              <div style={{ flex: "1 1 260px" }}>
                <label className="label" htmlFor="child-name">
                  Child name
                </label>
                <input
                  id="child-name"
                  className="input"
                  placeholder="e.g., Maya"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div style={{ width: 160 }}>
                <label className="label" htmlFor="child-grade">
                  Grade
                </label>
                <select
                  id="child-grade"
                  className="input"
                  value={form.grade}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      grade: Number(e.target.value) as ChildGrade
                    }))
                  }
                >
                  <option value={3}>Grade 3</option>
                  <option value={4}>Grade 4</option>
                  <option value={5}>Grade 5</option>
                </select>
              </div>
              <button className="btn primary" type="submit" disabled={creating}>
                {creating ? "Creating…" : "Create"}
              </button>
            </div>
          </form>
        </div>

        {error ? (
          <p className="error" style={{ marginTop: 12, marginBottom: 0 }}>
            {error}
          </p>
        ) : null}

        <div style={{ marginTop: 16 }}>
          {loading ? (
            <div className="muted">Loading…</div>
          ) : children.length === 0 ? (
            <div className="muted">No child profiles yet.</div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {children.map((c) => (
                <button
                  key={c.id}
                  className="btn"
                  onClick={() => onSelect(c)}
                  style={{
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <span>
                    <strong>{c.name}</strong>{" "}
                    <span className="muted">• Grade {c.grade}</span>
                  </span>
                  <span className="muted">Select →</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>Supabase setup notes</h2>
        <p className="muted" style={{ marginTop: 8 }}>
          This page expects a <code>children</code> table with RLS enabled. Apply
          the SQL in <code>supabase/migrations/</code>.
        </p>
      </div>
    </main>
  );
}

