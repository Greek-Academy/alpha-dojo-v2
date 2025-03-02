'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { CheckIcon, TaskAltIcon } from '@icons';

/** `submissionTable` のデータ構造
 * 
 * Sort されることを想定。
 * 例えば、`authorName` を `authorId` にしてしまうと、名前順ではなく ID 順に sort される
 */
export interface SubmissionTableColumn {
  id: number; // 提出物のID
  title: string; // 提出物のタイトル
  status: '' | 'submitted' | 'reviewed'; // 提出物の状態
  difficulty: 1 | 2 | 3; // 提出物の難易度（1: Easy, 2: Normal, 3: Hard）
  authorName: string; // 作成者のID
  published: Date; // 公開日
}

/** TanStack における最高の型安全を提供
 * @see {@link https://tanstack.com/table/v8/docs/guide/column-defs#column-helpers | Column Helpers}
 */
const columnHelper = createColumnHelper<SubmissionTableColumn>();

/** 表におけるデータの表示方法を定義
 * @see {@link https://ui.shadcn.com/docs/components/data-table#filtering:~:text=a%20basic%20table.-,Column%20Definitions,-First%2C%20we%27ll%20define | shadcn Data Table}
 * @see {@link https://tanstack.com/table/latest/docs/api/core/column-def | ColumnDef APIs}
 */
export const columns = [
  columnHelper.accessor('status', {
    header: (props) => (
      // 並び替え可能なヘッダー
      props.table && <DataTableColumnHeader column={props.column} title="Status" />
    ),
    cell: (props) => {
      const status = props.getValue();
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
      }
    },
    sortingFn: (a, b) => {
      const statusToOrder = (status: SubmissionTableColumn['status']) => {
        switch (status) {
          case 'submitted':
            return 1;
          case 'reviewed':
            return 2;
          default:
            // 最大。優先度が低いため
            return 99;
        }
      };

      const aOrder = statusToOrder(a.getValue('status'));
      const bOrder = statusToOrder(b.getValue('status'));
      return aOrder > bOrder ? 1 : aOrder < bOrder ? -1 : 0;
    }
  }),

  columnHelper.accessor('title', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  }),

  columnHelper.accessor('difficulty', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difficulty" />
    ),
    // `difficulty` => 文字列に変換
    cell: (props) => {
      const difficulty = props.getValue();
      switch (difficulty) {
        case 1:
          return <span className="text-difficulty-easy">Easy</span>;
        case 2:
          return <span className="text-difficulty-medium">Medium</span>;
        case 3:
          return <span className="text-difficulty-hard">Hard</span>;
      }
    },
  }),

  columnHelper.accessor('authorName', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
  }),

  columnHelper.accessor('published', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published" />
    ),
    // `Date` => x日前 に変換
    cell: (props) => {
      const published = props.getValue();
      const timeAgoString = formatDistanceToNow(published, {
        addSuffix: true,
      });
      return timeAgoString.replace(/^in /, '').replace(/^about /, '');
    },
  }),
];
