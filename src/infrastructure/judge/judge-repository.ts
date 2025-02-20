import { err, ok, ResultAsync } from 'neverthrow';
import { WithJson, withJson } from '@/infrastructure/infra-utils';
import { normalizeError } from '@/lib/err-utils';
import { JudgeError, JudgeErrorCode } from '@/infrastructure/judge/judge-error';
import {
  JudgeSubmission,
  judgeSubmission,
} from '@/infrastructure/judge/judge-response';
import { SupportedLanguage } from '@/lib/languages';
import { JUDGE_API_ENDPOINT } from '@/constants/paths';
import { JUDGE_API_KEY } from '@/constants/env';

const POLLING_INTERVAL = 3000;

export type JudgeRepository = {
  /**
   * Creates new submission (POST /submissions)
   * @param languageId The language ID (int)
   * @param sourceCode The source code
   * @param stdin The standard input
   * @throws JudgeError (code: unknown, empty-language, unsupported-language, wall-time-limit, wait-not-allowed, full-queue, invalid-api-key)
   * @returns The submission token
   */
  createSubmission: (
    language: SupportedLanguage,
    sourceCode: string,
    stdin: string
  ) => ResultAsync<string, JudgeError<JudgeErrorCode.CreateSubmission>>;
  /**
   * Get submission (GET /submissions/:token)
   * @param token The submission token that was returned from createSubmission
   * @throws JudgeError (code: unknown, invalid-api-key, invalid-page)
   * @returns The submission object
   */
  getSubmission: (
    token: string
  ) => ResultAsync<JudgeSubmission, JudgeError<JudgeErrorCode.GetSubmission>>;
};

const languageIds = new Map<SupportedLanguage, number>([
  ['typescript', 1],
  ['python', 2],
  ['c', 3],
]);

export const judgeRepository: JudgeRepository = {
  createSubmission: (language, sourceCode, stdin) =>
    ResultAsync.fromPromise(
      fetch(
        `${JUDGE_API_ENDPOINT}/submissions/?base64_encoded=false&wait=false`,
        {
          headers: getHeaders(),
          body: JSON.stringify({
            language_id: languageIds.get(language),
            source_code: sourceCode,
            stdin,
          }),
          method: 'POST',
        }
      ),
      normalizeError
    )
      .andThen(withJson)
      .mapErr(JudgeError.fromUnknown)
      .andThen((res) =>
        typeof res.js === 'object' &&
        res.js !== null &&
        'token' in res.js &&
        typeof res.js.token === 'string'
          ? ok(res.js.token)
          : err(getJudgeErrorFromCreate(res))
      ),
  getSubmission: (token) =>
    ResultAsync.fromPromise(
      fetch(`${JUDGE_API_ENDPOINT}/submissions/${token}?base64_encoded=true`, {
        headers: getHeaders(),
        method: 'GET',
      }),
      normalizeError
    )
      .andThen(withJson)
      .mapErr(JudgeError.fromUnknown)
      .andThen((res) =>
        res.ok
          ? ok(judgeSubmission.safeParse(res.js))
          : err(getJudgeErrorFromGet(res))
      )
      .andThen((jres) =>
        jres.success
          ? ok(jres.data)
          : err(
              new JudgeError('Invalid response', 'unknown', {
                cause: jres.error,
              })
            )
      )
      .andThen((subm) =>
        // 1: In Queue, 2: Processing
        [1, 2].includes(subm.status.id)
          ? // wait for POLLING_INTERVAL ms and then get the submission again
            ResultAsync.fromPromise(
              new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL)),
              (err) => JudgeError.fromUnknown(err)
            ).andThen(() => judgeRepository.getSubmission(token))
          : ok(subm)
      ),
};

const getHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Auth-Token': JUDGE_API_KEY,
});

/**
 * Create a JudgeError from a response object
 * @param res The response object
 * @see https://ce.judge0.com/#submissions-submission-post submission error docs
 * @see https://ce.judge0.com/#authentication authentication error docs
 */
const getJudgeErrorFromCreate = (
  res: WithJson<Response>
): JudgeError<JudgeErrorCode.CreateSubmission> => {
  const status = res.status;
  const body = res.js;

  if (typeof body !== 'object' || body === null) {
    return new JudgeError('Invalid response body', 'unknown', {
      cause: body,
    });
  }

  if (status === 422) {
    if ('language_id' in body && body.language_id instanceof Array) {
      if (body.language_id.at(0) === "can't be blank") {
        return new JudgeError(body.language_id.at(0), 'empty-language', {
          cause: body,
        });
      } else {
        return new JudgeError(body.language_id.at(0), 'unsupported-language', {
          cause: body,
        });
      }
    }

    if ('wall_time_limit' in body && body.wall_time_limit instanceof Array) {
      return new JudgeError(body.wall_time_limit.at(0), 'wall-time-limit', {
        cause: body,
      });
    }
  }

  if (status === 401) {
    return new JudgeError('Invalid api key', 'invalid-api-key', {
      cause: body,
    });
  }

  if ('error' in body && typeof body.error === 'string') {
    if (status === 400) {
      return new JudgeError(body.error, 'wait-not-allowed', { cause: body });
    }

    if (status === 503) {
      return new JudgeError(body.error, 'full-queue', { cause: body });
    }
  }

  return new JudgeError(String(body), 'unknown', { cause: body });
};

const getJudgeErrorFromGet = (
  res: WithJson<Response>
): JudgeError<JudgeErrorCode.GetSubmission> => {
  const status = res.status;
  const body = res.js;

  if (status === 401) {
    return new JudgeError('Invalid api key', 'invalid-api-key', {
      cause: body,
    });
  }

  if (status === 400) {
    const error =
      typeof body === 'object' &&
      body !== null &&
      'error' in body &&
      typeof body.error === 'string'
        ? body.error
        : JSON.stringify(body);

    return new JudgeError(error, 'invalid-page', { cause: body });
  }

  return new JudgeError(String(body), 'unknown', { cause: body });
};
