import { SupportedLanguage } from './supported-language';

export class TestCase {
  constructor(
    public readonly id: string,
    public readonly problemId: string,
    public readonly language: SupportedLanguage,
    public readonly cmdArguments: string,
    public readonly expect: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
