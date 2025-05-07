import { z } from 'zod';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from '../strapi/strapi-response';
import { ProblemDTO, problemDTO } from '../problem/problem-response';
import { LanguageDTO, languageDTO } from '../language/language-response';

const baseInitialAttributesCodeDTO = strapiCommonAttributesDTO.extend({
  code: z.string(),
  language: z
    .object({
      data: languageDTO,
    })
    .optional(),
});

const baseInitialCodeDTO = strapiCommonDTO.extend({
  attributes: baseInitialAttributesCodeDTO,
});

export type InitialCodeDTO = z.infer<typeof baseInitialCodeDTO> & {
  attributes: {
    problem?: {
      data: ProblemDTO;
    };
  };
};

export const initialCodeDTO: z.ZodType<InitialCodeDTO> =
  baseInitialCodeDTO.extend({
    attributes: baseInitialAttributesCodeDTO.extend({}),
  });

export type InitialCodeLanguageRequiredDTO = z.infer<
  typeof baseInitialCodeDTO
> & {
  attributes: {
    language: {
      data: LanguageDTO;
    };
    problem?: {
      data: ProblemDTO;
    };
  };
};

export const initialCodeLanguageRequiredDTO: z.ZodType<InitialCodeDTO> =
  baseInitialCodeDTO.extend({
    attributes: baseInitialAttributesCodeDTO.extend({
      language: z.object({
        data: z.lazy(() => languageDTO),
      }),
      problem: z
        .object({
          data: z.lazy(() => problemDTO),
        })
        .optional(),
    }),
  });
