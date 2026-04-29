import { ChevronDown, ChevronUp } from 'lucide-react'

import { Button } from '@/shared/ui/shadcn/button'
import { TableCell } from '@/shared/ui/shadcn/table'

export const TableCellOrderButtons = ({
  onOrderChangeUp,
  onOrderChangeDown,
  disableOrderUp = false,
  disableOrderDown = false,
}: {
  onOrderChangeUp: () => void
  onOrderChangeDown: () => void
  disableOrderUp?: boolean
  disableOrderDown?: boolean
}) => {
  return (
    <TableCell>
      <div className="flex flex-col items-center gap-2">
        <Button
          className="border-gray-200 bg-gray-50/.5 p-1 shadow-none"
          disabled={disableOrderUp}
          size={null}
          variant="outline"
          onClick={onOrderChangeUp}
        >
          <ChevronUp className="size-3" />
        </Button>

        <Button
          className="border-gray-200 bg-gray-50/.5 p-1 shadow-none"
          disabled={disableOrderDown}
          size={null}
          variant="outline"
          onClick={onOrderChangeDown}
        >
          <ChevronDown className="size-3" />
        </Button>
      </div>
    </TableCell>
  )
}
