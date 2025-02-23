import { z } from 'zod';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from './strapi-common-dto';
import { ProblemDTO, problemDTO } from './problem-dto';

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
