import { ResponseError, ResponseErrorCode } from '@/domain/entities/error';

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
          return 'Unauthorized';
        case 403:
          return 'Forbidden';
        case 404:
          return 'Not Found';
        default:
          return 'Unknown';
      }
    };

    return new ResponseError(this.message, responseErrorCode());
  }
}
