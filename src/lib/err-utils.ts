export const normalizeError: (err: unknown) => Error = (err) =>
  err instanceof Error ? err : new Error(JSON.stringify(err));
