import { z } from 'zod';

export const statusEnum = ['accepted', 'wrong-answer', 'compilation-error', 'unknown'] as const;

/** Zod */
export const status = z.enum(statusEnum);
export type Status = z.infer<typeof status>;

export class TestResult {
  constructor(
    public readonly id: string,
    public readonly stdout: string,
    public readonly time_ms: number,
    public readonly memory: number,
    public readonly stderr: string,
    public readonly compileOutput: string,
    public readonly status: Status,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
