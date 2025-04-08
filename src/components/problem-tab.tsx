import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
import { Lightbulb2, ManufacturingIcon } from '@icons';
import { Submission, SubmissionList } from './submission-list';
import { Difficulty } from '@/domain/entities/problem';
import { ComponentProps } from 'react';
import Markdown from 'react-markdown';
import { cva } from 'class-variance-authority';
import { ApiProblemRepository } from '@/infrastructure/problem/problem-repository';
import { ProblemUseCase } from '@/usecases/problem-usecase';
import { getAuthToken } from '@/lib/get-auth-token';
import { notFound } from 'next/navigation';
import { ApiHintRepository } from '@/infrastructure/hint/hint-repository';
import { HintUseCase, SortedHints } from '@/usecases/hint-usecase';

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

export const ProbremTab = async ({
  problemId,
  className,
  ...props
}: ComponentProps<typeof Tabs> & {
  problemId: number;
  className?: string;
}) => {
  const authToken = await getAuthToken();

  const problemRepository = new ApiProblemRepository(authToken);
  const problemUseCase = new ProblemUseCase(problemRepository);
  const problemResponse = await problemUseCase.fetchProblemById(
    problemId.toString()
  );

  if (problemResponse.isErr()) {
    const error = problemResponse.error;
    switch (error.errorCode) {
      case 'not-found':
        notFound();
        break; // 到達不可能だが、ESLint のエラーを回避するために必要
      default:
        throw error;
    }
  }

  const problem = problemResponse.value;

  const hintRepository = new ApiHintRepository(authToken);
  const hintUseCase = new HintUseCase(hintRepository);
  const hintResponse = await hintUseCase.fetchHints({
    problemId: problemId.toString(),
  });

  const hints: SortedHints = [];
  if (hintResponse.isOk()) hints.push(...hintResponse.value);

  const DifficultyChip = (props: { difficulty: Difficulty }) => {
    const difficultyChipVariants = cva('', {
      variants: {
        difficulty: {
          Easy: 'text-difficulty-easy',
          Medium: 'text-difficulty-medium',
          Hard: 'text-difficulty-hard',
        },
      },
    });

    return (
      <Chip
        className={difficultyChipVariants({ difficulty: props.difficulty })}
      >
        {props.difficulty}
      </Chip>
    );
  };

  return (
    <Tabs
      defaultValue='description'
      className={cn('h-full', className)}
      {...props}
    >
      <TabsList>
        <TabsTrigger value='description'>
          <FileText size='14' />
          Description
        </TabsTrigger>
        <TabsTrigger value='submissions'>
          <ClipboardPenLine size='14' />
          Submissions
        </TabsTrigger>
        <TabsTrigger value='solutions'>
          <FlaskConical size='14' /> Solutions
        </TabsTrigger>
      </TabsList>
      <TabsContent value='description'>
        <Card className='border-0 shadow-none'>
          <CardHeader className='flex flex-col items-start'>
            <CardTitle className='mb-2.5'>{problem.title}</CardTitle>
            <DifficultyChip difficulty={problem.difficulty} />
          </CardHeader>
          <CardContent className='space-y-2'>
            <Markdown>{problem.description}</Markdown>
          </CardContent>
          <CardFooter>
            <Accordion type='multiple' className='w-full'>
              <AccordionItem value='constraints'>
                <AccordionTrigger>
                  <ManufacturingIcon />
                  Constraints
                </AccordionTrigger>
                <AccordionContent>
                  <Markdown>{problem.constraintsDescription}</Markdown>
                </AccordionContent>
              </AccordionItem>
              {hints.map((hint, index) => (
                <AccordionItem
                  value={`hint-${index + 1}`}
                  key={`hint-${index + 1}`}
                >
                  <AccordionTrigger>
                    <Lightbulb2 />
                    Hint {index + 1}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Markdown>{hint.description}</Markdown>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value='submissions'>
        <SubmissionList submissions={sampleSubmissions} />
      </TabsContent>
      <TabsContent value='solutions'>
        <Card className='border-0 shadow-none'>
          <CardHeader>
            <CardTitle>Solutions</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            正解者の答えが出てきます。
          </CardContent>
          <CardFooter>Footer...</CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
