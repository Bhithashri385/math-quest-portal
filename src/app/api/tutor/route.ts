import { NextResponse } from "next/server";
import type { TutorRequest, TutorResponse } from "@/types/tutor";

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function isTutorResponseShape(x: unknown): x is TutorResponse {
  if (!x || typeof x !== "object") return false;
  const obj = x as Record<string, unknown>;
  if (!Array.isArray(obj.steps)) return false;
  if (typeof obj.questionBack !== "string") return false;
  if (!Array.isArray(obj.skillTags)) return false;
  for (const s of obj.steps) {
    if (!s || typeof s !== "object") return false;
    const step = s as Record<string, unknown>;
    if (typeof step.title !== "string") return false;
    if (typeof step.text !== "string") return false;
  }
  for (const t of obj.skillTags) {
    if (typeof t !== "string") return false;
  }
  if (obj.finalAnswer !== undefined && typeof obj.finalAnswer !== "string") return false;
  if (obj.isCorrect !== undefined && typeof obj.isCorrect !== "boolean") return false;
  return true;
}

function extractSimpleFinalAnswer(problemText: string): string | undefined {
  // Super-light stub: handles "A + B", "A - B", "A x B", "A * B", "A ÷ B", "A / B"
  const t = normalize(problemText)
    .replace(/×/g, "*")
    .replace(/÷/g, "/");

  const m = t.match(/(-?\d+)\s*([+\-*/])\s*(-?\d+)/);
  if (!m) return undefined;

  const a = Number(m[1]);
  const op = m[2];
  const b = Number(m[3]);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return undefined;

  let val: number;
  switch (op) {
    case "+":
      val = a + b;
      break;
    case "-":
      val = a - b;
      break;
    case "*":
      val = a * b;
      break;
    case "/":
      if (b === 0) return undefined;
      val = a / b;
      break;
    default:
      return undefined;
  }

  // Prefer integer formatting when possible for elementary.
  if (Number.isInteger(val)) return String(val);
  return String(Math.round(val * 1000) / 1000);
}

function buildStubResponse(req: TutorRequest): TutorResponse {
  const answer = extractSimpleFinalAnswer(req.problemText);
  const skills: string[] = [];
  if (/\b(add|sum|\+)\b/.test(normalize(req.problemText))) skills.push("addition");
  if (/\b(subtract|minus|-)\b/.test(normalize(req.problemText))) skills.push("subtraction");
  if (/\b(times|multiply|\*|×)\b/.test(req.problemText.toLowerCase())) skills.push("multiplication");
  if (/\b(divide|÷|\/)\b/.test(req.problemText.toLowerCase())) skills.push("division");
  if (skills.length === 0) skills.push("word-problem");

  if (req.mode === "hint") {
    return {
      steps: [
        {
          title: "Hint",
          text:
            "Tell me what you notice first. Can you break the numbers into tens and ones?"
        }
      ],
      questionBack: "What’s the first small step you can do?",
      skillTags: skills
    };
  }

  if (req.mode === "show") {
    return {
      steps: [
        {
          title: "Step 1",
          text:
            "Rewrite the problem in your own words. What operation does it need (add, subtract, multiply, or divide)?"
        },
        {
          title: "Step 2",
          text:
            "Work carefully and keep place value lined up (ones under ones, tens under tens)."
        },
        {
          title: "Step 3",
          text:
            "Do a quick check: does your answer make sense (bigger/smaller than the starting numbers)?"
        }
      ],
      questionBack: "Want to try a similar one next?",
      finalAnswer: answer,
      skillTags: skills
    };
  }

  // "try" mode
  const expected = answer;
  const given = req.studentAnswer?.trim();
  const isCorrect =
    expected && given ? normalize(expected) === normalize(given) : undefined;

  return {
    steps: [
      {
        title: "Check",
        text:
          expected && given
            ? `I’m comparing your answer (${given}) with the expected answer.`
            : "I can check your answer once you enter it."
      },
      ...(isCorrect === false
        ? [
            {
              title: "Fix the first thing",
              text:
                "Let’s go one place at a time (ones, tens, hundreds). What do you get for the ones place?"
            }
          ]
        : [])
    ],
    questionBack:
      isCorrect === true
        ? "Nice work! How did you know?"
        : "Show me your first step (what did you do first?)",
    finalAnswer: expected,
    skillTags: skills,
    isCorrect
  };
}

async function buildOpenAITutorResponse(req: TutorRequest): Promise<TutorResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const system = [
    "You are MathMentor AI, a patient math tutor for grades 3–5.",
    "Be kid-safe, encouraging, and concise.",
    "Never include disallowed content. If the request is unsafe or unrelated, redirect politely to math help.",
    "",
    "You MUST respond with valid JSON only (no markdown, no prose outside JSON).",
    "The JSON MUST match this TypeScript shape:",
    "{",
    '  "steps": Array<{ "title": string, "text": string }>,',
    '  "questionBack": string,',
    '  "finalAnswer"?: string,',
    '  "skillTags": string[],',
    '  "isCorrect"?: boolean',
    "}",
    "",
    "Rules:",
    "- Keep steps short (1–3 sentences each).",
    "- Prefer place-value explanations and concrete strategies.",
    "- Mode behavior:",
    '  - hint: give ONE next hint only (no full solution). Set finalAnswer only if it is extremely trivial.',
    "  - show: give a short worked solution (max 7 steps).",
    "  - try: check the student's answer; if wrong, point to the first fix and ask a question. Set isCorrect boolean if you can determine it.",
    "- skillTags: choose 1–3 from: addition, subtraction, multiplication, division, fractions, place-value, word-problem, rounding, measurement, geometry.",
    "- questionBack: ask one question to confirm understanding.",
  ].join("\n");

  const user = [
    `Student grade: ${req.child.grade}`,
    `Mode: ${req.mode}`,
    `Problem: ${req.problemText}`,
    req.mode === "try" ? `Student answer: ${req.studentAnswer ?? ""}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // Chat Completions for broad compatibility
  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || `OpenAI error (${resp.status})`);
  }

  const data = (await resp.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI returned empty content.");

  const parsed = safeJsonParse(content);
  if (!isTutorResponseShape(parsed)) {
    throw new Error("OpenAI returned invalid JSON shape.");
  }

  // Guardrail: ensure non-empty steps/skillTags
  if (parsed.steps.length === 0) {
    parsed.steps = [{ title: "Hint", text: "What part feels tricky? Tell me what you tried first." }];
  }
  if (parsed.skillTags.length === 0) parsed.skillTags = ["word-problem"];

  return parsed;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<TutorRequest>;

  if (!body.child?.id || !body.child?.name || !body.child?.grade) {
    return NextResponse.json({ error: "Missing child profile." }, { status: 400 });
  }

  if (body.mode !== "hint" && body.mode !== "show" && body.mode !== "try") {
    return NextResponse.json({ error: "Invalid mode." }, { status: 400 });
  }

  if (!body.problemText || body.problemText.trim().length === 0) {
    return NextResponse.json({ error: "Problem text is required." }, { status: 400 });
  }

  if (body.mode === "try" && (!body.studentAnswer || body.studentAnswer.trim().length === 0)) {
    return NextResponse.json(
      { error: "Student answer is required for Let me try." },
      { status: 400 }
    );
  }

  const req = body as TutorRequest;

  // If OpenAI isn't configured, keep working with the stub.
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(buildStubResponse(req));
  }

  try {
    const response = await buildOpenAITutorResponse(req);
    return NextResponse.json(response);
  } catch {
    // Fallback to stub on any model failure to keep the app usable.
    return NextResponse.json(buildStubResponse(req));
  }
}

