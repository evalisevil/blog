import Link from 'next/link'

import { GridContainer } from '@/shared/ui'

const BLOG_TITLE = '🦄 MY BLOG'

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 py-3 md:py-4 z-10001 backdrop-blur-sm bg-background/50">
      <GridContainer>
        <Link className="text-xl md:text-2xl font-bold" href="/">
          {BLOG_TITLE}
        </Link>
      </GridContainer>
    </header>
  )
}
