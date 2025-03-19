import { Problem } from '@/domain/entities/problem';
import { ResultAsync } from 'neverthrow';
import { ResponseError } from '../entities/error';

export interface ProblemRepository {
  getAllProblems: () => ResultAsync<Problem[], ResponseError>;
  getProblemById: (id: number) => ResultAsync<Problem, ResponseError>;
}
