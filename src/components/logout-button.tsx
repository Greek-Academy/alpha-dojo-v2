import { envValues } from '@/constants/env';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    <form action={logoutAction}>
      <button
        type="submit"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        ログアウト
      </button>
    </form>
  );
}
