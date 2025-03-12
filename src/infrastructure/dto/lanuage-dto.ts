import { z } from 'zod';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from './strapi-common-dto';
import { ValidatorDTO, validatorDTO } from './validator-dto';
import { InitialCodeDTO, initialCodeDTO } from './initial-code-dto';
import { supportedLanguage } from '@/domain/entities/supported-language';

const baseLanguageAttributesDTO = strapiCommonAttributesDTO.extend({
  name: supportedLanguage,
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
