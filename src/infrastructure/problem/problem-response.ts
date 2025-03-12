import { z } from 'zod';
import { difficulty } from '@/domain/entities/problem';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from '../strapi/strapi-response';
import { validatorDTO } from '../validator/validator-response';
import { hintDTO } from '../hint/hint-response';
import { initialCodeDTO } from '../initial-code/initial-code-response';
import { testCaseDTO } from '../test-case/test-case-response';

export const problemDTO = strapiCommonDTO.extend({
  attributes: strapiCommonAttributesDTO.extend({
    title: z.string(),
    description: z.string(),
    difficulty: difficulty,
    constraints: z.string(),
    validators: z
      .object({
        data: z.array(validatorDTO),
      })
      .optional(),
    hints: z
      .object({
        data: z.array(hintDTO),
      })
      .optional(),
    initial_codes: z
      .object({
        data: z.array(initialCodeDTO),
      })
      .optional(),
    test_cases: z
      .object({
        data: z.array(testCaseDTO),
      })
      .optional(),
  }),
});

export type ProblemDTO = z.infer<typeof problemDTO>;

/** @deprecated DOJO-81 によって、今後不要 */
export const strapiProblems = z.object({
  data: z.array(problemDTO),
});

/** @deprecated DOJO-81 によって、今後不要 */
export type StrapiProblems = z.infer<typeof strapiProblems>;
