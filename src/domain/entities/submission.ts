import { z } from 'zod';
import { SupportedLanguage } from './supported-language';

export const statusEnum = [
  'pending',
  'failed',
  'in-review',
  'reviewed',
  `finished`,
] as const;

/** Zod */
export const status = z.enum(statusEnum);
export type Status = z.infer<typeof status>;

export class Submission {
  constructor(
    public readonly id: string | undefined,
    public readonly authorId: string,
    public readonly problemId: string,
    public readonly language: SupportedLanguage,
    public readonly codeText: string,
    public readonly status: Status,
    public readonly testResultId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
