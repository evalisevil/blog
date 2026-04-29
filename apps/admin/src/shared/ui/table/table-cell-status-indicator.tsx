import { type StatusBadgeType } from '@/shared/types'
import { TableCell } from '@/shared/ui/shadcn/table'

import { StatusBadge } from '../status-badge'

export const TableCellStatusIndicator = ({
  label,
  variant,
}: {
  label: string
  variant: StatusBadgeType
}) => {
  return (
    <TableCell className="text-center">
      <StatusBadge label={label} variant={variant} />
    </TableCell>
  )
}
