import { redirect } from 'next/navigation'

import { getAuthSession } from '@/entities/auth'

export const LoginLayout = async ({ children }: { children: React.ReactNode }) => {
  const auth = await getAuthSession()

  if (auth) {
    redirect('/')
  }

  return <> {children} </>
}
