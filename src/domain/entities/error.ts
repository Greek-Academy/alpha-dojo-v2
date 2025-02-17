export class ResponseError extends Error {
  constructor(
    /** エラーの内容を表すメッセージ */
    public message: string,
    /** レスポンスの HTTP ステータスコード */
    public status: number,
    /** `status`に対応するステータスメッセージ */
    public statusText: string
  ) {
    super(message);
    this.name = 'ResponseError';
    this.message = `HTTP ${status}: ${message}`;
  }
}
