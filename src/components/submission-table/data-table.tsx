'use client';

import { cn } from '@/lib/utils';
import { DataTable } from '../ui/data-table';
import { columns, SubmissionTableColumn } from './columns';

export type Props = {
  data: SubmissionTableColumn[];
  className?: string;
};

export const SubmissionTable = ({ data, className }: Props) => {
  return (
    <div className={cn('w-full border-none', className)}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
