import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClipboardPenLine, FileText, FlaskConical } from 'lucide-react';
import { Lightbulb2 } from './icons/material-symbols';

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
              <CardHeader>
                <CardTitle>最大の利益を持つ期間を探せ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                あなたはとある店舗のマネージャーです。・・・・・問題文が続きます。
              </CardContent>
              <CardFooter>
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="hint-1">
                    <AccordionTrigger>
                      <Lightbulb2 />
                      Hint 1
                    </AccordionTrigger>
                    <AccordionContent>
                      ヒント その1<br />
                      ヒント その1<br />
                      ヒント その1<br />
                      ヒント その1<br />
                      ヒント その1
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="hint-2">
                    <AccordionTrigger>
                      <Lightbulb2 />
                      Hint 2
                    </AccordionTrigger>
                    <AccordionContent>
                      ヒント その2<br />
                      ヒント その2<br />
                      ヒント その2<br />
                      ヒント その2<br />
                      ヒント その2
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardFooter>
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
