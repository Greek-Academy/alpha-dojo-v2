import { Problem } from '@/domain/entities/problem';

export interface ProblemRepository {
  getProblems(): Promise<Problem[]>;
  getProblem(id: number): Promise<Problem>;
}
