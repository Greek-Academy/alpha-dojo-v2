import { z } from 'zod';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from '../strapi/strapi-common-dto';
import { ProblemDTO, problemDTO } from '../problem/problem-response';
import { languageDTO } from '../language/lanuage-response';

const baseInitialAttributesCodeDTO = strapiCommonAttributesDTO.extend({
  language_id: z
    .object({
      data: languageDTO,
    })
    .optional(),
  code: z.string(),
});

const baseInitialCodeDTO = strapiCommonDTO.extend({
  attributes: baseInitialAttributesCodeDTO,
});

export type InitialCodeDTO = z.infer<typeof baseInitialCodeDTO> & {
  attributes: {
    problem_id?: {
      data: ProblemDTO;
    };
  };
};

export const initialCodeDTO: z.ZodType<InitialCodeDTO> =
  baseInitialCodeDTO.extend({
    attributes: baseInitialAttributesCodeDTO.extend({
      problem_id: z
        .object({
          data: z.lazy(() => problemDTO),
        })
        .optional(),
    }),
  });
