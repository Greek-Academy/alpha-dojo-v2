import { z } from 'zod';
import { difficulty } from '@/domain/entities/problem';
import { strapiCommonAttributesDTO, strapiCommonDTO } from './strapi-common-dto';
import { validatorDTO } from './validator-dto';
import { hintDTO } from './hint-dto';
import { initialCodeDTO } from './initial-code-dto';
import { testCaseDTO } from './test-case-dto'

export const problemDTO = strapiCommonDTO.extend({
  attributes: strapiCommonAttributesDTO.extend({
    title: z.string(),
    description: z.string(),
    difficulty: difficulty,
    constraints: z.string(),
    validators: z.object({
      data: z.array(validatorDTO)
    }),
    hints: z.object({
      data: z.array(hintDTO)
    }),
    initial_codes: z.object({
      data: z.array(initialCodeDTO)
    }),
    test_cases: z.object({
      data: z.array(testCaseDTO)
    })
  }),
});

export type ProblemDTO = z.infer<typeof problemDTO>;
