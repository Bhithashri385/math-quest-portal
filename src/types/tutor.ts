import type { ChildGrade } from "@/types/db";

export type TutorMode = "hint" | "show" | "try";

export type TutorRequest = {
  child: {
    id: string;
    name: string;
    grade: ChildGrade;
  };
  mode: TutorMode;
  problemText: string;
  studentAnswer?: string;
};

export type TutorStep = {
  title: string;
  text: string;
};

export type TutorResponse = {
  steps: TutorStep[];
  questionBack: string;
  finalAnswer?: string;
  skillTags: string[];
  isCorrect?: boolean;
};

