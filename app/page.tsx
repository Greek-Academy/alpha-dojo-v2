import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AddIcon } from './components/icons/material-symbols';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Sample, SubmissionTable } from './components/submission-table';

export default function Home() {
  const data: Sample[] = [
    { status: "submitted", title: "sample", difficulty: 2, author: "Satou", published: "2025-01-05T15:00:00" }, // publishedはISO8601形式で仮設定
    { status: "", title: "サンプル", difficulty: 1, author: "Satou", published: "2025-01-05T10:00:00" },
    { status: "reviewed", title: "sample", difficulty: 2, author: "Suzuki", published: "2025-01-04T10:00:00" },
    { status: "reviewed", title: "sample", difficulty: 1, author: "Suzuki", published: "2025-01-04T10:00:00" },
    { status: "reviewed", title: "sample", difficulty: 3, author: "Satou", published: "2024-12-31T10:00:00" },
    { status: "submitted", title: "sample", difficulty: 3, author: "Takahashi", published: "2024-12-31T10:00:00" },
    { status: "submitted", title: "sample", difficulty: 1, author: "Takahashi", published: "2024-11-04T10:00:00" },
    { status: "submitted", title: "sample", difficulty: 1, author: "Tanaka", published: "2024-11-04T10:00:00" },
    { status: "submitted", title: "sample", difficulty: 2, author: "Itou", published: "2024-10-04T10:00:00" },
  ]
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
        <div className='w-full'>
          <SubmissionTable data={data} className='w-full' />
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
          <h1 className="text-xl">Notifications</h1>
          通知がここに表示されます
        </div>
        <div className="border rounded-xl p-5 flex flex-col gap-2.5 bg-accent text-accent-foreground">
          <h1 className="text-xl">Achievements</h1>
          実績がここに表示されます
        </div>
      </div>
    </div>
  );
}
