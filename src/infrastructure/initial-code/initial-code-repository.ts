import { InitialCode } from '@/domain/entities/initial-code';
import { InitialCodeDTO } from '../dto/initial-code-dto';
import { SupportedLanguage } from '@/domain/entities/supported-language';

export const newInitialCodeFromDTO = (
  initialCode: InitialCodeDTO,
  problemId: string,
  language: SupportedLanguage
) => {
  return new InitialCode(
    initialCode.id.toString(),
    problemId,
    language,
    initialCode.attributes.code,
    new Date(initialCode.attributes.createdAt),
    new Date(initialCode.attributes.updatedAt)
  );
};
