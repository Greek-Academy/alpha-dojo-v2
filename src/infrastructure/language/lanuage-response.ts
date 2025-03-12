import { z } from 'zod';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from '../strapi/strapi-response';
import { ValidatorDTO, validatorDTO } from '../validator/validator-response';
import {
  InitialCodeDTO,
  initialCodeDTO,
} from '../initial-code/initial-code-response';

const baseLanguageAttributesDTO = strapiCommonAttributesDTO.extend({
  name: z.string(),
});

const baseLanguageDTO = strapiCommonDTO.extend({
  attributes: baseLanguageAttributesDTO,
});

export type LanguageDTO = z.infer<typeof baseLanguageDTO> & {
  attributes: {
    validators?: {
      data: ValidatorDTO[];
    };
    initial_codes?: {
      data: InitialCodeDTO[];
    };
  };
};

export const languageDTO: z.ZodType<LanguageDTO> = baseLanguageDTO.extend({
  attributes: baseLanguageAttributesDTO.extend({
    validators: z
      .object({
        data: z.lazy(() => validatorDTO.array()),
      })
      .optional(),
    initial_codes: z
      .object({
        data: z.lazy(() => initialCodeDTO.array()),
      })
      .optional(),
  }),
});
