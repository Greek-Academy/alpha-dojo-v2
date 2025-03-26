// ヘッダー部に表示されるアカウントのアイコン
// クリックすると、ログアウトボタンを表示

import { getUserMeLoader } from '@/services/user-me-loader';
import { Button } from './ui/button';
import { AccountCircleIcon } from './ui/icons';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LogoutButton } from './logout-button';

// 未ログイン時はログインボタンを表示
export const MyAccount = async () => {
  const user = await getUserMeLoader();

  // 未ログイン
  if (!user.ok) {
    return (
      <Link href="/login">
        <Button>ログイン</Button>
      </Link>
    );
  }

  return (
    <Popover>
      <PopoverTrigger area-label="アカウントメニュー">
        <Button variant='ghost' size='icon'>
          <AccountCircleIcon className='text-foreground-variant' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto mx-4">
        <div className="mb-2">
          <p>ようこそ！</p>
          <p className="text-headline-medium">{user.data.username}</p>
          <p className="text-foreground-variant">{user.data.email}</p>
        </div>
        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
};
