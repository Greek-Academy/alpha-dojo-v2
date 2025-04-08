import { InitialCode } from '@/domain/entities/initial-code';
import { InitialCodeDTO } from './initial-code-response';
import { SupportedLanguage } from '@/domain/entities/supported-language';

export const newInitialCodeFromDTO = (
  initialCode: InitialCodeDTO,
  language: SupportedLanguage
) => {
  return new InitialCode(
    initialCode.id.toString(),
    language,
    initialCode.attributes.code,
    new Date(initialCode.attributes.createdAt),
    new Date(initialCode.attributes.updatedAt)
  );
};
