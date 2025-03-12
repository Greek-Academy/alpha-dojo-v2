import { z } from 'zod';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from './strapi-common-dto';
import { ProblemDTO, problemDTO } from './problem-dto';
import { languageDTO } from './lanuage-dto';

const baseValidatorAttributesDTO = strapiCommonAttributesDTO.extend({
  language_id: z
    .object({
      data: languageDTO,
    })
    .optional(),
  code: z.string(),
});

const baseValidatorDTO = strapiCommonDTO.extend({
  attributes: baseValidatorAttributesDTO,
});

export type ValidatorDTO = z.infer<typeof baseValidatorDTO> & {
  attributes: {
    problem_id?: {
      data: ProblemDTO;
    };
  };
};

export const validatorDTO: z.ZodType<ValidatorDTO> = baseValidatorDTO.extend({
  attributes: baseValidatorAttributesDTO.extend({
    problem_id: z
      .object({
        data: z.lazy(() => problemDTO),
      })
      .optional(),
  }),
});
