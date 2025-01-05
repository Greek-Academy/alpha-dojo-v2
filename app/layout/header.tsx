import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CircleUserRound, Play, Upload } from 'lucide-react';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className="w-screen h-9 mt-2">
      <Card>
        <CardContent>
          <div className="w-full flex justify-between items-center">
            <Link className="items-center" href="/">
              Alpha Dojo
            </Link>
            <div className="flex gap-2">
              <Button variant="outline">
                <Play />
                Run
              </Button>
              <Button>
                <Upload />
                Submit
              </Button>
            </div>
            <div className="items-center">
              <CircleUserRound size="24" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
