import { Problem } from '@/domain/entities/problem';

export interface ProblemRepository {
  getProblems(): Promise<Problem[]>;
  getProblemById(id: number): Promise<Problem | null>;
  createProblem(problem: Problem): Promise<Problem>;
  updateProblem(problem: Problem): Promise<void>;
  deleteProblem(id: number): Promise<void>;
}
