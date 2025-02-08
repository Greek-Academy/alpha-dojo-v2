import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserMeLoader } from '@/services/user-me-loader';

// 静的ファイルを除外
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - connect (Login routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|connect|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  // ログイン画面以外へ遷移 & 未ログイン
  if (currentPath !== '/login' && user.ok === false) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ログイン画面へ遷移 & ログイン済
  if (currentPath === '/login' && user.ok === true) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
