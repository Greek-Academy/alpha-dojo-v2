import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AddIcon } from "./components/icons/material-symbols";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Home() {
  return (
    <div className="px-4 py-2.5 flex gap-2.5">
        <div className="flex-grow flex flex-col items-start gap-4">
            <Button>
                <AddIcon/> Add New Problem
            </Button>
            <ToggleGroup variant="outline" type="single" className="justify-start">
                <ToggleGroupItem value="2期生"   checkWithSelect>2期生 (3)</ToggleGroupItem>
                <ToggleGroupItem value="Array"   checkWithSelect>Array (5)</ToggleGroupItem>
                <ToggleGroupItem value="HashMap" checkWithSelect>HashMap (3)</ToggleGroupItem>
            </ToggleGroup>
            <div>
                <h1 className="text-xl">課題一覧がここに表示されます</h1>
                <Link href="/submissions/1/edit">編集画面へ</Link>
            </div>
        </div>
        <div className="w-100">
            <div>
                <h1 className="text-xl">Notifications</h1>
            </div>
            <div>
                <h1 className="text-xl">Achievements</h1>
            </div>
        </div>
    </div>
  );
}
