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
  const defaultLanguage: SupportedLanguage = 'typescript';

  const [language, setLanguage] =
    React.useState<SupportedLanguage>(defaultLanguage);

  const [codeValue, setCodeValue] = React.useState<string>(
    defaultCodes[defaultLanguage]
  );

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
                setCodeValue(defaultCodes[value as SupportedLanguage]);
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

          <CodeEditor
            language={Language[language].id.monaco}
            defaultValue={defaultCodes[defaultLanguage]}
            value={codeValue}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};
