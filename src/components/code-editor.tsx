import React from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';
import { SupportedLanguage } from '@/domain/entities/supported-language';
import Image from 'next/image';
import Spinner from '@/public/spinner.svg';
import { cn } from '@/lib/utils';

export const CodeEditor = ({
  language,
  options,
  className,
  ...props
}: EditorProps & {
  language: SupportedLanguage;
}) => {
  const monacoLanguage: { [key in SupportedLanguage]: string } = {
    TYPESCRIPT: 'typesript',
    PYTHON: 'python',
  };

  const Options: EditorProps['options'] = {
    minimap: {
      enabled: false,
    },
  };

  return (
    <Editor
      language={monacoLanguage[language]}
      loading={<Image src={Spinner} width={40} height={40} alt='loading' />}
      options={Object.assign(Options, options)}
      // サイズ変更が少し遅れるため、一瞬スクロールバーが表示されてしまうのを回避
      className={cn('overflow-hidden', className)}
      {...props}
    />
  );
};
