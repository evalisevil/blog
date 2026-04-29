import { Nanum_Gothic, Open_Sans } from 'next/font/google'

export const FONT_NANUM_GOTHIC = Nanum_Gothic({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  display: 'swap',
  variable: '--font-nanum-gothic',
})

export const OPEN_SANS = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-open-sans',
})
