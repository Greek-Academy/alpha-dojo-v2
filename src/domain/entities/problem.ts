export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export class Problem {
  constructor(
    public readonly id: number | null,
    public readonly title: string,
    public readonly description: string,
    public readonly difficulty: Difficulty,
    public readonly constrains: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
