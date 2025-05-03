import { ResultAsync } from 'neverthrow';
import { Submission, SubmissionToCreate } from '../entities/submission';
import { ResponseError } from '../entities/error';
import { Language } from '../entities/language';

export interface SubmissionFilters {
  authorId?: string;
  language?: Language;
  problemId?: string;
  testResultId?: string;
}

export interface SubmissionRepository {
  getSubmissionById: (id: string) => ResultAsync<Submission, ResponseError>;

  getSubmissions: (
    filters?: SubmissionFilters
  ) => ResultAsync<Submission[], ResponseError>;

  postSubmission: (
    data: SubmissionToCreate
  ) => ResultAsync<Submission, ResponseError>;
}
