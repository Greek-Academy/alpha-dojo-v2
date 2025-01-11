import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClipboardPenLine, FileText, FlaskConical } from 'lucide-react';

export const ProbremTab = () => {
  return (
    <Card className="row-span-2 w-full h-full">
      <Tabs defaultValue="description" className="w-full h-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description" className="w-full">
            <FileText size="14" />
            Description
          </TabsTrigger>
          <TabsTrigger value="submissions" className="w-full">
            <ClipboardPenLine size="14" />
            Submissions
          </TabsTrigger>
          <TabsTrigger value="solutions" className="w-full">
            <FlaskConical size="14" /> Solutions
          </TabsTrigger>
        </TabsList>
        <div className="h-full">
          <TabsContent value="description" className="h-full">
            <Card className="h-full bg-gray-100">
              <CardHeader className='items-start'>
                <CardTitle>最大の利益を持つ期間を探せ</CardTitle>
                <Chip>Easy</Chip>
                <Chip>Medium</Chip>
                <Chip>Hard</Chip>
                <Chip>default</Chip>
              </CardHeader>
              <CardContent className="space-y-2">
                あなたはとある店舗のマネージャーです。・・・・・問題文が続きます。
              </CardContent>
              <CardFooter>Footer...</CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="submissions" className="h-full bg-white">
            <Card className="h-full bg-gray-100">
              <CardHeader>
                <CardTitle>Submissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">回答が並びます。</CardContent>
              <CardFooter>Footer...</CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="solutions" className="h-full bg-white">
            <Card className="h-full bg-gray-100">
              <CardHeader>
                <CardTitle>Solutions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                正解者の答えが出てきます。
              </CardContent>
              <CardFooter>Footer...</CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};
