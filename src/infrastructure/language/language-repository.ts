import { Language } from '@/domain/entities/language';
import { fetchStrapiData } from '../strapi/strapi-utils';
import { languageDTO, LanguageDTO } from './language-response';
import { ResponseError } from '@/domain/entities/error';
import { err, ok, ResultAsync } from 'neverthrow';

export const getAllLanguages = (): ResultAsync<LanguageDTO[], ResponseError> =>
  fetchStrapiData<LanguageDTO[]>(
    '/languages',
    languageDTO.array(),
    {},
    process.env.NEXT_PUBLIC_STRAPI_JWT ?? ''
  ).mapErr((err) => err.toResponseError());

export const languageToId = (
  language: Language
): ResultAsync<string, ResponseError> =>
  getAllLanguages().andThen((languages) => {
    const lang = languages.find((lang) => lang.attributes.key === language.key);
    return lang
      ? ok(lang.id.toString())
      : err(new ResponseError('Language not found', 'not-found'));
  });
