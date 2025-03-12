import { ResponseError, ResponseErrorCode } from '@/domain/entities/error';
import { WithJson } from './infra-utils';
import { errorResponse } from './dto/error';

export class StrapiError extends Error {
  constructor(
    /** エラーの内容を表すメッセージ */
    message: string,
    /** レスポンスの HTTP ステータスコード */
    public status?: number,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'StrapiError';
  }

  /**
   * Create a StrapiError from an unknown type
   * @param err
   */
  static fromUnknown(err: unknown): StrapiError {
    if (err instanceof Error) {
      return new StrapiError(err.message, undefined, { cause: err });
    } else {
      return new StrapiError('Unknown error', undefined);
    }
  }

  public toResponseError(): ResponseError {
    const responseErrorCode: () => ResponseErrorCode = () => {
      switch (this.status) {
        case 401:
          return 'unauthorized';
        case 403:
          return 'forbidden';
        case 404:
          return 'not-found';
        default:
          return 'unknown';
      }
    };

    return new ResponseError(this.message, responseErrorCode());
  }
}

export const getStrapiErrorFromGet = (res: WithJson<Response>): StrapiError => {
  const status = res.status;
  const body = res.js;

  const parsed = errorResponse.safeParse(body);

  const message = parsed.success ? parsed.data.error.message : 'Unknown error';

  return new StrapiError(message, status, {
    cause: body,
  });
};
