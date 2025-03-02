import { z } from 'zod';

export const difficultyEnum = ['Easy', 'Medium', 'Hard'] as const;

/** Zod */
export const difficulty = z.enum(difficultyEnum);
export type Difficulty = z.infer<typeof difficulty>;

export class Problem {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly difficulty: Difficulty,
    public readonly constraintsDescription: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
