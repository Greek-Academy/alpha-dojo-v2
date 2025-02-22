import { SupportedLanguage } from '@/lib/languages';

export class InitialCode {
  constructor(
    public readonly id: string,
    public readonly problemId: string,
    public readonly language: SupportedLanguage,
    public readonly codeText: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
