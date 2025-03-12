import { ResultAsync } from 'neverthrow';
import { Submission } from '../entities/submission';
import { ResponseError } from '../entities/error';

export interface SubmissionRepository {
  getSubmissionById: (id: string) => ResultAsync<Submission, ResponseError>;

  getSubmissionsByProblem: (
    problemId: string,
    userId?: string
  ) => ResultAsync<Submission[], ResponseError>;
}
