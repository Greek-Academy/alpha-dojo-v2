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
    status: "" | "submitted" | "reviewed",   // 提出物の状態（1: submitted, 2: reviewed）
    title: string,    // 提出物のタイトル
    difficulty: number, // 提出物の難易度（1: Easy, 2: Normal, 3: Hard）
    author: string,   // 提出物の作成者
    published: string, // 提出物の公開日
}

export type Props = {
    data: Sample[],
    className?: string
}

// status の数値に対応する文字列を返す（1→ 'submitted', 2→ 'reviewed'）
const mapStatus = (status: number): string => {
    switch (status) {
        case 1:
            return 'submitted';
        case 2:
            return 'reviewed';
        default:
            return '';
    }
};

// difficulty の数値に対応する文字列を返す（1→ 'Easy', 2→ 'Normal', 3→ 'Hard'）
const mapDifficulty = (difficulty: number): string => {
    switch (difficulty) {
        case 1:
            return 'Easy';
        case 2:
            return 'Normal';
        case 3:
            return 'Hard';
        default:
            return '';
    }
};

// difficulty の数値に基づいてテキストの色を返す（1→ 緑, 2→ 黄色, 3→ 赤）
const getDifficultyTextColor = (difficulty: number): string => {
    switch (difficulty) {
      case 1:
        return "text-green-500";  
      case 2:
        return "text-yellow-500"; 
      case 3:
        return "text-red-500";    
      default:
        return "";
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
            return <><CheckIcon className="text-status-submitted"/> submitted</>;
        case "reviewed":
            return <><TaskAltIcon className="text-status-reviewed"/> reviewed</>;    
        default:
            return <></>;        
    }
}

export const SubmissionTable = ({data, className}: Props) => {    
    return (
        <Card className={cn("w-full border-none", className)}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/6">Status</TableHead>
                        <TableHead className="w-2/3">Title</TableHead>
                        <TableHead className="w-1/12">Difficulty</TableHead>
                        <TableHead className="w-1/12">Author</TableHead>
                        <TableHead className="w-1/12">Published</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                       <TableRow key={index} className={index % 2 === 0 ? "bg-white border-none" : "bg-gray-100 border-none"}>
                            <TableCell>{statusIcon(item.status)}</TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell className={getDifficultyTextColor(item.difficulty)}>{mapDifficulty(item.difficulty)}</TableCell>
                            <TableCell>{item.author}</TableCell>
                            <TableCell>{timeAgo(item.published)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
  