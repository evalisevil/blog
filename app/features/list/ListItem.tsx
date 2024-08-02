import Link from 'next/link'
import { format, register } from 'timeago.js'
import koLocale from 'timeago.js/lib/lang/ko'
import { listItemType } from '../../types/types'
import Hash from '@/app/shared/components/Hash'

register('ko', koLocale)

export default function ListItem({
  listItem,
  isTemp
}: {
  listItem: listItemType
  isTemp?: boolean
}) {
  const { title, description, hashes, date } = listItem

  return (
    <div className='last:border-b-0 border-b border-[var(--border-color)] py-8'>
      <Link href='/list/1' className='flex flex-col '>
        <h4 className='text-2xl font-bold mb-4 line-clamp-1'>{title}</h4>
        <p className='text-gray-500 line-clamp-2 mb-8'>{description}</p>
        {hashes.length > 1 && (
          <div className='flex gap-2 mb-8 flex-wrap'>
            {hashes.map((hash, index) => (
              <Hash key={index} hash={hash} />
            ))}
          </div>
        )}
      </Link>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-gray-500'>{format(date, 'ko')}</p>
        {isTemp && (
          <button
            type='button'
            className='text-sm underline underline-offset-4'
          >
            삭제
          </button>
        )}
      </div>
    </div>
  )
}
