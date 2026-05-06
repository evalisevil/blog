'use client'

import Link from 'next/link'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

const NAVIGATION_STYLE =
  'flex items-center gap-2 md:opacity-50 text-foreground hover:opacity-100 transition-opacity'

export const PostNavigation = () => {
  return (
    <nav className="flex justify-between items-center">
      <div className="w-32 md:w-40">
        <Link className={NAVIGATION_STYLE} href="/">
          <FaArrowLeft className="size-3 md:size-4" />
          <div className="flex-1">
            <p className="text-xs mb-1">다음 글</p>
            <p className="line-clamp-2 leading-tight text-xs md:text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, voluptas.
            </p>
          </div>
        </Link>
      </div>

      <Link
        className="bg-primary text-white rounded-md py-2 px-4 text-xs md:text-sm w-20 md:w-auto"
        href="/"
      >
        목록으로
      </Link>

      <div className="w-32 md:w-40">
        <Link className={`${NAVIGATION_STYLE} text-right`} href="/">
          <div className="flex-1">
            <p className="text-xs mb-1">이전 글</p>
            <p className="line-clamp-2 leading-tight text-xs md:text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, voluptas.
            </p>
          </div>
          <FaArrowRight className="size-3 md:size-4" />
        </Link>
      </div>
    </nav>
  )
}
