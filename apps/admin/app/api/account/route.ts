import { prisma } from '@prisma/prisma'
import bcrypt from 'bcryptjs'

import { ApiErrorResponse, ApiSuccessResponse } from '@/shared/api'
import { API_RESPONSE_MESSAGES } from '@/shared/config'

/** 계정 생성 */
export const POST = async (request: Request) => {
  try {
    const body = await request.json()

    const { accountId, name, password, role } = body

    if (accountId === 'master') {
      return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.ACCOUNT.NOT_ALLOWED, 400)
    }

    const existing = await prisma.account.findUnique({ where: { accountId } })

    if (existing) {
      return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.ACCOUNT.DUPLICATE, 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.account.create({
      data: {
        accountId,
        name,
        password: hashedPassword,
        role,
      },
    })
    return ApiSuccessResponse(null, 201)
  } catch {
    return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.SERVER, 500)
  }
}
