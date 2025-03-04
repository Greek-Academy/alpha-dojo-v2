'use client';

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
import { CheckIcon, TaskAltIcon } from '@/components/ui/icons';
import { Submission } from '@/lib/submissions';
import { useState, useEffect } from 'react';
import { KeyboardArrowDownIcon } from '@/components/ui/icons';
import { ArrowUpwardIcon, ArrowDownwardIcon } from '@/components/ui/icons';

export type Props = {
  data: Submission[];
  className?: string;
};

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

const TableHeaderWithFilters = ({
  onTogglePopup,
  filterValues,
}: {
  onSort: (key: keyof Submission, direction: 'asc' | 'desc') => void;
  onFilter: (key: keyof Submission, values: string[]) => void;
  onTogglePopup: (key: keyof Submission, rect: DOMRect) => void;
  data: Submission[];
  filterValues: Record<
    'status' | 'title' | 'difficulty' | 'authorName',
    string[]
  >;
}) => {
  const isFiltered = (key: 'status' | 'title' | 'difficulty' | 'authorName') =>
    filterValues[key].length > 0;

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-1/9">
          <div className="flex items-center gap-2 relative">
            Status
            <div
              className={cn('cursor-pointer ml-auto', {
                'border-2 border-gray-500': isFiltered('status'),
              })}
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={(e) =>
                onTogglePopup('status', e.currentTarget.getBoundingClientRect())
              }
            >
              <KeyboardArrowDownIcon />
            </div>
          </div>
        </TableHead>

        <TableHead className="w-1/2">
          <div className="flex items-center gap-2 relative">
            Title
            <div
              className={cn('cursor-pointer ml-auto', {
                'border-2 border-gray-500': isFiltered('title'),
              })}
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={(e) =>
                onTogglePopup('title', e.currentTarget.getBoundingClientRect())
              }
            >
              <KeyboardArrowDownIcon />
            </div>
          </div>
        </TableHead>

        <TableHead className="w-1/9">
          <div className="flex items-center gap-2 relative">
            Difficulty
            <div
              className={cn('cursor-pointer ml-auto', {
                'border-2 border-gray-500': isFiltered('difficulty'),
              })}
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={(e) =>
                onTogglePopup(
                  'difficulty',
                  e.currentTarget.getBoundingClientRect()
                )
              }
            >
              <KeyboardArrowDownIcon />
            </div>
          </div>
        </TableHead>

        <TableHead className="w-1/6">
          <div className="flex items-center gap-2 relative">
            Author
            <div
              className={cn('cursor-pointer ml-auto', {
                'border-2 border-gray-500': isFiltered('authorName'),
              })}
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={(e) =>
                onTogglePopup(
                  'authorName',
                  e.currentTarget.getBoundingClientRect()
                )
              }
            >
              <KeyboardArrowDownIcon />
            </div>
          </div>
        </TableHead>

        <TableHead className="w-1/9">
          <div className="flex items-center gap-2 relative">
            Published
            <div
              className="cursor-pointer ml-auto"
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={(e) =>
                onTogglePopup(
                  'published',
                  e.currentTarget.getBoundingClientRect()
                )
              }
            >
              <KeyboardArrowDownIcon />
            </div>
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export const SubmissionTable = ({ data, className }: Props) => {
  const [sortedData, setSortedData] = useState(data);
  const [, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterText, setFilterText] = useState<{ [key: string]: string }>({
    status: '',
    title: '',
    difficulty: '',
    authorName: '',
  });
  const [popupVisible, setPopupVisible] = useState<keyof Submission | null>(
    null
  );
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [filterValues, setFilterValues] = useState<
    Record<'status' | 'title' | 'difficulty' | 'authorName', string[]>
  >({
    status: [],
    title: [],
    difficulty: [],
    authorName: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7; // 1ページあたりの行数

  useEffect(() => {
    filterColumn();
  }, [filterValues, filterText]); // filterValuesとfilterTextの変更時にフィルタを再適用

  const sortColumn = (key: keyof Submission, direction: 'asc' | 'desc') => {
    const sorted = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
  };

  const filterColumn = () => {
    let filtered = [...data];
    Object.keys(filterText).forEach((key) => {
      const filterKey = key as 'status' | 'title' | 'difficulty' | 'authorName';
      const textFilter = filterText[filterKey];
      if (textFilter) {
        filtered = filtered.filter((item) =>
          item[filterKey]
            ?.toString()
            .toLowerCase()
            .includes(textFilter.toLowerCase())
        );
      }
    });

    Object.keys(filterValues).forEach((key) => {
      const keyAs = key as 'status' | 'title' | 'difficulty' | 'authorName';
      const filter = filterValues[keyAs];
      if (filter.length > 0) {
        filtered = filtered.filter((item) =>
          filter.includes(item[keyAs].toString())
        );
      }
    });

    setSortedData(filtered);
  };

  const togglePopup = (key: keyof Submission, rect: DOMRect) => {
    setPopupPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setPopupVisible(popupVisible === key ? null : key);
  };

  const getUniqueValues = (key: keyof Submission) => {
    return Array.from(new Set(data.map((item) => item[key])));
  };

  const handleCheckboxChange = (
    key: 'status' | 'title' | 'difficulty' | 'authorName',
    value: string,
    checked: boolean
  ) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: checked
        ? [...prev[key], value]
        : prev[key].filter((v) => v !== value),
    }));
  };

  const handleSort = (key: keyof Submission, direction: 'asc' | 'desc') => {
    setSortDirection(direction);
    sortColumn(key, direction);
  };

  // 対象の列のフィルタをクリア
  const handleClearFilter = (key: keyof Submission) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: [],
    }));
    setFilterText((prev) => ({
      ...prev,
      [key]: '',
    }));
  };

  const handleFilterTextChange = (key: keyof Submission, value: string) => {
    setFilterText((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ページネーション処理
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const goToFirstPage = () => {
    setCurrentPage(1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <Card className={cn('w-full border-none', className)}>
      <Table>
        <TableHeaderWithFilters
          onSort={handleSort}
          onFilter={filterColumn}
          onTogglePopup={togglePopup}
          data={data}
          filterValues={filterValues} // filterValues を渡す
        />
        <TableBody className="text-base">
          {paginatedData.map((item, index) => {
            const { text: difficultyText, color: difficultyColor } =
              getDifficultyInfo(item.difficulty);
            const handleRowClick = () => {
              window.location.href = `/submissions/${item.id}/edit`;
            };

            return (
              <TableRow
                key={item.id}
                className={
                  index % 2 === 0
                    ? 'bg-white border-none cursor-pointer'
                    : 'bg-gray-100 border-none cursor-pointer'
                }
                onClick={handleRowClick}
              >
                <TableCell>
                  {statusIcon(item.status) || <span>&nbsp;</span>}
                </TableCell>
                <TableCell>{item.title || <span>&nbsp;</span>}</TableCell>
                <TableCell className={difficultyColor}>
                  {difficultyText || <span>&nbsp;</span>}
                </TableCell>
                <TableCell>{item.authorName || <span>&nbsp;</span>}</TableCell>
                <TableCell>
                  {timeAgo(item.published) || <span>&nbsp;</span>}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* ページ移動ボタン */}
      <div className="flex justify-between mt-4">
        <button
          onClick={goToFirstPage}
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          First
        </button>
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Prev
        </button>
        <span className="flex items-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Next
        </button>
        <button
          onClick={goToLastPage}
          disabled={currentPage === totalPages}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Last
        </button>
      </div>

      {popupVisible && (
        <div
          className="absolute bg-white border shadow-lg w-48 p-4 z-10"
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
          }}
        >
          {/* ソート用ボタン */}
          <div>
            <div className="flex flex-col text-left">
              <button
                onClick={() => handleSort(popupVisible, 'asc')}
                className="text-left w-full mb-1 flex items-center gap-1"
              >
                <ArrowUpwardIcon className="text-gray-700" />
                昇順で並び替え
              </button>
              <button
                onClick={() => handleSort(popupVisible, 'desc')}
                className="text-left w-full mb-1 flex items-center gap-1"
              >
                <ArrowDownwardIcon className="text-gray-700" />
                降順で並び替え
              </button>
            </div>
          </div>
          {/* フィルタリング用テキストボックス */}
          <div>
            {(popupVisible === 'title' || popupVisible === 'authorName') && (
              <div>
                <input
                  type="text"
                  onChange={(e) =>
                    handleFilterTextChange(popupVisible, e.target.value)
                  }
                  placeholder="検索"
                  className="mt-2 mb-2 border w-full"
                  value={filterText[popupVisible] || ''}
                />
              </div>
            )}
          </div>

          {/* フィルタリング用チェックボックス */}
          {popupVisible === 'status' && (
            <>
              {getUniqueValues('status').map((status) => (
                <div
                  key={status}
                  className="flex items-center mt-1 mb-1 min-h-[1rem]"
                >
                  <input
                    type="checkbox"
                    checked={filterValues.status.includes(status.toString())}
                    onChange={(e) =>
                      handleCheckboxChange(
                        'status',
                        status.toString(),
                        e.target.checked
                      )
                    }
                    className="mr-2"
                  />
                  {typeof status === 'string'
                    ? status.charAt(0).toUpperCase() + status.slice(1)
                    : status}
                </div>
              ))}
              <button
                className="bg-red-900 text-white mt-2 px-4 py-2 rounded"
                onClick={() => handleClearFilter('status')}
              >
                すべて解除
              </button>
            </>
          )}

          {popupVisible === 'title' && (
            <>
              {getUniqueValues('title').map((title) => (
                <label
                  key={title}
                  className="block flex items-center mt-1 mb-1 min-h-[1rem]"
                >
                  <input
                    type="checkbox"
                    checked={filterValues.title.includes(title.toString())}
                    onChange={(e) =>
                      handleCheckboxChange(
                        'title',
                        title.toString(),
                        e.target.checked
                      )
                    }
                    className="mr-2"
                  />
                  {title}
                </label>
              ))}
              <button
                className="bg-red-900 text-white mt-2 px-4 py-2 rounded"
                onClick={() => handleClearFilter('title')}
              >
                すべて解除
              </button>
            </>
          )}

          {popupVisible === 'difficulty' && (
            <>
              {getUniqueValues('difficulty').map((difficulty) => {
                const { text: difficultyText } = getDifficultyInfo(
                  Number(difficulty)
                );
                return (
                  <label
                    key={difficulty}
                    className="block flex items-center mt-1 mb-1 min-h-[1rem]"
                  >
                    <input
                      type="checkbox"
                      checked={filterValues.difficulty.includes(
                        difficulty.toString()
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          'difficulty',
                          difficulty.toString(),
                          e.target.checked
                        )
                      }
                      className="mr-2"
                    />
                    {difficultyText}
                  </label>
                );
              })}
              <button
                className="bg-red-900 text-white mt-2 px-4 py-2 rounded"
                onClick={() => handleClearFilter('difficulty')}
              >
                すべて解除
              </button>
            </>
          )}

          {popupVisible === 'authorName' && (
            <>
              {getUniqueValues('authorName').map((authorName) => (
                <label
                  key={authorName}
                  className="block flex items-center mt-1 mb-1 min-h-[1rem]"
                >
                  <input
                    type="checkbox"
                    checked={filterValues.authorName.includes(
                      authorName.toString()
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(
                        'authorName',
                        authorName.toString(),
                        e.target.checked
                      )
                    }
                    className="mr-2"
                  />
                  {authorName}
                </label>
              ))}
              <button
                className="bg-red-900 text-white mt-2 px-4 py-2 rounded"
                onClick={() => handleClearFilter('authorName')}
              >
                すべて解除
              </button>
            </>
          )}
        </div>
      )}
    </Card>
  );
};
