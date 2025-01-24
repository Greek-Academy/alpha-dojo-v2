'use client';
import { ProbremTab } from '@/app/components/problem-tab';
import { TestTab } from '@/app/components/test-tab';
import { CodeTab } from '@/app/components/code-tab';
import Split, { SplitProps } from 'react-split';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

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
  const splitVariants = cva('flex w-full h-full', {
    variants: {
      direction: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
    },
    defaultVariants: {
      direction: 'horizontal',
    },
  });

  const gutterVariants = cva('flex items-center justify-center group', {
    variants: {
      direction: {
        horizontal: 'hover:cursor-col-resize',
        vertical: 'hover:cursor-row-resize',
      },
    },
    defaultVariants: {
      direction: 'horizontal',
    },
  });

  const gutterChildVariants = cva(
    'bg-border-variant opacity-0 group-hover:opacity-100 transition-[opacity,width,height]',
    {
      variants: {
        direction: {
          horizontal: 'w-1 h-full group-active:w-0.5',
          vertical: 'h-1 w-full group-active:h-0.5',
        },
      },
      defaultVariants: {
        direction: 'horizontal',
      },
    }
  );

  const splitProps = (
    direction: 'horizontal' | 'vertical' | undefined,
    className?: string
  ): SplitProps => {
    return {
      direction,
      minSize: 200,
      className: cn(splitVariants({ direction, className })),
      gutterSize: 10,
      gutter: () => {
        const gutterElement = document.createElement('div');
        gutterElement.className = gutterVariants({ direction });

        // 子要素 (区切り線の可視化・アニメーション)
        const gutterChild = document.createElement('div');
        gutterChild.className = gutterChildVariants({ direction });
        gutterElement.appendChild(gutterChild);

        return gutterElement;
      },
    };
  };

  return (
    <Split {...splitProps('horizontal', 'px-2.5 pb-2.5 min-w-100 min-h-100')}>
      <ProbremTab />
      <Split {...splitProps('vertical')}>
        <CodeTab />
        <TestTab />
      </Split>
    </Split>
  );
}
