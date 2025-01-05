import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Code } from 'lucide-react';

export const CodeTab = ({ className }: { className?: string }) => {
  return (
    <Tabs
      defaultValue="code"
      className={cn(
        'h-full',
        className
      )}
    >
      <TabsList>
        <TabsTrigger value="code">
          <Code size="14" />
          code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="code">
        <Card className="border-0 shadow-none">
          <CardContent className="space-y-2">
            ここにコードを書きます。。
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
