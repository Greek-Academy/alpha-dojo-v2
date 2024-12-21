import { Button } from '@/components/ui/button';
import { CircleUserRound, Play, Upload } from 'lucide-react';

export const Header = () => {
  return (
    <div className="w-full px-6 py-2">
        <div className="w-full flex justify-between items-center">
          <div className="items-center">Alpha Dojo</div>
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
    </div>
  );
};
