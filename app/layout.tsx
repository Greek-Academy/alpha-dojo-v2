import type { Metadata } from 'next';
import { Header } from './layout/header';
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
    <html lang="en" className="w-screen h-screen">
      <body className="w-full h-full flex flex-col items-center sm:items-start">
        <Header />
        <main className="w-full h-full grow overflow-auto">{children}</main>
      </body>
    </html>
  );
}
