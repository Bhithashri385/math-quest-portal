"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

export function AppHeader() {
  const router = useRouter();

  async function onLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <header
      style={{
        padding: 24,
        maxWidth: 960,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12
      }}
    >
      <div className="row">
        <Link href="/" className="btn">
          MathMentor AI
        </Link>
        <Link href="/kids" className="btn">
          Child profiles
        </Link>
      </div>
      <button className="btn" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
}

