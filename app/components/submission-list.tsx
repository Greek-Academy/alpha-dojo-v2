import {
  Table,
  TableRow,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { cva } from 'class-variance-authority';

export interface Submission {
  status: 'failed' | 'in-review' | 'reviewed' | 'finished';
  // 対応言語のリストはどこかにまとめておくべき？
  language: 'typescript' | 'python';
  runtime_ms: number;
  date: Date;
}

export interface SubmissionListProps {
  submissions: Submission[];
  className?: string;
}

const mapStatus = (status: Submission['status']) => {
  let statusText: string;
  switch (status) {
    case 'failed':
      statusText = 'Failed';
      break;

    case 'in-review':
      statusText = 'In review';
      break;

    case 'reviewed':
      statusText = 'Reviewed';
      break;

    case 'finished':
      statusText = 'Finished';
      break;

    default:
      statusText = 'Unknown';
  }

  const statusVariants = cva('', {
    variants: {
      status: {
        failed: 'text-red-700',
        'in-review': 'text-yellow-800',
        reviewed: 'text-blue-600',
        finished: 'text-green-700',
      },
    },
  });

  return <span className={statusVariants({ status })}>{statusText}</span>;
};

const mapLanguage = (language: Submission['language']) => {
  let languageText: string;
  switch (language) {
    case 'typescript':
      languageText = 'TypeScript';
      break;

    case 'python':
      languageText = 'Python';
      break;

    default:
      languageText = 'Unknown';
  }

  return languageText;
};

export const SubmissionList = ({
  submissions,
  className,
}: SubmissionListProps) => {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow className="*:h-auto *:py-2.5">
          <TableHead>Status</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Runtime</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission, index) => {
          return (
            <TableRow key={index} className="border-0 *:py-3">
              <TableCell>{mapStatus(submission.status)}</TableCell>
              <TableCell className="text-stone-500">
                {mapLanguage(submission.language)}
              </TableCell>
              <TableCell>{`${submission.runtime_ms} ms`}</TableCell>
              <TableCell>{submission.date.toLocaleDateString()}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
