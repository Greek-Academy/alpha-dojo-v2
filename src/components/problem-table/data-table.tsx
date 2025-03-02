'use client';

import { cn } from '@/lib/utils';
import { DataTable } from '../ui/data-table';
import { columns, ProblemTableColumn } from './columns';

export type Props = {
  data: ProblemTableColumn[];
  className?: string;
};

export const ProblemTable = ({ data, className }: Props) => {
  return (
    <div className={cn('w-full border-none', className)}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
