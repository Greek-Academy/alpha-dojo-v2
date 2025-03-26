import { envValues } from '@/constants/env';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from './ui/button';

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: envValues.host,
  httpOnly: true,
  secure: envValues.secure,
};

async function logoutAction() {
  'use server';
  (await cookies()).set('jwt', '', { ...config, maxAge: 0 });
  redirect('/');
}

export function LogoutButton() {
  return (
    <Button onClick={logoutAction}>
      ログアウト
    </Button>
  );
}
