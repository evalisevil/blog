import { type Role } from '@prisma/client'
import { prisma } from '@prisma/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

import { getAuthSession, SESSION_COOKIE_NAME, SESSION_EXPIRES_COOKIE_NAME } from '@/entities/auth'
import { ApiErrorResponse, ApiSuccessResponse } from '@/shared/api'
import { API_RESPONSE_MESSAGES } from '@/shared/config'

/** 계정 수정 */
export const PATCH = async (request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params

    const body = await request.json()

    const { name, password, role } = body

    const existing = await prisma.account.findUnique({ where: { id } })

    if (!existing) {
      return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.ACCOUNT.NOT_FOUND, 404)
    }

    if (existing.accountId === 'master') {
      return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.UPDATE, 403)
    }

    if (existing.role === 'admin') {
      const adminCount = await prisma.account.count({ where: { role: 'admin' } })
      if (adminCount <= 1 && role !== 'admin') {
        return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.ACCOUNT.ADMIN_COUNT_LIMIT, 409)
      }
    }

    const data: { name: string; password?: string; role: Role } = {
      name,
      role,
    }

    if (password) {
      data.password = await bcrypt.hash(password, 10)
    }

    await prisma.account.update({
      data,
      where: { id },
    })

    return ApiSuccessResponse(null, 200)
  } catch {
    return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.SERVER, 500)
  }
}

/** 계정 삭제 */
export const DELETE = async (_: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const auth = await getAuthSession()
    const cookieStore = await cookies()
    const { id } = await context.params

    if (!auth) {
      return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.AUTH.UNAUTHORIZED, 401)
    }

    const existing = await prisma.account.findUnique({ where: { id } })

    if (!existing) {
      return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.ACCOUNT.NOT_FOUND, 404)
    }

    if (existing.role === 'admin') {
      const adminCount = await prisma.account.count({ where: { role: 'admin' } })
      if (adminCount <= 1) {
        return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.ACCOUNT.ADMIN_COUNT_LIMIT, 409)
      }
    }

    if (existing.role === 'master') {
      return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.DELETE, 409)
    }

    /** 자신의 계정을 삭제하는 경우 */
    if (auth.id === id) {
      await prisma.$transaction(async (tx) => {
        await tx.session.delete({ where: { accountId: id } })
        await tx.account.delete({ where: { id } })
      })

      cookieStore.delete({ name: SESSION_COOKIE_NAME, path: '/' })
      cookieStore.delete({ name: SESSION_EXPIRES_COOKIE_NAME, path: '/' })
    }

    /** 다른 계정을 삭제하는 경우 */
    if (auth.id !== id) {
      await prisma.account.delete({ where: { id } })
    }

    return ApiSuccessResponse(null, 200)
  } catch {
    return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.SERVER, 500)
  }
}
