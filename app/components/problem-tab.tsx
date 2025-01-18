import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ClipboardPenLine, FileText, FlaskConical } from 'lucide-react';
import { Submission, SubmissionList } from './submission-list';

export const sampleSubmissions: Submission[] = [
  {
    status: 'failed',
    language: 'typescript',
    runtime_ms: 50,
    date: new Date('2024-10-27'),
  },
  {
    status: 'in-review',
    language: 'typescript',
    runtime_ms: 50,
    date: new Date('2024-10-27'),
  },
  {
    status: 'reviewed',
    language: 'python',
    runtime_ms: 50,
    date: new Date('2024-10-27'),
  },
  {
    status: 'finished',
    language: 'typescript',
    runtime_ms: 50,
    date: new Date('2024-10-27'),
  },
];

export const ProbremTab = ({ className }: { className?: string }) => {
  return (
    <Tabs defaultValue="description" className={cn('h-full', className)}>
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
        <Card className="border-0 shadow-none">
          <CardHeader className="items-start">
            <CardTitle>最大の利益を持つ期間を探せ</CardTitle>
            <Chip className="text-green-800">Easy</Chip>
            <Chip className="text-yellow-800">Medium</Chip>
            <Chip className="text-red-800">Hard</Chip>
            <Chip>default</Chip>
          </CardHeader>
          <CardContent className="space-y-2">
            あなたはとある店舗のマネージャーです。・・・・・問題文が続きます。
          </CardContent>
          <CardFooter>Footer...</CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="submissions">
        <SubmissionList submissions={sampleSubmissions} />
      </TabsContent>
      <TabsContent value="solutions">
        <Card className="border-0 shadow-none">
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
