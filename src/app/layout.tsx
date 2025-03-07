import type { Metadata } from 'next';
import { Header } from '@/app/header';
import { notoSansJP, roboto } from '@/fonts/google-fonts';
import './globals.css';

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
      lang="ja"
      className={`${notoSansJP.variable} ${roboto.variable} w-screen h-screen`}
    >
      <body className="w-full h-full flex flex-col items-center sm:items-start text-foreground text-body-medium">
        <Header />
        <main className="w-full h-full grow overflow-auto">{children}</main>
      </body>
    </html>
  );
}
