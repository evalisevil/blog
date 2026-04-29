import 'dayjs/locale/ko' // 한국어 설정

import { formatDate } from 'date-fns'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Calendar } from 'lucide-react'

import { TableCell } from '@/shared/ui/shadcn/table'

dayjs.extend(relativeTime)
dayjs.locale('ko')

export const TableCellDate = ({
  date,
  withTime,
  relativeDate,
}: {
  date: Date | null
  relativeDate?: boolean
  withTime?: boolean
}) => {
  return (
    <TableCell>
      <div className="flex gap-1 items-center justify-center">
        {relativeDate || <Calendar className="size-3 text-muted-foreground" />}
        {date === null ? (
          <span className="text-xs text-muted-foreground">-</span>
        ) : (
          <span className="text-xs text-muted-foreground">
            {relativeDate
              ? dayjs(date).fromNow()
              : formatDate(date, withTime ? 'yyyy.MM.dd HH:mm' : 'yyyy.MM.dd')}
          </span>
        )}
      </div>
    </TableCell>
  )
}
