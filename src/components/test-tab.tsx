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
    <Tabs defaultValue='testcase' className={cn('h-full', className)}>
      <TabsList>
        <TabsTrigger value='testcase'>
          <SquareCheckBig size='14' />
          Test Case
        </TabsTrigger>
        <TabsTrigger value='testresult'>
          <MonitorCheck size='14' />
          Test Result
        </TabsTrigger>
        <TabsTrigger value='lintresult'>
          <Text size='14' /> Lint Result
        </TabsTrigger>
      </TabsList>
      <TabsContent value='testcase'>
        <Card className='border-0 shadow-none'>
          <CardHeader>
            <CardTitle>テストケースです</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            ここにテストケースが入ります。
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='testresult'>
        <Card className='border-0 shadow-none'>
          <CardHeader>
            <CardTitle>テスト結果</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            ここにはテスト結果が並びます。
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='lintresult'>
        <Card className='border-0 shadow-none'>
          <CardHeader>
            <CardTitle>Solutions</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            Linterの結果が出てきます。
          </CardContent>
          <CardFooter>Footer...</CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
