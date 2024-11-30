import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code } from 'lucide-react';

export const CodeTab = () => {
  return (
    <Card className="w-full h-full">
      <Tabs defaultValue="code" className="w-full h-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="code" className="w-full">
            <Code size="14" />
            code
          </TabsTrigger>
        </TabsList>
        <div className="h-full">
          <TabsContent value="code" className="h-full bg-white">
            <Card className="h-full">
              <CardContent className="space-y-2">
                ここにコードを書きます。。
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};
