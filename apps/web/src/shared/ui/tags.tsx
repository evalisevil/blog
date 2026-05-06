import Link from 'next/link'

import { cn } from '@/shared/lib'

export const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap gap-1.5 md:gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          className={cn(
            'rounded-full px-3 py-1.5 md:px-4 font-medium bg-gray-100 text-primary hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 md:text-sm text-xs',
            tag === 'All' && 'bg-primary text-white',
          )}
          href={`/?tag=${tag}`}
          type="button"
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}
