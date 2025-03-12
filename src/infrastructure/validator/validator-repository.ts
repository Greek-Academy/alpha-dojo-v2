import { Validator } from '@/domain/entities/validator';
import { ValidatorDTO } from './validator-response';
import { SupportedLanguage } from '@/domain/entities/supported-language';

export const newValidatorFromDTO = (
  validator: ValidatorDTO,
  problemId: string,
  language: SupportedLanguage
) => {
  return new Validator(
    validator.id.toString(),
    problemId,
    language,
    validator.attributes.code,
    new Date(validator.attributes.createdAt),
    new Date(validator.attributes.updatedAt)
  );
};
