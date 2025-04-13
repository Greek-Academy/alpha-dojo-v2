import { Validator } from '@/domain/entities/validator';
import { ValidatorDTO } from './validator-response';
import { SupportedLanguageKey } from '@/domain/entities/language';
import { languageKeyToLanguage } from '@/domain/repositories/language-repository';

export const newValidatorFromDTO = (
  validator: ValidatorDTO,
  problemId: string,
  languageKey: SupportedLanguageKey
) => {
  return new Validator(
    validator.id.toString(),
    problemId,
    languageKeyToLanguage(languageKey),
    validator.attributes.code,
    new Date(validator.attributes.createdAt),
    new Date(validator.attributes.updatedAt)
  );
};
