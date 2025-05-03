// ヘッダー部に表示されるアカウントのアイコン
// クリックすると、ログアウトボタンを表示

import { getUserMeLoader } from '@/services/user-me-loader';
import { Button, buttonVariants } from './ui/button';
import { AccountCircleIcon } from './ui/icons';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LogoutButton } from './logout-button';
import { MyAccountClient } from './my-account-client';

// 未ログイン時はログインボタンを表示
export const MyAccount = async () => {
  const user = await getUserMeLoader();

  // 未ログイン
  if (!user.ok) {
    return (
      <Link href='/login'>
        <Button>ログイン</Button>
      </Link>
    );
  }

  return (
    <>
      {/* HACK: React Redux にユーザー情報を反映 */}
      <MyAccountClient
        id={user.data.id}
        name={user.data.username}
        email={user.data.email}
      />
      <Popover>
        <PopoverTrigger
          area-label='アカウントメニュー'
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <AccountCircleIcon className='text-foreground-variant' />
        </PopoverTrigger>
        <PopoverContent className='w-auto mx-4'>
          <div className='mb-2'>
            <p>ようこそ！</p>
            <p className='text-headline-medium'>{user.data.username}</p>
            <p className='text-foreground-variant'>{user.data.email}</p>
          </div>
          <LogoutButton />
        </PopoverContent>
      </Popover>
    </>
  );
};
