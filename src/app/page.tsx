import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AddIcon } from '@/components/ui/icons';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { SubmissionTable } from '../components/submission-table';
import { Notifications } from '../components/notifications';  
import { Achievements } from '../components/achievements';
import { users } from '../../lib/users';  
import { submissions } from '../../lib/submissions';  

export default function Page() {
  return (
    <div className="px-4 py-2.5 flex gap-2.5 w-full">
      <div className="flex-grow flex flex-col items-start gap-4">
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
          <SubmissionTable data={submissions} className="w-full" />
          <Link
            href="/submissions/1/edit"
            className="font-bold underline text-blue-600 visited:text-purple-600"
          >
            編集画面へ
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="border rounded-xl p-5 flex flex-col gap-2.5 bg-destructive-foreground text-accent-foreground">
          <h1 className="font-semibold text-xl">Notifications</h1>
          <Notifications submissions={submissions} users={users} />
        </div>
        <div className="border rounded-xl p-5 flex flex-col gap-2.5 bg-accent text-accent-foreground">
          <h1 className="font-semibold text-xl">Achievements</h1>
          <Achievements data={submissions} />
        </div>
      </div>
    </div>
  );
}
