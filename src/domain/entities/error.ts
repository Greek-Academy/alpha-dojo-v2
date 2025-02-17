export type ResponseErrorCode =
  | 'Unknown'
  | 'Unauthorized'
  | 'Forbidden'
  | 'Not Found';

export class ResponseError extends Error {
  constructor(
    /** エラーの内容を表すメッセージ */
    public message: string,
    /** レスポンスの HTTP ステータスコード */
    public errorCode: ResponseErrorCode
  ) {
    super(message);
    this.name = 'ResponseError';
    this.message = `${errorCode} Error: ${message}`;
  }
}
