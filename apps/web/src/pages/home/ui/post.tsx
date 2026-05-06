import Link from 'next/link'

import { Tags } from '@/shared/ui/tags'

export const Post = ({
  id,
  title,
  description,
  tags,
}: {
  id: string
  title: string
  description: string
  tags: string[]
}) => {
  return (
    <article className="border-b border-muted-foreground/10 pb-6 mb-6 md:pb-8 md:mb-8 last-of-type:border-none last-of-type:pb-0 last-of-type:mb-0">
      <Link href={`/post/${id}`}>
        <h4 className="md:text-xl text-lg font-bold mb-2 md:mb-4 line-clamp-1 md:line-clamp-2">
          {title}
        </h4>
        <p className="text-neutral-400 line-clamp-2 mb-4 md:text-base text-sm">{description}</p>
      </Link>
      <Tags tags={tags} />
    </article>
  )
}
