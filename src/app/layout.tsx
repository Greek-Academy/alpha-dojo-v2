import type { Metadata } from 'next';
import { Header } from '@/app/header';
import { notoSansJP, roboto } from '@/fonts/google-fonts';
import './globals.css';
import { cn } from '@/lib/utils';
import StoreProvider from './store-provider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='ja'
      className={cn(
        `${notoSansJP.variable} ${roboto.variable} w-screen h-screen`,
        '[&_h1]:text-headline-large',
        '[&_h2]:text-headline-medium',
        '[&_h3]:text-headline-small',
        '[&_h4]:text-title-large',
        '[&_h5]:text-title-medium',
        '[&_h6]:text-title-small',
        '[&_ul]:list-outside [&_ul]:ml-6',
        '[&_ol]:list-outside [&_ol]:ml-6',
        '[&_pre]:overflow-hidden [&_pre]:border [&_pre]:border-border [&_pre]:rounded-xl',
        '[&_code]:block [&_code]:overflow-x-auto [&_code]:p-2.5',
        '[&_a]:text-blue-600 visited:[&_a]:text-purple-600 [&_a]:underline [&_a]:underline-offset-2'
      )}
    >
      <body className='w-full h-full flex flex-col items-center sm:items-start text-foreground text-body-medium'>
        <StoreProvider>
          <Header />
          <main className='w-full h-full grow overflow-auto'>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
