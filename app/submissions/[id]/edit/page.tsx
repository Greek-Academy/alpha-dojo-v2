'use client';
import { ProbremTab } from '@/app/components/problem-tab';
import { TestTab } from '@/app/components/test-tab';
import { CodeTab } from '@/app/components/code-tab';

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

export default function Page() {
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-2">
      <ProbremTab />
      <CodeTab />
      <TestTab />
    </div>
  );
}
