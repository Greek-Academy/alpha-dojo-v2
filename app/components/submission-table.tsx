import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';
import { CheckIcon, TaskAltIcon } from "./icons/material-symbols";

export type Sample = {
    status: "" | "submitted" | "reviewed",   // 提出物の状態
    title: string,    // 提出物のタイトル
    difficulty: number, // 提出物の難易度（1: Easy, 2: Normal, 3: Hard）
    author: string,   // 提出物の作成者
    published: string, // 提出物の公開日
}

export type Props = {
    data: Sample[],
    className?: string
}

// difficulty の数値に対応する色付きテキストを返す（1→ 'Easy'(緑), 2→ 'Normal'(黄), 3→ 'Hard'(赤)）
const getDifficultyInfo = (difficulty: number): { text: string, color: string } => {
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

// 現在との日時差を「...ago」で返す
const timeAgo = (dateString: string): string => {
    const published = new Date(dateString);   
    const timeAgoString = formatDistanceToNow(published, { addSuffix: true });
    // 文頭の in, about を削除
    return timeAgoString.replace(/^in /, '').replace(/^about /, '');
};

const statusIcon = (status: string): JSX.Element => {
    switch (status) {
        case "submitted":
            return (
                <span className="flex items-center">
                    <CheckIcon className="text-status-submitted" />
                    <span className="ml-2">Submitted</span>
                </span>
            );
        case "reviewed":
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

export const SubmissionTable = ({data, className}: Props) => {    
    return (
        <Card className={cn("w-full border-none", className)}>
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
                        const { text: difficultyText, color: difficultyColor } = getDifficultyInfo(item.difficulty);
                        return (
                            <TableRow key={index} className={index % 2 === 0 ? "bg-white border-none":"bg-gray-100 border-none"}>
                                <TableCell>{statusIcon(item.status)}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell className={difficultyColor}>{difficultyText}</TableCell>
                                <TableCell>{item.author}</TableCell>
                                <TableCell>{timeAgo(item.published)}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Card>
    );
};
  