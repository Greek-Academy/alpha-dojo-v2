import { Problem } from '@/domain/entities/problem';
import { ProblemRepository } from '@/domain/repositories/problem-repository';

export class ProblemUseCase {
  constructor(private readonly problemRepository: ProblemRepository) {}

  async getAllProblems(): Promise<Problem[]> {
    return await this.problemRepository.getProblems();
  }

  async getProblem(id: number): Promise<Problem | null> {
    return await this.problemRepository.getProblemById(id);
  }

  async createProblem(problem: Problem): Promise<void> {
    await this.problemRepository.createProblem(problem);
  }

  async updateProblem(problem: Problem): Promise<void> {
    await this.problemRepository.updateProblem(problem);
  }

  async deleteProblem(id: number): Promise<void> {
    await this.problemRepository.deleteProblem(id);
  }
}
