import { Language } from './language';

export class Validator {
  constructor(
    public readonly id: string,
    public readonly problemId: string,
    public readonly language: Language,
    public readonly codeText: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
