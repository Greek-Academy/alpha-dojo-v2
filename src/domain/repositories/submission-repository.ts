import { ResultAsync } from 'neverthrow';
import { Submission, SubmissionToCreate } from '../entities/submission';
import { ResponseError } from '../entities/error';
import { SupportedLanguage } from '../entities/supported-language';

export interface SubmissionFilters {
  authorId?: string;
  language?: SupportedLanguage;
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
