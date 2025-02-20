import { Problem } from '@/domain/entities/problem';
import { ProblemRepository } from '@/domain/repositories/problem-repository';

/** Problem を取得
 *
 * @example Problem を全取得
 * ```
 * const problemRepository = new ApiProblemRepository();
 * const problemUseCase = new ProblemUseCase(problemRepository);
 * const problems = await problemUseCase.getAllProblems();
 * ```
 */
export class ProblemUseCase {
  constructor(private readonly problemRepository: ProblemRepository) {}

  async getAllProblems(authToken: string): Promise<Problem[]> {
    return await this.problemRepository.getProblems(authToken);
  }

  async getProblemById(id: number, authToken: string): Promise<Problem> {
    return await this.problemRepository.getProblem(id, authToken);
  }
}
