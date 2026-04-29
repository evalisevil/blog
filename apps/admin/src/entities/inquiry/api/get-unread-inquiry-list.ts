import { prisma } from '@prisma/prisma'
import { cache } from 'react'

export const getUnreadInquiryList = cache(async () => {
  const unreadRows = await prisma.inquiry.findMany({ where: { status: 'unread' } })
  return { count: unreadRows.length, data: unreadRows }
})
