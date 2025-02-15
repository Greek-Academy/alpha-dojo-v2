type JudgeErrorCode =
    | 'unknown'
    | 'empty-language'
    | 'unsupported-language'
    | 'wall-time-limit'
    | 'wait-not-allowed'
    | 'full-queue'
    | 'invalid-api-key'
    | 'invalid-page';

export class JudgeError extends Error {
    constructor(
        message: string,
        public readonly code: JudgeErrorCode,
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
    static fromUnknown(err: unknown): JudgeError {
        if (err instanceof Error) {
            return new JudgeError(err.message, 'unknown', { cause: err });
        } else {
            return new JudgeError('Unknown error', 'unknown');
        }
    }
}
