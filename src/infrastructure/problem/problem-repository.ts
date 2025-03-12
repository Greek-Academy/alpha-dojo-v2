import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { Problem } from '@/domain/entities/problem';
import { ok } from 'neverthrow';
import { problemDTO, ProblemDTO } from './problem-response';
import { fetchStrapiData } from '../strapi/strapi-utils';

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
}
