import type { ChildGrade } from "@/types/db";

export type PracticeQuestion = {
  id: string;
  skill: string;
  prompt: string;
  expectedAnswer: string;
};

export type PracticeRequest = {
  accessToken: string;
  child: { id: string; grade: ChildGrade };
  count?: number;
};

export type PracticeResponse = {
  questions: PracticeQuestion[];
  skillsTargeted: string[];
};

