import { prisma } from '@prisma/prisma'

import { ApiErrorResponse, ApiSuccessResponse } from '@/shared/api'
import { API_RESPONSE_MESSAGES } from '@/shared/config'

/** 읽지 않은 문의 조회 */
export const GET = async () => {
  try {
    const unreadRows = await prisma.inquiry.findMany({ where: { status: 'unread' } })
    console.log('unreadRows', unreadRows)
    return ApiSuccessResponse(unreadRows, 200)
  } catch {
    return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.SERVER, 500)
  }
}
