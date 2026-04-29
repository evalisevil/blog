import Link from 'next/link'

import { cn } from '@/shared/lib'

export const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          className={cn(
            'rounded-full px-4 py-1.5 font-medium text-sm bg-gray-100 text-primary hover:bg-primary hover:text-white cursor-pointer transition-all duration-300',
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
