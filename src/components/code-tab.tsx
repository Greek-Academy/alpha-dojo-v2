import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Code } from 'lucide-react';
import { CodeEditor } from './code-editor';
import { Language, SupportedLanguage } from '@/../lib/languages';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { Confirm } from '@/components/ui/alert-dialog';
import { OnMount } from '@monaco-editor/react';
import { DialogPortalProps } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { RestartAltIcon } from '@/components/ui/icons';

const defaultCodes: { [key in SupportedLanguage]: string } = {
  typescript: String.raw`class Cat {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  meow(): void {
    console.log("Meow!");
  }
}

let myCat = new Cat("Tama", 5);
console.log(myCat.name); // 出力: Tama
myCat.meow(); // 出力: Meow!`,

  python: String.raw`class Cat:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  def meow(self):
    print("Meow!")

  my_cat = Cat("Tama", 5)
  print(my_cat.name)  # 出力: Tama
  my_cat.meow()  # 出力: Meow!`,

  c: String.raw`#include <stdio.h>
#include <string.h>

typedef struct {
  char name[50];
  int age;
} Cat;

void meow(Cat *cat) {
  printf("Meow!\n");
}

int main() {
  Cat my_cat;
  strcpy(my_cat.name, "Tama");
  my_cat.age = 5;

  printf("%s\n", my_cat.name); // 出力: Tama
  meow(&my_cat); // 出力: Meow!

  return 0;
}`,
};

export const CodeTab = ({ className }: { className?: string }) => {
  /** Monaco Editor への Ref */
  const editorRef = React.useRef<Parameters<OnMount>[0] | null>(null);

  /** 既定の言語 */
  const defaultLanguage: SupportedLanguage = 'typescript';

  /** Monaco Editor のコーディング言語 */
  const [language, setLanguage] =
    React.useState<SupportedLanguage>(defaultLanguage);

  /** Monaco Editor の現在のコード内容 (設定不可) */
  const getCodeValue = () => editorRef?.current?.getValue();
  const setCodeValue = (code: string) => editorRef?.current?.setValue(code);

  /** 言語の変更を適用 (ハイライト・デフォルトコードの両方) */
  const changeLanguage = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
    setCodeValue(defaultCodes[newLanguage]);
  };

  /** Alert のレンダリング先 */
  const [alertContainer, setAlertContainer] =
    React.useState<DialogPortalProps['container']>(null);

  /** 言語選択の onChange イベントハンドラ */
  const handleLanguageChange = async (newLanguage: SupportedLanguage) => {
    if (getCodeValue() === defaultCodes[language])
      /** デフォルトから変更されていないので、確認無しで変更 */
      return changeLanguage(newLanguage);

    const result = await Confirm(
      '言語を切り替えますか？',
      'コーディング言語を切り替えると今までの作業内容は失われ、デフォルトの状態に戻ります。',
      'destructive',
      alertContainer
    );

    if (result) changeLanguage(newLanguage);
  };

  const handleCodeReset = async () => {
    if (getCodeValue() === defaultCodes[language])
      /** 変更されていなので、リセットの必要なし */
      return;

    const result = await Confirm(
      'リセットしますか？',
      '今までの作業内容は失われ、デフォルトの状態に戻ります。',
      'destructive',
      alertContainer
    );

    if (result) setCodeValue(defaultCodes[language]);
  };

  return (
    <Tabs defaultValue="code" className={cn('h-full', className)}>
      <TabsList>
        <TabsTrigger value="code">
          <Code size="14" />
          code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="code" className="relative">
        <div className="flex flex-col w-full h-full">
          <div className="px-2 flex h-9">
            {/* 言語選択 */}
            <Select
              defaultValue={defaultLanguage}
              onValueChange={handleLanguageChange}
              value={language}
            >
              <SelectTrigger className="w-auto border-0 shadow-none gap-2 p-0 h-auto mr-auto">
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

            {/* コードのリセット */}
            <Button
              variant="ghost"
              className="w-auto h-auto p-2"
              aria-label="リセット"
              onClick={handleCodeReset}
            >
              <RestartAltIcon size={20} />
            </Button>
          </div>

          {/* Monaco Editor */}
          <CodeEditor
            language={Language[language].id.monaco}
            defaultValue={defaultCodes[defaultLanguage]}
            // CodeEditor の兄弟要素 (親以上の兄弟も含む) の高さが確定していないと、高さ調整がバグる。
            // calc は大丈夫そう。
            height={'calc(100% - 36px)'}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
          />
        </div>
        <div ref={setAlertContainer} />
      </TabsContent>
    </Tabs>
  );
};
