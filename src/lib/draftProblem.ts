export type DraftProblem = {
  text: string;
  source: "ocr" | "manual";
  createdAt: number;
};

const KEY = "mm_draft_problem_v1";

export function setDraftProblem(draft: DraftProblem) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(draft));
}

export function getDraftProblem(): DraftProblem | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DraftProblem;
  } catch {
    return null;
  }
}

export function clearDraftProblem() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

