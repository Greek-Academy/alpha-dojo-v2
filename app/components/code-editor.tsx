import React from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';
import { Language } from '@/lib/languages';

export const CodeEditor = ({ language, ...props }: EditorProps) => {
  return (
    <Editor language={language || Language.typescript.id.monaco} {...props} />
  );
};
