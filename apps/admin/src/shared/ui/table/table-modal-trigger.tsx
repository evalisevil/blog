import { type LucideIcon } from 'lucide-react'

import { DropdownMenuItem } from '@/shared/ui/shadcn/dropdown-menu'

interface TableModalTriggerPropsType {
  icon: LucideIcon
  label: string
  variant?: 'default' | 'destructive' | undefined
  disabled?: boolean
  onOpen: () => void
}

export const TableModalTrigger = ({
  icon,
  label,
  variant,
  disabled = false,
  onOpen,
}: TableModalTriggerPropsType) => {
  const Icon = icon
  return (
    <DropdownMenuItem disabled={disabled} variant={variant} onClick={onOpen}>
      <div className="flex items-center gap-2">
        <Icon className="size-4" color={variant === 'destructive' ? 'red' : undefined} />
        <p>{label}</p>
      </div>
    </DropdownMenuItem>
  )
}
