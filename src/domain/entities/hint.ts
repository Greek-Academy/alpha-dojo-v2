export class Hint {
  constructor(
    public readonly id: string,
    public readonly order: number,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
