import '../styles/global.css'

import { GridContainer } from '@/shared/ui'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { FONT_NOTO_SANS_KR } from '../fonts'

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html className={FONT_NOTO_SANS_KR.variable} lang="ko">
      <body>
        <Header />
        <div className="flex flex-col min-h-screen">
          <GridContainer className="flex-1 pt-40 pb-20">{children}</GridContainer>
          <Footer />
        </div>
      </body>
    </html>
  )
}
