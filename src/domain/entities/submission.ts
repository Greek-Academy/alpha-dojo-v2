import { SupportedLanguage } from './supported-language';

export class Submission {
  constructor(
    public readonly id?: string,
    public readonly authorId: string,
    public readonly problemId: string,
    public readonly language: SupportedLanguage,
    public readonly codeText: string,
    public readonly testResultId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
