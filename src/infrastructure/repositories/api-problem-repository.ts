import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { Problem } from '@/domain/entities/problem';
import { ProblemDTO } from '@/infrastructure/dto/problem-dto';
import { cookies } from 'next/headers';

const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

// ライブラリとして共有すべき？
export async function getAuthToken() {
  const authToken = (await cookies()).get('jwt')?.value;
  return authToken;
}

export class ApiProblemRepository implements ProblemRepository {
  async getProblems(): Promise<Problem[]> {
    const authToken = await getAuthToken();

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
}
