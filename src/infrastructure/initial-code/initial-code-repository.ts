import { InitialCode } from '@/domain/entities/initial-code';
import {
  InitialCodeDTO,
  InitialCodeLanguageRequiredDTO,
  initialCodeLanguageRequiredDTO,
} from './initial-code-response';
import { SupportedLanguageKey } from '@/domain/entities/language';
import { languageKeyToLanguage } from '@/domain/repositories/language-repository';
import {
  InitialCodeFilters,
  InitialCodeRepository,
} from '@/domain/repositories/initial-code-repository';
import { fetchStrapiData } from '../strapi/strapi-utils';
import { ok, ResultAsync } from 'neverthrow';
import { normalizeError } from '@/lib/err-utils';
import { StrapiError } from '../strapi/strapi-error';

export const newInitialCodeFromRequiredDTO = (
  initialCode: InitialCodeLanguageRequiredDTO
) =>
  newInitialCodeFromDTO(
    initialCode,
    initialCode.attributes.language.data.attributes.key
  );

export const newInitialCodeFromDTO = (
  initialCode: InitialCodeDTO,
  languageKey: SupportedLanguageKey
) =>
  new InitialCode(
    initialCode.id.toString(),
    languageKeyToLanguage(languageKey),
    initialCode.attributes.code,
    new Date(initialCode.attributes.createdAt),
    new Date(initialCode.attributes.updatedAt)
  );

const initialCodeEndpoint = '/initial-codes';

export class ApiInitialCodeRepository implements InitialCodeRepository {
  constructor(private readonly authToken?: string) {}

  getInitialCodeById = (id: string) =>
    fetchStrapiData<InitialCodeLanguageRequiredDTO>(
      `${initialCodeEndpoint}/${id}`,
      initialCodeLanguageRequiredDTO,
      {
        populate: 'language',
      },
      this.authToken
    )
      .andThen((initialCode) => ok(newInitialCodeFromRequiredDTO(initialCode)))
      .mapErr((err) => err.toResponseError());

  getInitialCodes = (filters?: InitialCodeFilters) =>
    fetchStrapiData<InitialCodeLanguageRequiredDTO[]>(
      initialCodeEndpoint,
      initialCodeLanguageRequiredDTO.array(),
      {
        filters: {
          problem: {
            id: {
              $eq: Number(filters?.problemId),
            },
          },
          language: {
            key: {
              $eq: filters?.language?.key,
            },
          },
        },
      }
    )
      .andThen((initialCodes) =>
        ResultAsync.fromPromise(
          Promise.all(
            initialCodes.map((initialCode) =>
              newInitialCodeFromRequiredDTO(initialCode)
            )
          ),
          normalizeError
        ).mapErr(StrapiError.fromUnknown)
      )
      .mapErr((err) => err.toResponseError());
}
