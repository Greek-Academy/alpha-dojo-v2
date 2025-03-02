import { z } from 'zod';

export const supportedLanguageEnum = [
  'TYPESCRIPT',
  'PYTHON',
] as const satisfies string[];

/** Zod */
export const supportedLanguage = z.enum(supportedLanguageEnum);
export type SupportedLanguage = z.infer<typeof supportedLanguage>;
