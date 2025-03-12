import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { Problem } from '@/domain/entities/problem';
import { ResultAsync, err, ok } from 'neverthrow';
import { normalizeError } from '@/lib/err-utils';
import { WithJson, withJson } from '../infra-utils';
import { StrapiError } from '../strapi-error';
import { strapiProblems } from './problem-response';
import { errorResponse } from '../dto/error';
import { ProblemDTO } from '../dto/problem-dto';
import { STRAPI_API_URL } from '@/constants/paths';

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
    ResultAsync.fromPromise(
      fetch(`${STRAPI_API_URL}/problems`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authToken}`,
        },
      }),
      normalizeError
    )
      .andThen(withJson)
      .mapErr(StrapiError.fromUnknown)
      .andThen((res) =>
        res.ok
          ? ok(strapiProblems.safeParse(res.js))
          : err(getStrapiErrorFromGet(res))
      )
      .andThen((jres) =>
        jres.success
          ? ok(jres.data.data)
          : err(
              new StrapiError('Invalid response', undefined, {
                cause: jres.error,
              })
            )
      )
      .andThen((problems) =>
        ok(problems.map((problem) => newProblemFromDTO(problem)))
      )
      .mapErr((err) => err.toResponseError());
}

const getStrapiErrorFromGet = (res: WithJson<Response>): StrapiError => {
  const status = res.status;
  const body = res.js;

  const parsed = errorResponse.safeParse(body);

  const message = parsed.success ? parsed.data.error.message : 'Unknown error';

  return new StrapiError(message, status, {
    cause: body,
  });
};
