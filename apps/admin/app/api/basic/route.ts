import { prisma } from '@prisma/prisma'

import { ApiErrorResponse, ApiSuccessResponse } from '@/shared/api'
import { API_RESPONSE_MESSAGES } from '@/shared/config'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    await prisma.basic.upsert({
      where: { id: 'default' },
      create: body,
      update: body,
    })

    return ApiSuccessResponse(null, 200)
  } catch {
    return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.SERVER, 500)
  }
}
