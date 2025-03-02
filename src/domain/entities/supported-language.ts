import { z } from 'zod';

export const SUPPORTED_LANGUAGE_ENUM = [
  'TypeScript',
  'Python',
] as const satisfies string[];

/** Zod */
export const supportedLanguage = z.enum(SUPPORTED_LANGUAGE_ENUM);
export type SupportedLanguage = z.infer<typeof supportedLanguage>;
