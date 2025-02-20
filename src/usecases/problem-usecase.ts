import { Problem } from '@/domain/entities/problem';
import { ProblemRepository } from '@/domain/repositories/problem-repository';

/** Problem を取得
 *
 * @example Problem を全取得
 * ```
 * import { getAuthToken } from '@/lib/get-auth-token';
 *
 * const authToken = getAuthToken();
 * const problemRepository = new ApiProblemRepository(authToken);
 * const problemUseCase = new ProblemUseCase(problemRepository);
 * const problems = await problemUseCase.getAllProblems();
 * ```
 */
export class ProblemUseCase {
  constructor(private readonly problemRepository: ProblemRepository) {}

  async getAllProblems(): Promise<Problem[]> {
    return await this.problemRepository.getProblems();
  }
}
