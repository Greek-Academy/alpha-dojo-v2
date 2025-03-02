import { ResultAsync } from 'neverthrow';
import { normalizeError } from '@/lib/err-utils';

export type WithJson<T> = T & { js: unknown };
export const withJson: (
  res: Response
) => ResultAsync<WithJson<Response>, Error> = (res) =>
  ResultAsync.fromPromise(res.json(), normalizeError).map((json) => ({
    ...res,
    js: json,
  }));
