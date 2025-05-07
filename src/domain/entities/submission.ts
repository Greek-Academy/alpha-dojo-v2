import { Language } from './language';

export class Submission {
  constructor(
    public readonly id: string,
    public readonly authorId: string,
    public readonly problemId: string,
    public readonly language: Language,
    public readonly codeText: string,
    public readonly reviewed: boolean,
    public readonly finished: boolean,
    public readonly testResultId: string | undefined,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export class SubmissionToCreate {
  constructor(
    public readonly authorId: string,
    public readonly problemId: string,
    public readonly language: Language,
    public readonly codeText: string
  ) {}
}
