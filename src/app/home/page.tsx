"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProtectedParent } from "@/components/ProtectedParent";
import { AppHeader } from "@/components/AppHeader";
import { clearSelectedChild, getSelectedChild } from "@/lib/childSelection";
import type { SelectedChild } from "@/lib/childSelection";

export default function HomePage() {
  return (
    <ProtectedParent>
      <AppHeader />
      <HomeInner />
    </ProtectedParent>
  );
}

function HomeInner() {
  const [child, setChild] = useState<SelectedChild | null>(null);

  useEffect(() => {
    setChild(getSelectedChild());
  }, []);

  return (
    <main>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Child home</h1>
        {child ? (
          <p className="muted" style={{ marginTop: 8 }}>
            Selected: <strong>{child.name}</strong> • Grade {child.grade}
          </p>
        ) : (
          <p className="muted" style={{ marginTop: 8 }}>
            No child selected yet.
          </p>
        )}

        <div className="row" style={{ marginTop: 16 }}>
          <Link className="btn" href="/kids">
            {child ? "Switch child" : "Select a child"}
          </Link>
          <Link className="btn primary" href="/ask">
            Ask a question
          </Link>
          <Link className="btn" href="/photo">
            Take a photo
          </Link>
          <Link className="btn" href="/practice">
            Practice
          </Link>
          <Link className="btn" href="/notebook">
            Notebook
          </Link>
          <Link className="btn" href="/parent">
            Parent dashboard
          </Link>
          {child ? (
            <button
              className="btn"
              onClick={() => {
                clearSelectedChild();
                setChild(null);
              }}
            >
              Clear selection
            </button>
          ) : null}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>Next MVP pages (coming next)</h2>
        <p className="muted" style={{ marginTop: 8, marginBottom: 0 }}>
          Next: replace the tutor stub with real AI.
        </p>
      </div>
    </main>
  );
}

