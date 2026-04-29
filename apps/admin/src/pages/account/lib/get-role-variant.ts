import { type StatusBadgeType } from '@/shared/types'

export const getRoleVariant = (role: string): StatusBadgeType => {
  if (role === 'admin') return 'success'
  if (role === 'editor') return 'warning'
  if (role === 'viewer') return 'neutral'
  return 'error'
}
