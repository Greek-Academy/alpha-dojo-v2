import { ProblemRepository } from '@/domain/repositories/problem-repository';
import { Problem } from '@/domain/entities/problem';
import { ResultAsync, err, ok } from 'neverthrow';
import { normalizeError } from '@/lib/err-utils';
import { WithJson, withJson } from '../infra-utils';
import { StrapiError } from '../strapi-error';
import { strapiProblems } from './problem-response';
import { errorResponse } from '../dto/error';
import qs from 'qs';
import { supportedLanguageEnum } from '@/domain/entities/supported-language';
import { newHintFromDTO } from '../hint/hint-repository';
import { newInitialCodeFromDTO } from '../initial-code/initial-code-repository';
import { newTestCaseFromDTO } from '../test-case/test-case-repository';
import { newValidatorFromDTO } from '../validator/validator-repository';
import { ProblemDTO } from '../dto/problem-dto';

const STRAPI_API_URL =
  (process.env.STRAPI_PUBLIC_URL || 'http://localhost:1337') + '/api';

export const newProblemFromDTO = (problem: ProblemDTO) => {
  return new Problem(
    problem.id.toString(),
    problem.attributes.title,
    problem.attributes.description,
    problem.attributes.difficulty,
    problem.attributes.constraints,
    problem.attributes.hints?.data.map((hint) =>
      newHintFromDTO(hint, problem.id.toString())
    ) ?? [],
    Object.fromEntries(
      supportedLanguageEnum.map((language) => {
        const initialCode = problem.attributes.initial_codes?.data.find(
          (initialCode) =>
            initialCode.attributes.language_id?.data.attributes.name ===
            language
        );
        return [
          language,
          initialCode &&
            newInitialCodeFromDTO(initialCode, problem.id.toString(), language),
        ];
      })
    ),
    problem.attributes.test_cases?.data.map((testCase) =>
      newTestCaseFromDTO(testCase, problem.id.toString())
    ) ?? [],
    // Initial Code と Validator のコードが全く同じなので改善の余地あり
    Object.fromEntries(
      supportedLanguageEnum.map((language) => {
        const validator = problem.attributes.validators?.data.find(
          (validator) =>
            validator.attributes.language_id?.data.attributes.name === language
        );
        return [
          language,
          validator &&
            newValidatorFromDTO(validator, problem.id.toString(), language),
        ];
      })
    ),
    new Date(problem.attributes.createdAt),
    new Date(problem.attributes.updatedAt)
  );
};

export class ApiProblemRepository implements ProblemRepository {
  //TODO: Authorizationはログイン時のトークンを使用する
  getProblems = () =>
    ResultAsync.fromPromise(
      fetch(
        `${STRAPI_API_URL}/problems?${qs.stringify(
          {
            // Strapi の Relations をレスポンスに含める
            populate: [
              'validators.language_id',
              'hints',
              'initial_codes.language_id',
              'test_cases',
            ],
          },
          {
            encodeValuesOnly: true, // prettify URL
          }
        )}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_JWT}`,
          },
        }
      ),
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
