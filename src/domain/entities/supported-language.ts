import { z } from 'zod';

export const supportedLanguageEnum = [
  'TYPESCRIPT',
  'PYTHON',
] as const satisfies string[];

/** Zod */
export const supportedLanguage = z.enum(supportedLanguageEnum);
export type SupportedLanguage = z.infer<typeof supportedLanguage>;

export class Language {
  public readonly label: string;
  public readonly order: number;

  constructor(
    public readonly id: SupportedLanguage,
    options: {
      label: string;
      order: number;
    }
  ) {
    this.label = options.label;
    this.order = options.order;
    Object.freeze(this);
  }
}

export const typescript = new Language('TYPESCRIPT', {
  label: 'TypeScript',
  order: 1,
});

export const python = new Language('PYTHON', {
  label: 'Python',
  order: 2,
});
