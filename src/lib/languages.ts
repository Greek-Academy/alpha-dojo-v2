/** 言語情報 */
export interface LanguageInfo {
  id: {
    monaco: string;
  };
  name: string;
}

export const Language = {
  typescript: {
    id: {
      monaco: 'typescript',
    },
    name: 'TypeScript',
  },
  python: {
    id: {
      monaco: 'python',
    },
    name: 'Python',
  },
  c: {
    id: {
      monaco: 'c',
    },
    name: 'C',
  },
} as const satisfies { [key: string]: LanguageInfo };

export type SupportedLanguage = keyof typeof Language;
