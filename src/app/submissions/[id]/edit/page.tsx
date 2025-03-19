import { ProbremTab } from '@/components/problem-tab';
import { TestTab } from '@/components/test-tab';
import { CodeTab } from '@/components/code-tab';
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from '@/components/ui/resizable';

class Person {
  name: string = '';
  age: number = 0;
  addr: string = '';

  constructor(name: string, age: number, addr: string) {
    this.name = name;
    this.age = age;
    this.addr = addr;
  }
}

const samplePersons: Person[] = [];
samplePersons.push(new Person('aさん', 14, 'kobe'));
samplePersons.push(new Person('bさん', 15, 'Kyoto'));
samplePersons.push(new Person('cさん', 25, 'Nagoya'));
samplePersons.push(new Person('dさん', 32, 'Osaka'));

export default async function Home({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  return (
    <ResizablePanelGroup
      autoSaveId="submissions-1"
      direction="horizontal"
      className="px-2.5 pb-2.5 min-w-100 min-h-100"
    >
      <ResizablePanel defaultSize={30} className="min-w-40">
        <ProbremTab problemId={(await params).id} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70} className="min-w-60">
        <ResizablePanelGroup autoSaveId="submissions-2" direction="vertical">
          <ResizablePanel defaultSize={50} className="min-h-60">
            <CodeTab />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50} className="min-h-40">
            <TestTab />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
