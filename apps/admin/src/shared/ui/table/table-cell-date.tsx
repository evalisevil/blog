import { formatDate } from 'date-fns'
import { Calendar } from 'lucide-react'

import { getRelativeDate } from '@/shared/lib'
import { TableCell } from '@/shared/ui/shadcn/table'

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
              ? getRelativeDate(date)
              : formatDate(date, withTime ? 'yyyy.MM.dd HH:mm' : 'yyyy.MM.dd')}
          </span>
        )}
      </div>
    </TableCell>
  )
}
