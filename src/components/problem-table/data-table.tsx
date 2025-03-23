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
    <div
      className={cn(
        'w-full border-none',
        // HACK: 行全体にリンクを貼るために必要
        '[&_tr]:relative [&_th]:first:px-0 [&_td]:first:px-0',
        className
      )}
    >
      <DataTable columns={columns} data={data} />
    </div>
  );
};
