import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { Problem } from '@/domain/entities/problem';
import { ProblemDTO } from '@/infrastructure/dto/problem-dto';
import { responseHandler } from '../response-handler';

const STRAPI_API_URL =
  (process.env.STRAPI_PUBLIC_URL || 'http://localhost:1337') + '/api';

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

    const responseResult = await responseHandler<{ data: ProblemDTO[] }>(
      response
    );

    if (!responseResult.success) throw responseResult.error;

    const problems = responseResult.json.data.map(
      (problem) =>
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
