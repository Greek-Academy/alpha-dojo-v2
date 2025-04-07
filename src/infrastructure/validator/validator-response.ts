import { z } from 'zod';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from '../strapi/strapi-response';
import { ProblemDTO, problemDTO } from '../problem/problem-response';
import { LanguageDTO, languageDTO } from '../language/language-response';

const baseValidatorAttributesDTO = strapiCommonAttributesDTO.extend({
  code: z.string(),
});

const baseValidatorDTO = strapiCommonDTO.extend({
  attributes: baseValidatorAttributesDTO,
});

export type ValidatorDTO = z.infer<typeof baseValidatorDTO> & {
  attributes: {
    language_id?: {
      data: LanguageDTO;
    };
    problem_id?: {
      data: ProblemDTO;
    };
  };
};

export const validatorDTO: z.ZodType<ValidatorDTO> = baseValidatorDTO.extend({
  attributes: baseValidatorAttributesDTO.extend({
    language_id: z
      .object({
        data: z.lazy(() => languageDTO),
      })
      .optional(),
    problem_id: z
      .object({
        data: z.lazy(() => problemDTO),
      })
      .optional(),
  }),
});
