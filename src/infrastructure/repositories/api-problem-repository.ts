import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { Problem } from '@/domain/entities/problem';
import { ProblemDTO } from '@/infrastructure/dto/problem-dto';

const STRAPI_API_URL =
  (process.env.STRAPI_PUBLIC_URL || 'http://localhost:1337') + '/api';

export class ApiProblemRepository implements ProblemRepository {
  async getProblems(authToken: string): Promise<Problem[]> {
    const response = await fetch(`${STRAPI_API_URL}/problems`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
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

  async getProblem(id: number, authToken: string): Promise<Problem> {
    const response = await fetch(`${STRAPI_API_URL}/problems/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    const json: ProblemDTO = await response.json();

    const problem = new Problem(
      json.id,
      json.attributes.title,
      json.attributes.description,
      json.attributes.difficulty,
      json.attributes.constraints,
      new Date(json.attributes.createdAt),
      new Date(json.attributes.updatedAt)
    );

    return problem;
  }
}
