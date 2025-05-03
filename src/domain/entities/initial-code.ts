import { Language } from './language';

export class InitialCode {
  constructor(
    public readonly id: string,
    public readonly language: Language,
    public readonly codeText: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
