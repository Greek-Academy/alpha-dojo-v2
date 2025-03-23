import { ResponseError } from '@/domain/entities/error';
import {
  SubmissionFilter,
  SubmissionRepository,
} from '@/domain/repositories/submission-repository';
import { Submission, SubmissionToCreate } from '@/domain/entities/submission';
import { ResultAsync } from 'neverthrow';

/** 課題の提出
 * @example
 * ```
 * import { getAuthToken } from '@/lib/get-auth-token';
 *
 * const authToken = await getAuthToken();
 * const submissionRepository = new ApiSubmissionRepository(authToken);
 * const submissionUseCase = new SubmissionUseCase(submissionRepository);
 * ```
 */
export class SubmissionUseCase {
  constructor(private readonly submissionRepository: SubmissionRepository) {}

  /** 単一の Submission を取得
   * @example
   * ```
   * const submissionResponse = await submissionUseCase.fetchSubmissionById();
   *
   * if (submissionResponse.isErr()) {
   *   // エラー処理
   * }
   *
   * const submission = submissionResponse.value;
   * ```
   */
  fetchSubmissionById: (id: string) => ResultAsync<Submission, ResponseError> =
    this.submissionRepository.getSubmissionById;

  /** 条件に合致する Submission を全取得
   * @example
   * ```
   * const submissionsResponse = await submissionUseCase.fetchSubmissions({
   *   authorId: 'exampleUserId',
   *   problemId: 'exampleProblemId',
   * });
   *
   * if (submissionsResponse.isErr()) {
   *   // エラー処理
   * }
   *
   * const submissions = submissionResponse.value;
   * ```
   */
  fetchSubmissions: (
    filters?: SubmissionFilter
  ) => ResultAsync<Submission[], ResponseError> =
    this.submissionRepository.getSubmissions;

  /** 課題を新規に提出
   * @example
   * ```
   * const newSubmission: SubmissionToCreate = {...};
   * const submissionResponse = await submissionUseCase.postSubmission(newSubmission);
   *
   * if (submissionsResponse.isErr()) {
   *   // エラー処理
   * }
   * ```
   */
  postSubmission: (
    subm: SubmissionToCreate
  ) => ResultAsync<Submission, ResponseError> =
    this.submissionRepository.postSubmission;
}
