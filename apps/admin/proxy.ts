import { type NextRequest, NextResponse } from 'next/server'

import {
  computeExtendedSessionExpiresAtMs,
  isWithinSessionRefreshWindow,
  SESSION_COOKIE_MAX_AGE_SECONDS,
  SESSION_COOKIE_NAME,
  SESSION_EXPIRES_COOKIE_NAME,
} from '@/entities/auth'
import { ApiErrorResponse } from '@/shared/api'
import { API_RESPONSE_MESSAGES } from '@/shared/config'
import { setHttpOnlyCookie } from '@/shared/lib'

const ADMIN_MAIN_PAGE_PATH = '/'
const LOGIN_PAGE_PATH = '/login'
const API_PATH = '/api'
const LOGIN_API_PATH = '/api/auth/login'

const clearSessionCookies = (response: NextResponse) => {
  response.cookies.delete(SESSION_COOKIE_NAME)
  response.cookies.delete(SESSION_EXPIRES_COOKIE_NAME)
}

const parseExpiresAtMs = (raw: string | undefined): number | null => {
  if (raw === undefined || raw === '') {
    return null
  }
  const n = Number(raw)
  return Number.isFinite(n) ? n : null
}

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const nowMs = Date.now()

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const expiresRaw = request.cookies.get(SESSION_EXPIRES_COOKIE_NAME)?.value
  const expiresAtMs = parseExpiresAtMs(expiresRaw)
  const hasExpiresCookie = expiresRaw !== undefined && expiresRaw !== ''
  const sessionMirrorValid = Boolean(token && expiresAtMs !== null && expiresAtMs > nowMs)
  const hasStaleSessionCookie = Boolean(token || hasExpiresCookie)

  if (pathname.startsWith(LOGIN_API_PATH)) {
    return NextResponse.next()
  }

  if (pathname.startsWith(API_PATH) && !token) {
    return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.AUTH.UNAUTHORIZED, 401)
  }

  if (pathname.startsWith(LOGIN_PAGE_PATH)) {
    if (sessionMirrorValid) {
      return NextResponse.redirect(new URL(ADMIN_MAIN_PAGE_PATH, request.url))
    }
    if (hasStaleSessionCookie) {
      const res = NextResponse.next()
      clearSessionCookies(res)
      return res
    }
    return NextResponse.next()
  }

  if (!sessionMirrorValid) {
    if (pathname.startsWith(API_PATH)) {
      const res = ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.AUTH.UNAUTHORIZED, 401)
      clearSessionCookies(res)
      return res
    }
    const res = NextResponse.redirect(new URL(LOGIN_PAGE_PATH, request.url))
    clearSessionCookies(res)
    return res
  }

  if (expiresAtMs !== null && token && isWithinSessionRefreshWindow(expiresAtMs, nowMs)) {
    const response = NextResponse.next()
    setHttpOnlyCookie(response, SESSION_COOKIE_NAME, token, SESSION_COOKIE_MAX_AGE_SECONDS)
    setHttpOnlyCookie(
      response,
      SESSION_EXPIRES_COOKIE_NAME,
      computeExtendedSessionExpiresAtMs(nowMs).toString(),
      SESSION_COOKIE_MAX_AGE_SECONDS,
    )
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
