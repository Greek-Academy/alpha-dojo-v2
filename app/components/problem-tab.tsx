import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ClipboardPenLine, FileText, FlaskConical } from 'lucide-react';

export const ProbremTab = ({ className }: { className?: string }) => {
  return (
    <Tabs
      defaultValue="description"
      className={cn(
        'h-full',
        className
      )}
    >
      <TabsList>
        <TabsTrigger value="description">
          <FileText size="14" />
          Description
        </TabsTrigger>
        <TabsTrigger value="submissions">
          <ClipboardPenLine size="14" />
          Submissions
        </TabsTrigger>
        <TabsTrigger value="solutions">
          <FlaskConical size="14" /> Solutions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <Card className='border-0 shadow-none'>
          <CardHeader>
            <CardTitle>最大の利益を持つ期間を探せ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            あなたはとある店舗のマネージャーです。・・・・・問題文が続きます。
          </CardContent>
          <CardFooter>Footer...</CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="submissions">
        <Card className='border-0 shadow-none'>
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">回答が並びます。</CardContent>
          <CardFooter>Footer...</CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="solutions">
        <Card className='border-0 shadow-none'>
          <CardHeader>
            <CardTitle>Solutions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            正解者の答えが出てきます。
          </CardContent>
          <CardFooter>Footer...</CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
