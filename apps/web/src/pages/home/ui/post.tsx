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
    <article className="border-b border-muted-foreground/10 pb-8 mb-8 last-of-type:border-none last-of-type:pb-0 last-of-type:mb-0">
      <Link href={`/post/${id}`}>
        <h4 className="text-xl font-bold mb-4 line-clamp-2">{title}</h4>
        <p className="text-neutral-400 line-clamp-2 mb-4">{description}</p>
      </Link>
      <Tags tags={tags} />
    </article>
  )
}

{
  /*
<article className="border-b border-[--secondary-color] pb-8 mb-8 last-of-type:border-none last-of-type:pb-0 last-of-type:mb-0">
      <Link
        href={`/${
          type === 'post'
            ? `posts/${post._id.toString()}`
            : `write?id=${post._id.toString()}`
        }`}
      >
        <h4 className="text-xl font-bold mb-4 line-clamp-2">{title}</h4>

        <p className="text-neutral-400 line-clamp-2 mb-4">{description}</p>
      </Link>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <CategoryButton key={uuid()} name={category} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">{parseDateFormat(regDate)}</p>
        {type === 'draft' && (
          <PostDeleteButton postId={post._id.toString()} type={type} />
        )}
      </div>
    </article> */
}
