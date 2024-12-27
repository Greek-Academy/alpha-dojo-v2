'use client';
import { ProbremTab } from './components/problem-tab';
import { TestTab } from './components/test-tab';
import { CodeTab } from './components/code-tab';
import Split from 'react-split';

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

export default function Home() {
  return (
    <Split
      direction="horizontal"
      minSize={200}
      className="flex w-full h-full px-2.5 pb-2.5 min-w-100 min-h-100"
    >
      <ProbremTab className="overflow-auto" />
      <Split
        direction="vertical"
        minSize={200}
        className="flex w-full h-full flex-col"
      >
        <CodeTab className="overflow-auto" />
        <TestTab className="overflow-auto" />
      </Split>
    </Split>
  );
}
