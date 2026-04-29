import { prisma } from '@prisma/prisma'

import { DashboardPageShell } from '@/shared/ui/dashboard-page-shell'

import { AccountTable } from './account-table'

export const AccountPage = async () => {
  const accountData = await prisma.account.findMany({
    where: { accountId: { not: 'master' } },
  })

  return (
    <DashboardPageShell description="사이트 관리자 계정을 관리합니다." title="계정 관리">
      <AccountTable accountData={accountData} />
    </DashboardPageShell>
  )
}
