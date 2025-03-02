import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AddIcon } from '@icons';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { SubmissionTable } from '@/components/submission-table/data-table';
import { submissions } from '../../lib/submissions';
import { SubmissionTableColumn } from '@/components/submission-table/columns';

export default function Page() {
  const submissionList: SubmissionTableColumn[] = submissions.map((submission) => ({
    id: submission.id,
    title: submission.title,
    status: submission.status,
    difficulty: submission.difficulty,
    // 実際は Strapi に `fetchUserById` で userName を問い合わせる
    authorName: submission.authorName,
    published: new Date(submission.published),
  }));

  return (
    <div className="px-4 py-2.5 flex gap-2.5 w-full">
      <div className="flex-grow flex flex-col items-start gap-4 w-full">
        <Button>
          <AddIcon /> Add New Problem
        </Button>
        <ToggleGroup variant="outline" type="single" className="justify-start">
          <ToggleGroupItem value="2期生" checkWithSelect>
            2期生 (3)
          </ToggleGroupItem>
          <ToggleGroupItem value="Array" checkWithSelect>
            Array (5)
          </ToggleGroupItem>
          <ToggleGroupItem value="HashMap" checkWithSelect>
            HashMap (3)
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="w-full">
          <SubmissionTable data={submissionList} className="w-full" />
          <Link
            href="/submissions/1/edit"
            className="font-bold underline text-blue-600 visited:text-purple-600"
          >
            編集画面へ
          </Link>
        </div>
      </div>
      <div className="w-100 flex flex-col gap-3">
        <div className="border rounded-xl p-5 flex flex-col gap-2.5 bg-accent text-accent-foreground">
          <h1 className="text-xl font-semibold">Notifications</h1>
          通知がここに表示されます
        </div>
        <div className="border rounded-xl p-5 flex flex-col gap-2.5 bg-accent text-accent-foreground">
          <h1 className="text-xl font-semibold">Achievements</h1>
          実績がここに表示されます
        </div>
      </div>
    </div>
  );
}
