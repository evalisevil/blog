'use client'

import Link from 'next/link'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

const NAVIGATION_STYLE =
  'flex items-center gap-2 opacity-70 text-foreground hover:opacity-100 transition-opacity'

export const PostNavigation = () => {
  return (
    <nav className="flex justify-between items-center">
      <div className="w-40 sm:w-56">
        <Link className={NAVIGATION_STYLE} href="/">
          <FaArrowLeft />
          <div className="flex-1">
            <p className="text-xs mb-1">다음 글</p>
            <p className="line-clamp-2 leading-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, voluptas.
            </p>
          </div>
        </Link>
      </div>

      <Link className="bg-primary text-white rounded-md py-2 px-4 text-sm" href="/">
        목록으로
      </Link>

      <div className="w-40 sm:w-56">
        <Link className={`${NAVIGATION_STYLE} text-right`} href="/">
          <div className="flex-1">
            <p className="text-xs mb-1">이전 글</p>
            <p className="line-clamp-2 leading-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, voluptas.
            </p>
          </div>
          <FaArrowRight />
        </Link>
      </div>
    </nav>
  )
}
