import { prisma } from '@prisma/prisma'
import { cookies } from 'next/headers'
import { cache } from 'react'

import { SESSION_COOKIE_NAME } from '../config/constants'
import { hashSessionToken } from '../lib/token'
import {
  computeExtendedSessionExpiresAtMs,
  isWithinSessionRefreshWindow,
} from './session-expiry-refresh'

/** 리액트 cache를 사용하여 세션 데이터베이스에서 조회 */
export const getAuthSession = cache(async () => {
  const cookieStore = await cookies()
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value

  /** 쿠키가 없으면 null 반환 */
  if (!raw) {
    return null
  }

  /** 쿠키 값을 해쉬 값으로 변환하고 세션 데이터베이스에서 조회 */
  const tokenHash = hashSessionToken(raw)
  const session = await prisma.session.findUnique({
    where: {
      tokenHash,
    },
  })

  /** 세션이 없거나 만료되었으면 null 반환 */
  if (!session || session.expiresAt.getTime() < Date.now()) {
    return null
  }

  /** 세션 만료 시간 갱신(DB) - 남은 시간이 갱신 임계값 미만이면 MAX_AGE만큼 연장 */
  const nowMs = Date.now()
  if (isWithinSessionRefreshWindow(session.expiresAt.getTime(), nowMs)) {
    const expiresAt = new Date(computeExtendedSessionExpiresAtMs(nowMs))

    await prisma.session.update({
      where: { id: session.id },
      data: { expiresAt },
    })
  }

  /** 세션 소유 계정 조회 */
  const account = await prisma.account.findUnique({
    where: {
      id: session.accountId,
    },
  })

  /** 계정이 없으면 null 반환 */
  if (!account) {
    return null
  }

  return {
    id: account.id,
    accountId: account.accountId,
    name: account.name,
    role: account.role,
    recentLoginAt: account.recentLoginAt,
    createdAt: account.createdAt,
  }
})
