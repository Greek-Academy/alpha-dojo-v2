export class ResponseError extends Error {
  constructor(
    /** レスポンスの HTTP ステータスコード */
    public status: number,
    /** `status`に対応するステータスメッセージ */
    public statusText: string,
    /** エラーの内容を表すメッセージ */
    e?: string
  ) {
    super(e);
    this.name = 'ResponseError';
    this.message = `HTTP ${status}: ${e}`;
  }
}
