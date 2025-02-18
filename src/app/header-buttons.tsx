'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Play, Upload } from 'lucide-react';

export type HeaderButtonsProps = React.ButtonHTMLAttributes<HTMLDivElement>;

export function HeaderButtons(props: HeaderButtonsProps) {
  const pathname = usePathname();
  const buttonEnabledPages = /^\/submissions\/\w+\/edit$/;

  function runButtonHandler() {
    alert('WIP');
  }

  function submitButtonHandler() {
    alert('WIP');
  }

  return (
    <div className={cn('flex gap-2', props.className)} {...props}>
      {buttonEnabledPages.test(pathname) && (
        <>
          <Button onClick={runButtonHandler} variant="outline">
            <Play /> Run
          </Button>
          <Button onClick={submitButtonHandler}>
            <Upload /> Submit
          </Button>
        </>
      )}
    </div>
  );
}
