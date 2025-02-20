import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { HOST, STRAPI_API_URL } from '@/constants/paths';
import { NODE_ENV } from '@/constants/env';

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: HOST,
  httpOnly: true,
  secure: NODE_ENV === 'production',
};

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(
  request: Request,
  params: { params: Promise<{ provider: string }> }
) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('access_token');

  if (!token) return NextResponse.redirect(new URL('/login', request.url));

  const provider = (await params.params).provider;
  const backendUrl = STRAPI_API_URL;
  const path = `/auth/${provider}/callback`;

  const url = new URL(backendUrl + path);
  url.searchParams.append('access_token', token);

  const res = await fetch(url.href);
  const data = await res.json();

  (await cookies()).set('jwt', data.jwt, config);

  return NextResponse.redirect(new URL('/', request.url));
}
