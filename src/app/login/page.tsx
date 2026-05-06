"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginPage() {
  const router = useRouter();
  const [nextPath, setNextPath] = useState("/kids");

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "error"; message: string }
    | { type: "success"; message: string }
  >({ type: "idle" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      setNextPath(params.get("next") || "/kids");
    } catch {
      setNextPath("/kids");
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "idle" });

    const trimmed = email.trim().toLowerCase();
    if (!isValidEmail(trimmed)) {
      setStatus({ type: "error", message: "Please enter a valid email." });
      return;
    }

    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: {
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}${nextPath}`
              : undefined
        }
      });

      if (error) throw error;

      setStatus({
        type: "success",
        message:
          "Check your email for a sign-in link. You can close this tab after clicking it."
      });

      // If the user already had a session (e.g. in another tab), go through.
      const session = await supabase.auth.getSession();
      if (session.data.session) router.replace(nextPath);
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err instanceof Error ? err.message : "Login failed. Please try again."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Parent sign in</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Enter your email to get a magic sign-in link.
        </p>

        <form onSubmit={onSubmit} style={{ marginTop: 16 }}>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="input"
            inputMode="email"
            autoComplete="email"
            placeholder="parent@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="row" style={{ marginTop: 12 }}>
            <button
              className="btn primary"
              type="submit"
              disabled={loading || email.trim().length === 0}
            >
              {loading ? "Sending…" : "Send sign-in link"}
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => router.replace("/")}
            >
              Back
            </button>
          </div>

          {status.type === "error" ? (
            <p className="error" style={{ marginTop: 12, marginBottom: 0 }}>
              {status.message}
            </p>
          ) : null}
          {status.type === "success" ? (
            <p className="success" style={{ marginTop: 12, marginBottom: 0 }}>
              {status.message}
            </p>
          ) : null}
        </form>
      </div>
    </main>
  );
}

