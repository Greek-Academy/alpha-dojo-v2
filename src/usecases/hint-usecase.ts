import { ResponseError } from '@/domain/entities/error';
import { Hint } from '@/domain/entities/hint';
import {
  HintFilters,
  HintRepository,
} from '@/domain/repositories/hint-repository';
import { ResultAsync, ok } from 'neverthrow';

export type SortedHints = Omit<Hint, 'order'>[];

/** Hint を取得
 * @example
 * ```
 * import { getAuthToken } from '@/lib/get-auth-token';
 *
 * const authToken = await getAuthToken();
 * const hintRepository = new ApiHintRepository(authToken);
 * const hintUseCase = new HintUseCase(hintRepository);
 * ```
 */
export class HintUseCase {
  constructor(private readonly hintRepository: HintRepository) {}

  /** ID から Hint を取得
   * @example
   * ```
   * const hintResponse = await hintUseCase.fetchHintById(hintId);
   *
   * if (hintResponse.isErr()) {
   *   // エラー処理
   * }
   *
   * const hint = hintResponse.value;
   * ```
   */
  fetchHintById: (id: string) => ResultAsync<Hint, ResponseError> =
    this.hintRepository.getHintById;

  /** 条件に合致する Hint を全取得。Hint は order 順にソートされる。
   * @example
   * ```
   * const hintsResponse = await hintUseCase.fetchHints({
   *   problemId: 'exampleProblemId',
   * });
   *
   * if (hintsResponse.isErr()) {
   *   // エラー処理
   * }
   *
   * const hints = hintsResponse.value;
   * ```
   */
  fetchHints: (
    filters?: HintFilters
  ) => ResultAsync<SortedHints, ResponseError> = (filters?: HintFilters) =>
    this.hintRepository.getHints(filters).andThen((hints) =>
      ok(
        hints
          .sort((a, b) => a.order - b.order)
          .map((hint) => {
            // order を除外する
            const { order: _, ...rest } = hint;
            return rest;
          })
      )
    );
}
