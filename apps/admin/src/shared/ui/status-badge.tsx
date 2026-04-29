import { STATUS_BADGE } from '../config'
import { cn } from '../lib'
import { type StatusBadgeType } from '../types'
export const StatusBadge = ({ label, variant }: { label: string; variant: StatusBadgeType }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium',
        STATUS_BADGE[variant].pill,
      )}
    >
      <div className={cn('w-1.5 h-1.5 rounded-full shrink-0', STATUS_BADGE[variant].dot)} />
      {label}
    </div>
  )
}
