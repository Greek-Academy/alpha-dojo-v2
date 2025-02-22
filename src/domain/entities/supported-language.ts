import { z } from 'zod';

export const supportedLanguageEnum = ['TypeScript', 'Python'] as const;

/** Zod */
export const supportedLanguage = z.enum(supportedLanguageEnum);
export type SupportedLanguage = z.infer<typeof supportedLanguage>;
