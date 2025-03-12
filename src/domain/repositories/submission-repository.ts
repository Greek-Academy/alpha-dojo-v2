import { ResultAsync } from 'neverthrow';
import { Submission } from '../entities/submission';
import { ResponseError } from '../entities/error';
import { SupportedLanguage } from '../entities/supported-language';

export type SubmissionFilter = {
  authorId?: string;
  language?: SupportedLanguage;
  problemId?: string;
  testResultId?: string;
};

export interface SubmissionRepository {
  getSubmissionById: (id: string) => ResultAsync<Submission, ResponseError>;

  getSubmissions: (
    filters?: SubmissionFilter
  ) => ResultAsync<Submission[], ResponseError>;
}
