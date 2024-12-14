import { Testcase } from "./testcase";

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  author: string;
  testcases: Testcase[];
  isDraft: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// TODO: 別で定義するかも
export type Difficulty = "Easy" | "Medium" | "Hard";
