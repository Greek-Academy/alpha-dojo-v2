import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { Problem } from '@/domain/entities/problem';
import { ok } from 'neverthrow';
import { problemDTO, ProblemDTO } from '../dto/problem-dto';
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
  //TODO: Authorizationはログイン時のトークンを使用する
  getProblems = () =>
    fetchStrapiData<ProblemDTO[]>(
      '/problems',
      problemDTO.array(),
      {},
      process.env.NEXT_PUBLIC_STRAPI_JWT ?? ''
    )
      .andThen((problems) =>
        ok(problems.map((problem) => newProblemFromDTO(problem)))
      )
      .mapErr((err) => err.toResponseError());
}
