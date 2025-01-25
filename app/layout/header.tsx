"use client"

import { Button } from '@/components/ui/button';
import { CircleUserRound, Play, Upload } from 'lucide-react';
import { PrimaryButton } from '../components/primary-button';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className="w-full px-6 py-2">
      <div className="w-full flex justify-between items-center">
        <Link className="items-center" href="/">
          Alpha Dojo
        </Link>
        <div className="flex gap-2">
          <Button variant="outline">
            <Play />
            Run
          </Button>
          <PrimaryButton onClick={() => alert('success')}>
            <Upload />
            Submit
          </PrimaryButton>
        </div>
        <div className="items-center">
          <CircleUserRound size="24" />
        </div>
      </div>
    </div>
  );
};
