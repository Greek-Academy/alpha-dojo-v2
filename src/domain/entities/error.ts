export type ResponseErrorCode =
  | 'Unknown'
  | 'Unauthorized'
  | 'Forbidden'
  | 'Not Found';

export class ResponseError extends Error {
  constructor(
    /** エラーの内容を表すメッセージ */
    message: string,
    /** 発生したエラーの種別 */
    public errorCode: ResponseErrorCode,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'ResponseError';
    this.message = `${errorCode} Error: ${message}`;
  }
}
