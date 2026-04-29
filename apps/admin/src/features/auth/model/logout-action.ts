'use server'

import { prisma } from '@prisma/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getAuthSession, SESSION_COOKIE_NAME, SESSION_EXPIRES_COOKIE_NAME } from '@/entities/auth'

export const logoutAction = async () => {
  const account = await getAuthSession()
  const cookieStore = await cookies()

  /** 쿠키 삭제 */
  cookieStore.delete({ name: SESSION_COOKIE_NAME, path: '/' })
  cookieStore.delete({ name: SESSION_EXPIRES_COOKIE_NAME, path: '/' })

  /** DB 세션 삭제 */
  if (account) {
    await prisma.session.deleteMany({
      where: {
        accountId: account.id,
      },
    })
  }

  redirect('/login')
}
