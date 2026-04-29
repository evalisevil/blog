import { MoreHorizontal, Trash2 } from 'lucide-react'

import { TableCell } from '@/shared/ui/shadcn/table'

import { Button } from '../shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../shadcn/dropdown-menu'

interface TableCellActionDropdownPropsType {
  disabled?: boolean
  onToggleVisible?: () => void
  visibleStatus?: boolean
  onEdit?: () => void
  onDelete?: () => void
  children?: React.ReactNode
}

export const TableCellActionDropdown = ({
  disabled,
  onDelete,
  children,
}: TableCellActionDropdownPropsType) => {
  return (
    <TableCell>
      <div className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" disabled={disabled} variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border bg-white rounded-md">
            {children}

            {onDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={onDelete}>
                  <Trash2 className="size-4 text-red-600" />
                  삭제
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TableCell>
  )
}
