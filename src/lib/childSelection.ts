import type { ChildGrade } from "@/types/db";

export type SelectedChild = {
  id: string;
  name: string;
  grade: ChildGrade;
};

const KEY = "mm_selected_child_v1";

export function getSelectedChild(): SelectedChild | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SelectedChild;
  } catch {
    return null;
  }
}

export function setSelectedChild(child: SelectedChild) {
  window.localStorage.setItem(KEY, JSON.stringify(child));
}

export function clearSelectedChild() {
  window.localStorage.removeItem(KEY);
}

