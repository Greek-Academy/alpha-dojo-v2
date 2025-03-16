import { SupportedLanguage } from '@/domain/entities/supported-language';
import { fetchStrapiData } from '../strapi/strapi-utils';
import { languageDTO, LanguageDTO } from './language-response';
import { ResponseError } from '@/domain/entities/error';
import { err, ok, ResultAsync } from 'neverthrow';

export const getAllLanguages = (): ResultAsync<LanguageDTO[], ResponseError> =>
  fetchStrapiData<LanguageDTO[]>(
    '/language',
    languageDTO.array(),
    {},
    process.env.NEXT_PUBLIC_STRAPI_JWT ?? ''
  ).mapErr((err) => err.toResponseError());

export const supportedLanguageToId = (
  language: SupportedLanguage
): ResultAsync<string, ResponseError> =>
  getAllLanguages().andThen((languages) => {
    const lang = languages.find((lang) => lang.attributes.name === language);
    return lang
      ? ok(lang.id.toString())
      : err(new ResponseError('Language not found', 'not-found'));
  });
