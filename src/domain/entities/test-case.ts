export class TestCase {
  constructor(
    public readonly id: string,
    public readonly problemId: string,
    public readonly cmdArguments: string,
    public readonly expect: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
