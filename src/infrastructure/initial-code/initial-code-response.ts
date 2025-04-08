import { z } from 'zod';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from '../strapi/strapi-response';
import { ProblemDTO, problemDTO } from '../problem/problem-response';
import { LanguageDTO, languageDTO } from '../language/language-response';

const baseInitialAttributesCodeDTO = strapiCommonAttributesDTO.extend({
  code: z.string(),
});

const baseInitialCodeDTO = strapiCommonDTO.extend({
  attributes: baseInitialAttributesCodeDTO,
});

export type InitialCodeDTO = z.infer<typeof baseInitialCodeDTO> & {
  attributes: {
    language_id?: {
      data: LanguageDTO;
    };
    problem_id?: {
      data: ProblemDTO;
    };
  };
};

export const initialCodeDTO: z.ZodType<InitialCodeDTO> =
  baseInitialCodeDTO.extend({
    attributes: baseInitialAttributesCodeDTO.extend({
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
