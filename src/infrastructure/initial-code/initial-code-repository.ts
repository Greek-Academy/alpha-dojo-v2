import { InitialCode } from '@/domain/entities/initial-code';
import { InitialCodeDTO } from './initial-code-response';
import { SupportedLanguageKey } from '@/domain/entities/language';
import { languageKeyToLanguage } from '@/domain/repositories/language-repository';

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
