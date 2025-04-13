import {
  SupportedLanguageKey,
  Language,
  typescript,
  python,
} from '../entities/language';

export const languageKeyToLanguage = (
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
