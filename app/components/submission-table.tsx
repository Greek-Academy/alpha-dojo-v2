import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { CheckIcon, TaskAltIcon } from './icons/material-symbols';
import { Submission } from '../../lib/submissions';
import Link from 'next/link';

export type Props = {
  data: Submission[]; // 提出物データ
  className?: string;
};

// difficulty の数値に対応する色付きテキストを返す（1→ 'Easy'(緑), 2→ 'Normal'(黄), 3→ 'Hard'(赤)）
const getDifficultyInfo = (
  difficulty: number
): { text: string; color: string } => {
  switch (difficulty) {
    case 1:
      return { text: 'Easy', color: 'text-difficulty-easy' };
    case 2:
      return { text: 'Normal', color: 'text-difficulty-medium' };
    case 3:
      return { text: 'Hard', color: 'text-difficulty-hard' };
    default:
      return { text: '', color: '' };
  }
};

// publishedの表示は'...ago'
const timeAgo = (dateString: string): string => {
  const published = new Date(dateString);
  if (isNaN(published.getTime())) {
    return '';
  }
  const timeAgoString = formatDistanceToNow(published, { addSuffix: true });
  return timeAgoString.replace(/^in /, '').replace(/^about /, '');
};

const statusIcon = (status: string): JSX.Element => {
  switch (status) {
    case 'submitted':
      return (
        <span className="flex items-center">
          <CheckIcon className="text-status-submitted" />
          <span className="ml-2">Submitted</span>
        </span>
      );
    case 'reviewed':
      return (
        <span className="flex items-center">
          <TaskAltIcon className="text-status-reviewed" />
          <span className="ml-2">Reviewed</span>
        </span>
      );
    default:
      return <></>;
  }
};

export const SubmissionTable = ({ data, className }: Props) => {
  return (
    <Card className={cn('w-full border-none', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/9">Status</TableHead>
            <TableHead className="w-1/2">Title</TableHead>
            <TableHead className="w-1/9">Difficulty</TableHead>
            <TableHead className="w-1/6">Author</TableHead>
            <TableHead className="w-1/9">Published</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-base">
          {data.map((item, index) => {
            const { text: difficultyText, color: difficultyColor } =
              getDifficultyInfo(item.difficulty);

            return (
              <TableRow
                key={item.id}
                className={
                  index % 2 === 0
                    ? 'bg-white border-none cursor-pointer'
                    : 'bg-gray-100 border-none cursor-pointer'
                }
              >
                <TableCell>
                  <Link href={`/submission/${item.id}/edit`}>
                    {statusIcon(item.status)}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/submission/${item.id}/edit`}>{item.title}</Link>
                </TableCell>
                <TableCell className={difficultyColor}>
                  <Link href={`/submission/${item.id}/edit`}>
                    {difficultyText}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/submission/${item.id}/edit`}>
                    {item.authorName}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/submission/${item.id}/edit`}>
                    {timeAgo(item.published)}
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};
