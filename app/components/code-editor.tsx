import React from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';
import { Language } from '@/lib/languages';
import Image from 'next/image';
import Spinner from '@/public/spinner.svg';

export const CodeEditor = ({ language, ...props }: EditorProps) => {
  return (
    <Editor
      language={language || Language.typescript.id.monaco}
      loading={<Image src={Spinner} width={40} height={40} alt="loading" />}
      {...props}
    />
  );
};
