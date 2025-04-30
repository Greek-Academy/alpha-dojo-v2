import { z } from 'zod';
import {
  strapiCommonAttributesDTO,
  strapiCommonDTO,
} from '../strapi/strapi-response';
import { supportedLanguageKey } from '@/domain/entities/language';

export const languageDTO = strapiCommonDTO.extend({
  attributes: strapiCommonAttributesDTO.extend({
    key: supportedLanguageKey,
    label: z.string(),
  }),
});

export type LanguageDTO = z.infer<typeof languageDTO>;
