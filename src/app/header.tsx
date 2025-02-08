import { Button } from '@/components/ui/button';
import { Play, Upload } from 'lucide-react';
import { PrimaryButton } from '../components/primary-button';
import Link from 'next/link';
import { MyAccount } from '@/components/my-account';

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
          <PrimaryButton>
            <Upload />
            Submit
          </PrimaryButton>
        </div>
        <div className="items-center">
          <MyAccount />
        </div>
      </div>
    </div>
  );
};
