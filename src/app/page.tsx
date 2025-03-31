import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AddIcon, CheckIcon } from '@/components/ui/icons';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ProblemTable } from '@/components/problem-table/data-table';
import { Achievements } from '@/components/achievements';
import { Notifications } from '@/components/notifications';
import { users } from '@/lib/users';
import { submissions } from '@/lib/submissions';
import { ProblemTableColumn } from '@/components/problem-table/columns';

export default function Page() {
  const submissionList: ProblemTableColumn[] = submissions.map(
    (submission) => ({
      id: submission.id,
      title: submission.title,
      status: submission.status,
      difficulty: submission.difficulty,
      // 実際は Strapi に `fetchUserById` で userName を問い合わせる
      authorName: submission.authorName,
      published: new Date(submission.published),
    })
  );

  return (
    <div className="px-4 py-2.5 flex gap-2.5 w-full justify-center">
      <div className="w-full flex flex-wrap gap-5">
        <div className="flex flex-col flex-auto items-start gap-4">
          <Button>
            <AddIcon /> Add New Problem
          </Button>
          <ToggleGroup
            variant="outline"
            type="single"
            className="justify-start"
          >
            <ToggleGroupItem value="2期生" className="group">
              <CheckIcon
                className="!hidden group-data-[state=on]:!inline-block"
                size={18}
              />{' '}
              2期生 (3)
            </ToggleGroupItem>
            <ToggleGroupItem value="Array" className="group">
              <CheckIcon
                className="!hidden group-data-[state=on]:!inline-block"
                size={18}
              />
              Array (5)
            </ToggleGroupItem>
            <ToggleGroupItem value="HashMap" className="group">
              <CheckIcon
                className="!hidden group-data-[state=on]:!inline-block"
                size={18}
              />
              HashMap (3)
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="w-full">
            <ProblemTable data={submissionList} />
            <Link
              href="/submissions/1/edit"
              className="font-bold underline text-blue-600 visited:text-purple-600"
            >
              編集画面へ
            </Link>
          </div>
        </div>

        {/* 右側のコンテンツ */}
        <div className="flex flex-col gap-3 w-[25rem]">
          <div className="border rounded-xl p-5 flex flex-col gap-2.5 bg-sidebar-primary-foreground text-accent-foreground">
            <h1 className="text-xl font-semibold">Notifications</h1>
            <Notifications users={users} submissions={submissions} />
          </div>
          <div className="border rounded-xl p-5 flex flex-col gap-2.5 bg-sidebar-primary-foreground text-accent-foreground">
            <h1 className="text-xl font-semibold">Achievements</h1>
            <Achievements data={submissions} />
          </div>
        </div>
      </div>
    </div>
  );
}
