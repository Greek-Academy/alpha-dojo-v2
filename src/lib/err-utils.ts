/**
 * Normalizes an unknown error to an Error instance.
 * @param err The unknown error
 * @returns The normalized error
 */
export const normalizeError: (err: unknown) => Error = (err) =>
  err instanceof Error ? err : new Error(JSON.stringify(err));
