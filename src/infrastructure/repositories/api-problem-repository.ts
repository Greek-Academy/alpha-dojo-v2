import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { Problem } from '@/domain/entities/problem';
import { ProblemDTO } from '@/infrastructure/dto/problem-dto';

const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

export class ApiProblemRepository implements ProblemRepository {
  //TODO: Authorizationはログイン時のトークンを使用する
  async getProblems(): Promise<Problem[]> {
    const response = await fetch(`${STRAPI_API_URL}/problems`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_JWT}`,
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
          new Date(problem.attributes.createdAt),
          new Date(problem.attributes.updatedAt)
        )
    );

    return problems;
  }

  async getProblemById(id: number): Promise<Problem | null> {
    const response = await fetch(`${STRAPI_API_URL}/problems/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_JWT}`,
      },
    });

    const json = await response.json();

    const problem = new Problem(
      json.data.id,
      json.data.attributes.title,
      json.data.attributes.description,
      json.data.attributes.difficulty,
      new Date(json.data.attributes.createdAt),
      new Date(json.data.attributes.updatedAt)
    );
    return problem;
  }

  async createProblem(problem: Problem): Promise<Problem> {
    const response = await fetch(`${STRAPI_API_URL}/problems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_JWT}`,
      },
      body: JSON.stringify(problem),
    });

    const data = await response.json();

    return new Problem(
      data.data.id,
      data.data.attributes.title,
      data.data.attributes.description,
      data.data.attributes.difficulty,
      new Date(data.data.attributes.createdAt),
      new Date(data.data.attributes.updatedAt)
    );
  }

  async updateProblem(problem: Problem): Promise<void> {}

  async deleteProblem(id: number): Promise<void> {}
}
