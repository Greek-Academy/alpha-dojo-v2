import { ResponseError } from '@/domain/entities/error';
import { Problem } from '@/domain/entities/problem';
import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { ResultAsync } from 'neverthrow';

/** Problem を取得
 * @example
 * ```
 * import { getAuthToken } from '@/lib/get-auth-token';
 *
 * const authToken = await getAuthToken();
 * const problemRepository = new ApiProblemRepository(authToken);
 * const problemUseCase = new ProblemUseCase(problemRepository);
 * ```
 */
export class ProblemUseCase {
  constructor(private readonly problemRepository: ProblemRepository) {}

  /** Problem を全取得
   * @example
   * ```
   * const problemsResponse = await problemUseCase.fetchAllProblems();
   *
   * if (problemsResponse.isErr()) {
   *   // エラー処理
   * }
   *
   * const problems = problemsResponse.value;
   * ```
   */
  fetchAllProblems: () => ResultAsync<Problem[], ResponseError> =
    this.problemRepository.getAllProblems;

  /** ID から Problem を取得
   * @example
   * ```
   * const problemResponse = await problemUseCase.fetchProblemById(problemId);
   *
   * if (problemResponse.isErr()) {
   *   // エラー処理
   * }
   *
   * const problem = problemResponse.value;
   * ```
   */
  fetchProblemById: (id: string) => ResultAsync<Problem, ResponseError> =
    this.problemRepository.getProblemById;
}
