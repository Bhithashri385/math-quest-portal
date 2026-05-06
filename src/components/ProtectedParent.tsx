"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

export function ProtectedParent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) {
        const next = encodeURIComponent(pathname || "/kids");
        router.replace(`/login?next=${next}`);
        return;
      }
      setReady(true);
    });

    return () => {
      mounted = false;
    };
  }, [pathname, router]);

  if (!ready) {
    return (
      <main>
        <div className="card">
          <div className="muted">Checking session…</div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}

