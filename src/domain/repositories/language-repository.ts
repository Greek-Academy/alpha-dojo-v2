import {
  SupportedLanguage,
  Language,
  typescript,
  python,
} from '../entities/supported-language';

export const supportedLanguageToLanguage = (
  languageId: SupportedLanguage
): Language => {
  switch (languageId) {
    case 'TYPESCRIPT':
      return typescript;
    case 'PYTHON':
      return python;
    default:
      throw new Error(`Unsupported language: ${languageId}`);
  }
};
