import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Code } from 'lucide-react';
import { CodeEditor } from './code-editor';
import { Language, SupportedLanguage } from '@/lib/languages';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

export const CodeTab = ({ className }: { className?: string }) => {
  const defaultLanguage: SupportedLanguage = 'typescript';

  const [language, setLanguage] =
    React.useState<SupportedLanguage>(defaultLanguage);

  return (
    <Tabs defaultValue="code" className={cn('h-full', className)}>
      <TabsList>
        <TabsTrigger value="code">
          <Code size="14" />
          code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="code">
        <div className="flex flex-col w-full h-full">
          <div className="p-2 flex">
            {/* 言語選択 */}
            <Select
              defaultValue={defaultLanguage}
              onValueChange={(value) => {
                setLanguage(value as SupportedLanguage);
              }}
            >
              <SelectTrigger className="w-auto border-0 shadow-none gap-2 p-0 h-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(Language).map(([key, value]) => {
                  return (
                    <SelectItem value={key} key={key}>
                      {value.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <CodeEditor language={Language[language].id.monaco} />
        </div>
      </TabsContent>
    </Tabs>
  );
};
