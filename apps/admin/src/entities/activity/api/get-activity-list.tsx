import { prisma } from '@prisma/prisma'

export const getActivityList = async () => {
  const activityRows = await prisma.activityLog.findMany({ take: 100 })
  return { data: activityRows }
}
