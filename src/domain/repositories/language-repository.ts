import {
  SupportedLanguageKey,
  Language,
  typescript,
  python,
} from '../entities/supported-language';

export const supportedLanguageToLanguage = (
  languageKey: SupportedLanguageKey
): Language => {
  switch (languageKey) {
    case 'TYPESCRIPT':
      return typescript;
    case 'PYTHON':
      return python;
    default:
      throw new Error(`Unsupported language: ${languageKey}`);
  }
};
