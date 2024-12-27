import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { MonitorCheck, SquareCheckBig, Text } from 'lucide-react';

export const TestTab = ({ className }: { className?: string }) => {
  return (
    <Tabs
      defaultValue="testcase"
      className={cn(
        'h-full flex flex-col [&:not(:first-child)]:*:flex-grow',
        className
      )} /** flex 以降は DOJO-19 でデザインを修正予定なので、今後不要 */
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="testcase" className="w-full">
          <SquareCheckBig size="14" />
          Test Case
        </TabsTrigger>
        <TabsTrigger value="testresult" className="w-full">
          <MonitorCheck size="14" />
          Test Result
        </TabsTrigger>
        <TabsTrigger value="lintresult" className="w-full">
          <Text size="14" /> Lint Result
        </TabsTrigger>
      </TabsList>
      <TabsContent value="testcase" className="bg-white">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>テストケースです</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            ここにテストケースが入ります。
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="testresult" className="bg-white">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>テスト結果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            ここにはテスト結果が並びます。
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="lintresult" className="bg-white">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Solutions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            Linterの結果が出てきます。
          </CardContent>
          <CardFooter>Footer...</CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
