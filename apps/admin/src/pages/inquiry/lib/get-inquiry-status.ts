import { type Inquiry } from '@prisma/client'

import { type StatusBadgeType } from '@/shared/types'

export const getStatusVariant = (status: Inquiry['status']): StatusBadgeType => {
  if (status === 'unread') return 'error'
  if (status === 'read') return 'success'
  return 'error'
}

export const getStatusLabel = (status: Inquiry['status']) => {
  if (status === 'unread') return '읽지 않음'
  if (status === 'read') return '읽음'
  return '읽지 않음'
}
