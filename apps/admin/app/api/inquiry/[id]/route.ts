import { prisma } from '@prisma/prisma'

import { ApiErrorResponse, ApiSuccessResponse } from '@/shared/api'
import { API_RESPONSE_MESSAGES } from '@/shared/config'

/** 문의 상태 변경 */
export const PATCH = async (request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params
    const { status } = await request.json()

    const existing = await prisma.inquiry.findUnique({ where: { id } })

    if (!existing) {
      return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.INQUIRY.NOT_FOUND, 404)
    }

    await prisma.inquiry.update({
      data: { status },
      where: { id },
    })

    return ApiSuccessResponse(null, 200)
  } catch {
    return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.SERVER, 500)
  }
}

/** 문의 삭제 */
export const DELETE = async (_: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params

    const existing = await prisma.inquiry.findUnique({ where: { id } })

    if (!existing) {
      return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.INQUIRY.NOT_FOUND, 404)
    }

    await prisma.inquiry.delete({ where: { id } })

    return ApiSuccessResponse(null, 200)
  } catch {
    return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.SERVER, 500)
  }
}
