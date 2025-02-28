import { z } from 'zod';
import { Hint } from './hint';
import { SupportedLanguage } from './supported-language';
import { InitialCode } from './initial-code';
import { TestCase } from './test-case';
import { Validator } from './validator';

export const difficultyEnum = ['Easy', 'Medium', 'Hard'] as const;

/** Zod */
export const difficulty = z.enum(difficultyEnum);
export type Difficulty = z.infer<typeof difficulty>;

export class Problem {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly difficulty: Difficulty,
    public readonly constraintsDescription: string,
    public readonly hints: Hint[],
    public readonly initialCode: {
      [key in SupportedLanguage]?: InitialCode;
    },
    public readonly testCases: TestCase[],
    public readonly validator: {
      [key in SupportedLanguage]?: Validator;
    },
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
