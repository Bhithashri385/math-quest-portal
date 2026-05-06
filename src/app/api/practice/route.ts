import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getRequiredEnv } from "@/lib/env";
import type { PracticeQuestion, PracticeRequest, PracticeResponse } from "@/types/practice";

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function genForSkill(skill: string, grade: number): PracticeQuestion {
  const id = `${skill}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const ranges =
    grade === 3
      ? { addSub: [10, 999], mulA: [2, 12], mulB: [2, 12], div: [2, 12] }
      : grade === 4
        ? { addSub: [100, 9999], mulA: [2, 99], mulB: [2, 12], div: [2, 12] }
        : { addSub: [100, 99999], mulA: [2, 99], mulB: [2, 99], div: [2, 12] };

  if (skill === "addition") {
    const a = randInt(ranges.addSub[0], ranges.addSub[1]);
    const b = randInt(ranges.addSub[0], ranges.addSub[1]);
    return { id, skill, prompt: `${a} + ${b} = ?`, expectedAnswer: String(a + b) };
  }

  if (skill === "subtraction") {
    let a = randInt(ranges.addSub[0], ranges.addSub[1]);
    let b = randInt(ranges.addSub[0], ranges.addSub[1]);
    if (b > a) [a, b] = [b, a];
    return { id, skill, prompt: `${a} − ${b} = ?`, expectedAnswer: String(a - b) };
  }

  if (skill === "multiplication") {
    const a = randInt(ranges.mulA[0], ranges.mulA[1]);
    const b = randInt(ranges.mulB[0], ranges.mulB[1]);
    return { id, skill, prompt: `${a} × ${b} = ?`, expectedAnswer: String(a * b) };
  }

  if (skill === "division") {
    const b = randInt(ranges.div[0], ranges.div[1]);
    const q = randInt(2, 12);
    const a = b * q;
    return { id, skill, prompt: `${a} ÷ ${b} = ?`, expectedAnswer: String(q) };
  }

  // word-problem (very light)
  const wp = pick([
    () => {
      const packs = randInt(2, 9);
      const per = randInt(2, 12);
      return {
        prompt: `There are ${packs} bags with ${per} marbles each. How many marbles in all?`,
        expectedAnswer: String(packs * per),
        skill: "word-problem"
      };
    },
    () => {
      const total = randInt(30, 200);
      const gave = randInt(5, Math.floor(total / 2));
      return {
        prompt: `You have ${total} stickers. You give away ${gave}. How many are left?`,
        expectedAnswer: String(total - gave),
        skill: "word-problem"
      };
    }
  ]);
  const r = wp();
  return { id, skill: r.skill, prompt: r.prompt, expectedAnswer: r.expectedAnswer };
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<PracticeRequest>;
  if (!body.accessToken) {
    return NextResponse.json({ error: "Missing accessToken." }, { status: 401 });
  }
  if (!body.child?.id || !body.child?.grade) {
    return NextResponse.json({ error: "Missing child." }, { status: 400 });
  }

  const count = Math.max(5, Math.min(20, body.count ?? 12));

  const supabase = createClient(
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      global: {
        headers: { Authorization: `Bearer ${body.accessToken}` }
      }
    }
  );

  // Pull weakest skills, fallback to common ones
  const { data: skillRows } = await supabase
    .from("skill_states")
    .select("skill, mastery_score")
    .eq("child_id", body.child.id)
    .order("mastery_score", { ascending: true })
    .limit(5);

  const skillsTargeted =
    (skillRows || [])
      .map((r) => (r as { skill: string }).skill)
      .filter(Boolean) || [];

  const defaultSkills = ["addition", "subtraction", "multiplication", "division", "word-problem"];
  const pool = skillsTargeted.length ? skillsTargeted : defaultSkills;

  const questions: PracticeQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const s = pool[i % pool.length];
    questions.push(genForSkill(s, body.child.grade));
  }

  const response: PracticeResponse = {
    questions,
    skillsTargeted: pool.slice(0, 5)
  };
  return NextResponse.json(response);
}

