import { TableCell } from '@/shared/ui/shadcn/table'

export const TableCellNumberText = ({ text }: { text: string }) => {
  return (
    <TableCell>
      <p className="text-center text-muted-foreground">{text}</p>
    </TableCell>
  )
}
