import { z } from 'zod';

export const difficulty = z.union([
  z.literal('Easy'),
  z.literal('Medium'),
  z.literal('Hard'),
]);

export type Difficulty = z.infer<typeof difficulty>;

export class Problem {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly difficulty: Difficulty,
    public readonly constrains: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
