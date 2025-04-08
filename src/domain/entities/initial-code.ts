import { SupportedLanguage } from './supported-language';

export class InitialCode {
  constructor(
    public readonly id: string,
    public readonly language: SupportedLanguage,
    public readonly codeText: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
