import { Noto_Sans_JP, Roboto_Flex } from "next/font/google"

const notoSansJP = Noto_Sans_JP({
  subsets:  ["latin"],
  variable: '--noto-sans-jp',
  display:  'swap',
})

export { notoSansJP }