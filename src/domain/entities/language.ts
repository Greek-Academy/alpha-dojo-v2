import { z } from 'zod';

export const supportedLanguageKeys = [
  'TYPESCRIPT',
  'PYTHON',
] as const satisfies string[];

/** Zod */
export const supportedLanguageKey = z.enum(supportedLanguageKeys);
export type SupportedLanguageKey = z.infer<typeof supportedLanguageKey>;

export class Language {
  public readonly label: string;
  public readonly order: number;

  constructor(
    public readonly key: SupportedLanguageKey,
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
