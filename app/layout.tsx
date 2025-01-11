import type { Metadata } from 'next';
import './globals.css';
import { Header } from './layout/header';

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
    <html lang="en">
      <body className="w-screen h-screen flex flex-col gap-2 items-center sm:items-start text-foreground">
        <Header />
        <main className="w-full h-full">{children}</main>
      </body>
    </html>
  );
}
