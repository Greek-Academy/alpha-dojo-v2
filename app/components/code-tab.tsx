import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Code } from 'lucide-react';

export const CodeTab = ({ className }: { className?: string }) => {
  return (
    <Tabs
      defaultValue="code"
      className={cn(
        'h-full flex flex-col [&:not(:first-child)]:*:flex-grow',
        className
      )} /** flex 以降は DOJO-19 でデザインを修正予定なので、今後不要 */
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="code" className="w-full">
          <Code size="14" />
          code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="code">
        <Card className="h-full">
          <CardContent className="space-y-2">
            ここにコードを書きます。。
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
