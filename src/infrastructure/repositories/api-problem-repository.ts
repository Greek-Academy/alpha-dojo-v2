import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { Problem } from '@/domain/entities/problem';
import { ProblemDTO } from '@/infrastructure/dto/problem-dto';

const STRAPI_API_URL =
  (process.env.STRAPI_PUBLIC_URL || 'http://localhost:1337') + '/api';

export class ApiProblemRepository implements ProblemRepository {
  constructor(private readonly authToken?: string) {}

  async getProblems(): Promise<Problem[]> {
    const response = await fetch(`${STRAPI_API_URL}/problems`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`,
      },
    });

    const json = await response.json();

    const problems = json.data.map(
      (problem: ProblemDTO) =>
        new Problem(
          problem.id,
          problem.attributes.title,
          problem.attributes.description,
          problem.attributes.difficulty,
          problem.attributes.constraints,
          new Date(problem.attributes.createdAt),
          new Date(problem.attributes.updatedAt)
        )
    );

    return problems;
  }
}
