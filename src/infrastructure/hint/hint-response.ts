import { z } from 'zod';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from '../strapi/strapi-common-dto';
import { ProblemDTO, problemDTO } from '../problem/problem-response';

const baseHintAttributesDTO = strapiCommonAttributesDTO.extend({
  order: z.number(),
  description: z.string(),
});

const baseHintDTO = strapiCommonDTO.extend({
  attributes: baseHintAttributesDTO,
});

export type HintDTO = z.infer<typeof baseHintDTO> & {
  attributes: {
    problem_id?: {
      data: ProblemDTO;
    };
  };
};

export const hintDTO: z.ZodType<HintDTO> = baseHintDTO.extend({
  attributes: baseHintAttributesDTO.extend({
    problem_id: z
      .object({
        data: z.lazy(() => problemDTO),
      })
      .optional(),
  }),
});
