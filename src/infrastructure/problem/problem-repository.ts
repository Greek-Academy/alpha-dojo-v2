import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { Problem } from '@/domain/entities/problem';
import { ok } from 'neverthrow';
import { problemDTO, ProblemDTO } from './problem-response';
import { fetchStrapiData } from '../strapi-utils';

export const newProblemFromDTO = (problem: ProblemDTO) => {
  return new Problem(
    problem.id.toString(),
    problem.attributes.title,
    problem.attributes.description,
    problem.attributes.difficulty,
    problem.attributes.constraints,
    new Date(problem.attributes.createdAt),
    new Date(problem.attributes.updatedAt)
  );
};

export class ApiProblemRepository implements ProblemRepository {
  constructor(private readonly authToken?: string) {}

  getProblems = () =>
    fetchStrapiData<ProblemDTO[]>(
      '/problems',
      problemDTO.array(),
      {},
      this.authToken ?? ''
    )
      .andThen((problems) =>
        ok(problems.map((problem) => newProblemFromDTO(problem)))
      )
      .mapErr((err) => err.toResponseError());

  async getProblem(id: number): Promise<Problem> {
    //TODO: Authorizationはログイン時のトークンを使用する
    const response = await fetch(`${STRAPI_API_URL}/problems/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_JWT}`,
      },
    });

    const json = await response.json();
    const problemDTO: ProblemDTO = json.data;

    const problem = new Problem(
      problemDTO.id,
      problemDTO.attributes.title,
      problemDTO.attributes.description,
      problemDTO.attributes.difficulty,
      problemDTO.attributes.constraints,
      new Date(problemDTO.attributes.createdAt),
      new Date(problemDTO.attributes.updatedAt)
    );

    return problem;
  }
}
