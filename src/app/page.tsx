import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>MathMentor AI (Grades 3–5)</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Parent login + child profiles (MVP slice PR #1).
        </p>

        <div className="row" style={{ marginTop: 16 }}>
          <Link className="btn primary" href="/login">
            Parent sign in
          </Link>
          <Link className="btn" href="/kids">
            Go to child profiles
          </Link>
        </div>

        <p className="muted" style={{ marginTop: 16, marginBottom: 0 }}>
          You’ll need Supabase env vars set in <code>.env.local</code>.
        </p>
      </div>
    </main>
  );
}

