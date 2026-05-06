import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getRequiredEnv } from "@/lib/env";

type SaveAttemptBody = {
  accessToken: string;
  attempt: {
    child_id: string;
    input_type: "text" | "ocr";
    problem_text: string;
    mode: "hint" | "show" | "try";
    student_answer: string | null;
    is_correct: boolean | null;
    final_answer: string | null;
    ai_steps: unknown;
    skill_tags: string[];
  };
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<SaveAttemptBody>;
  if (!body.accessToken) {
    return NextResponse.json({ error: "Missing accessToken." }, { status: 401 });
  }
  if (!body.attempt?.child_id) {
    return NextResponse.json({ error: "Missing attempt." }, { status: 400 });
  }

  const supabase = createClient(
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      global: {
        headers: { Authorization: `Bearer ${body.accessToken}` }
      }
    }
  );

  // 1) Insert attempt (RLS enforces ownership through child_id)
  const { data: inserted, error: insertErr } = await supabase
    .from("attempts")
    .insert(body.attempt)
    .select("id, child_id, skill_tags, is_correct")
    .single();
  if (insertErr) {
    return NextResponse.json({ error: insertErr.message }, { status: 400 });
  }

  // 2) Update skill_states for each tag (simple mastery update)
  const tags = (inserted.skill_tags || []).filter(Boolean).slice(0, 20);
  const isCorrect = inserted.is_correct;

  for (const skill of tags) {
    // Fetch existing (if any)
    const { data: existing } = await supabase
      .from("skill_states")
      .select("mastery_score, attempts_count, correct_count")
      .eq("child_id", inserted.child_id)
      .eq("skill", skill)
      .maybeSingle();

    const prevMastery = typeof existing?.mastery_score === "number" ? existing.mastery_score : 0.5;
    const prevAttempts = typeof existing?.attempts_count === "number" ? existing.attempts_count : 0;
    const prevCorrect = typeof existing?.correct_count === "number" ? existing.correct_count : 0;

    // Update: tiny step each attempt; more if incorrect to surface weak skills faster.
    // correct -> +0.06, incorrect -> -0.08, unknown -> 0
    const delta =
      typeof isCorrect === "boolean" ? (isCorrect ? 0.06 : -0.08) : 0;
    const nextMastery = clamp01(prevMastery + delta);

    const nextAttempts = prevAttempts + 1;
    const nextCorrect = prevCorrect + (isCorrect === true ? 1 : 0);

    const { error: upsertErr } = await supabase.from("skill_states").upsert(
      {
        child_id: inserted.child_id,
        skill,
        mastery_score: nextMastery,
        attempts_count: nextAttempts,
        correct_count: nextCorrect,
        last_practiced_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      { onConflict: "child_id,skill" }
    );

    if (upsertErr) {
      return NextResponse.json({ error: upsertErr.message }, { status: 400 });
    }
  }

  return NextResponse.json({ ok: true, attemptId: inserted.id });
}

