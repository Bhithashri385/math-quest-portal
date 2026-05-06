export type ChildGrade = 3 | 4 | 5;

export type ChildProfileRow = {
  id: string;
  parent_user_id: string;
  name: string;
  grade: number;
  created_at: string;
};

export type AttemptInputType = "text" | "ocr";
export type AttemptMode = "hint" | "show" | "try";

export type AttemptRow = {
  id: string;
  child_id: string;
  input_type: AttemptInputType;
  problem_text: string;
  mode: AttemptMode;
  student_answer: string | null;
  is_correct: boolean | null;
  final_answer: string | null;
  ai_steps: unknown;
  skill_tags: string[];
  created_at: string;
};

