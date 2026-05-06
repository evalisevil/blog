import { getRelativeDate } from '@/shared/lib'
import { Tags } from '@/shared/ui'
import { Hero } from '@/widgets/hero'

import { PostNavigation } from './post-navigation'
import { PostText } from './post-text'

const BLOG = {
  title: 'App Router에서 서버 컴포넌트와 클라이언트 경계 나누기',
  writer: 'John Doe',
  date: new Date('2026-02-30'),
  tags: ['Next.js', 'React', 'TypeScript'],
}

export const PostPage = async ({ params }: { params: { id: string } }) => {
  // eslint-disable-next-line
  const { id } = await params

  return (
    <main className="w-full">
      {/* 포스트 제목/작성일/태그 목록 */}
      <hgroup className="pb-10 mb-10 border-b border-muted-foreground/10">
        <h2 className="mb-3 md:mb-6 text-2xl md:text-3xl font-bold leading-snug break-keep">
          {BLOG.title}
        </h2>

        <div className="flex items-center gap-2 mb-6">
          <p className="text-sm">{BLOG.writer}</p>
          &middot;
          <p className="text-sm text-muted-foreground/70">{getRelativeDate(BLOG.date)}</p>
        </div>
        <Tags tags={BLOG.tags} />
      </hgroup>

      {/* 본문 */}
      <PostText />

      {/* 히어로 */}
      <Hero />

      {/* 이전/다음/목록 네비게이션 */}
      <PostNavigation />
    </main>
  )
}
