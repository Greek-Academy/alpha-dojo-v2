import { Problem } from '@/domain/entities/problem';

export interface ProblemRepository {
  getProblems(authToken: string): Promise<Problem[]>;
  getProblem(id: number, authToken: string): Promise<Problem>;
}
