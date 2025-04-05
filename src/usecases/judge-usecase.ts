import { JudgeRepository } from '@/domain/repositories/judge-repository';

/** コードテスト
 * @example
 * ```
 * const judgeRepository = new ApiJudgeRepository();
 * const judgeUseCase = new JudgeUseCase(judgeRepository);
 * ```
 */
export class JudgeUseCase {
  constructor(private readonly judgeRepository: JudgeRepository) {}

  /** テストを新規作成
   * @example
   * ```
   * const judgeResponse = await judgeUseCase.createSubmission(...);
   *
   * if (judgeResponse.isErr()) {
   *   // エラー処理
   * }
   *
   * const judgeToken = judgeResponse.value;
   * ```
   */
  createSubmission = this.judgeRepository.createSubmission;

  /** テスト結果を取得
   * @example
   * ```
   * const judgeResponse = await judgeUseCase.getSubmission(judgeToken);
   *
   * if (judgeResponse.isErr()) {
   *   // エラー処理
   * }
   *
   * const judgeResult = judgeResponse.value;
   * ```
   */
  getSubmission = this.judgeRepository.getSubmission;
}
