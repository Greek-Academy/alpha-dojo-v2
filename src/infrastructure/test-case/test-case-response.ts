import { z } from 'zod';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from '../strapi/strapi-response';
import { ProblemDTO, problemDTO } from '../problem/problem-response';

const baseTestCaseAttributesDTO = strapiCommonAttributesDTO.extend({
  arguments: z.string(),
  expect: z.string(),
});

const baseTestCaseDTO = strapiCommonDTO.extend({
  attributes: baseTestCaseAttributesDTO,
});

export type TestCaseDTO = z.infer<typeof baseTestCaseDTO> & {
  attributes: {
    problem_id?: {
      data: ProblemDTO;
    };
  };
};

export const testCaseDTO: z.ZodType<TestCaseDTO> = baseTestCaseDTO.extend({
  attributes: baseTestCaseAttributesDTO.extend({
    problem_id: z
      .object({
        data: z.lazy(() => problemDTO),
      })
      .optional(),
  }),
});
