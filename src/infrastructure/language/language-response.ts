import { z } from 'zod';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from '../strapi/strapi-response';
import { supportedLanguage } from '@/domain/entities/supported-language';

export const languageDTO = strapiCommonDTO.extend({
  attributes: strapiCommonAttributesDTO.extend({
    key: supportedLanguage,
    label: z.string(),
  }),
});

export type LanguageDTO = z.infer<typeof languageDTO>;
