import { TableCell } from '@/shared/ui/shadcn/table'

export const TableCellTitle = ({ title }: { title: string }) => {
  return (
    <TableCell>
      <h4 className="font-medium">{title}</h4>
    </TableCell>
  )
}
