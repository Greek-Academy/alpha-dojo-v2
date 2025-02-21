import { Problem } from '@/domain/entities/problem';
import { ResultAsync } from 'neverthrow';
import { ResponseError } from '../entities/error';

export interface ProblemRepository {
  getProblems: () => ResultAsync<Problem[], ResponseError>;
}
