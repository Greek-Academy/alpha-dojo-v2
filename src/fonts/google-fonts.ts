import { Noto_Sans_JP, Roboto_Flex } from 'next/font/google';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--noto-sans-jp',
  display: 'swap',
});

/** Roboto Flex (Roboto は Variable Font 非対応なため) */
const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--roboto',
  display: 'swap',
});

export { notoSansJP, roboto };
