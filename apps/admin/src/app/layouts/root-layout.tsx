import '../styles/global.css'

import { Toaster } from '@/shared/ui/shadcn/sonner'

import { FONT_NANUM_GOTHIC } from '../fonts'
import { Providers } from '../providers/query-client-provider'

export const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning className={FONT_NANUM_GOTHIC.variable} lang="ko">
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  )
}
