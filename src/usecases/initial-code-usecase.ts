import { ResponseError } from '@/domain/entities/error';
import { InitialCode } from '@/domain/entities/initial-code';
import {
  InitialCodeFilters,
  InitialCodeRepository,
} from '@/domain/repositories/initial-code-repository';
import { ResultAsync } from 'neverthrow';

/** Initial Code を取得
 * @example
 * ```
 * import { getAuthToken } from '@/lib/get-auth-token';
 *
 * const authToken = await getAuthToken();
 * const initialCodeRepository = new ApiInitialCodeRepository(authToken);
 * const initialCodeUseCase = new InitialCodeUseCase(initialCodeRepository);
 * ```
 */
export class InitialCodeUseCase {
  constructor(private readonly initialCodeRepository: InitialCodeRepository) {}

  /** ID から Initial Code を取得
   * @example
   * ```
   * const initialCodeResponse = await initialCodeUseCase.fetchInitialCodeById(initialCodeId);
   *
   * if (initialCodeResponse.isErr()) {
   *   // エラー処理
   * }
   *
   * const initialCode = initialCodeResponse.value;
   * ```
   */
  fetchInitialCodeById: (
    id: string
  ) => ResultAsync<InitialCode, ResponseError> =
    this.initialCodeRepository.getInitialCodeById;

  /** 条件に合致する Initial Code を全取得
   * @example
   * const initialCodesResponse = await initialCodeUseCase.fetchInitialCodes({
   *   problemId: 'exampleProblemId',
   *   language: typescript,
   * });
   *
   * if (initialCodesResponse.isErr()) {
   *   // エラー処理
   * }
   *
   * const initialCodes = initialCodesResponse.value;
   */
  fetchInitialCodes: (
    filters?: InitialCodeFilters
  ) => ResultAsync<InitialCode[], ResponseError> =
    this.initialCodeRepository.getInitialCodes;
}
