import { TableCell } from '@/shared/ui/shadcn/table'

export const TableCellText = ({ text }: { text: string }) => {
  return (
    <TableCell>
      <p className="text-center">{text}</p>
    </TableCell>
  )
}
