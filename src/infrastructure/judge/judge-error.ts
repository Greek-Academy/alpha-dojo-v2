export namespace JudgeErrorCode {
  type Common = 'unknown' | 'invalid-api-key';

  export type CreateSubmission =
    | Common
    | 'empty-language'
    | 'unsupported-language'
    | 'wall-time-limit'
    | 'wait-not-allowed'
    | 'full-queue';
  export type GetSubmission = Common | 'invalid-page';
}

type JudgeErrorCode =
  | JudgeErrorCode.CreateSubmission
  | JudgeErrorCode.GetSubmission;

export class JudgeError<TCode extends JudgeErrorCode> extends Error {
  constructor(
    message: string,
    public readonly code: TCode,
    options?: ErrorOptions
  ) {
    super(message, options);
  }

  static {
    this.prototype.name = 'JudgeError';
  }

  /**
   * Create a JudgeError from an unknown type
   * @param err
   */
  static fromUnknown(err: unknown): JudgeError<'unknown'> {
    if (err instanceof Error) {
      return new JudgeError(err.message, 'unknown', { cause: err });
    } else {
      return new JudgeError('Unknown error', 'unknown');
    }
  }
}
