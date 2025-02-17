/** 言語情報 */
export interface LanguageInfo {
  id: {
    monaco: string;
    judge: number;
  };
  name: string;
}

export const Language = {
  typescript: {
    id: {
      monaco: 'typescript',
      judge: 1,
    },
    name: 'TypeScript',
  },
  python: {
    id: {
      monaco: 'python',
      judge: 2,
    },
    name: 'Python',
  },
  c: {
    id: {
      monaco: 'c',
      judge: 3,
    },
    name: 'C',
  },
} as const satisfies { [key: string]: LanguageInfo };

export type SupportedLanguage = keyof typeof Language;

export type SupportedLanguageJudgeId = typeof Language[SupportedLanguage]['id']['judge'];
