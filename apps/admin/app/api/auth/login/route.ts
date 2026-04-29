import { prisma } from '@prisma/prisma'
import bcrypt from 'bcryptjs'

import {
  createSessionToken,
  getRequestIpAddress,
  getRequestUserAgent,
  hashSessionToken,
  SESSION_COOKIE_MAX_AGE_SECONDS,
  SESSION_COOKIE_NAME,
  SESSION_EXPIRES_COOKIE_NAME,
} from '@/entities/auth'
import { ApiErrorResponse, ApiSuccessResponse } from '@/shared/api'
import { API_RESPONSE_MESSAGES } from '@/shared/config'
import { setHttpOnlyCookie } from '@/shared/lib'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { accountId, password } = body

    const account = await prisma.account.findUnique({
      where: { accountId },
    })

    /** 계정 조회 실패 */
    if (!account) {
      return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.AUTH.INVALID_CREDENTIALS, 401)
    }
    const passwordValid = await bcrypt.compare(password, account.password)

    /** 비밀번호 검증 실패 */
    if (!passwordValid) {
      return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.AUTH.INVALID_CREDENTIALS, 401)
    }

    /** 최근 로그인 시각 갱신 */
    const recentLoginAt = new Date()
    await prisma.account.update({
      where: { id: account.id },
      data: { recentLoginAt },
    })

    /** 세션 생성 */
    const rawToken = createSessionToken()
    const tokenHash = hashSessionToken(rawToken)
    const expiresAt = new Date(Date.now() + SESSION_COOKIE_MAX_AGE_SECONDS * 1000)
    const ipAddress = getRequestIpAddress(request)
    const userAgent = getRequestUserAgent(request)

    /** 세션 업서트 */
    await prisma.session.upsert({
      where: {
        accountId: account.id,
      },
      create: {
        accountId: account.id,
        tokenHash,
        expiresAt,
        ipAddress,
        userAgent,
      },
      update: {
        tokenHash,
        expiresAt,
        ipAddress,
        userAgent,
      },
    })

    /** 세션 토큰, 세션 만료 시간 두 쿠키를 설정 */
    const response = ApiSuccessResponse({ name: account.name }, 200)
    setHttpOnlyCookie(response, SESSION_COOKIE_NAME, rawToken, SESSION_COOKIE_MAX_AGE_SECONDS)
    setHttpOnlyCookie(
      response,
      SESSION_EXPIRES_COOKIE_NAME,
      expiresAt.getTime().toString(),
      SESSION_COOKIE_MAX_AGE_SECONDS,
    )

    return response
  } catch {
    return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.SERVER, 500)
  }
}
