import { ResultAsync } from 'neverthrow';
import { JudgeError, JudgeErrorCode } from '@/infrastructure/judge/judge-error';
import { TestResult } from '../entities/test-result';
import { Language } from '@/domain/entities/language';

export interface JudgeRepository {
  /**
   * Creates new submission (POST /submissions)
   * @param languageId The language ID (int)
   * @param sourceCode The source code
   * @param stdin The standard input
   * @throws JudgeError (code: unknown, empty-language, unsupported-language, wall-time-limit, wait-not-allowed, full-queue, invalid-api-key)
   * @returns The submission token
   */
  createSubmission: (
    language: Language,
    sourceCode: string,
    stdin: string
  ) => ResultAsync<string, JudgeError<JudgeErrorCode.CreateSubmission>>;
  /**
   * Get submission (GET /submissions/:token)
   * @param token The submission token that was returned from createSubmission
   * @throws JudgeError (code: unknown, invalid-api-key, invalid-page)
   * @returns The submission object
   */
  getSubmission: (
    token: string
  ) => ResultAsync<TestResult, JudgeError<JudgeErrorCode.GetSubmission>>;
}
