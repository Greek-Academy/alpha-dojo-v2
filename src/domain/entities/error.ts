export type ResponseErrorCode =
  | 'unknown'
  | 'unauthorized'
  | 'forbidden'
  | 'not-found';

export class ResponseError extends Error {
  constructor(
    /** エラーの内容を表すメッセージ */
    message: string,
    /** 発生したエラーの種別 */
    public errorCode: ResponseErrorCode,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.message = `${errorCode} Error: ${message}`;
  }
  static {
    this.prototype.name = 'ResponseError';
  }
}
