import { prisma } from '@prisma/prisma'

import { DashboardPageShell } from '@/shared/ui/dashboard-page-shell'

import { BasicForm } from './basic-form'

export const BasicPage = async () => {
  const basicData = await prisma.basicSetting.findFirst()

  if (!basicData) {
    return null
  }

  return (
    <DashboardPageShell
      description="사이트 전반에 걸쳐 사용되는 핵심 정보를 설정합니다."
      title="기본 설정"
    >
      <BasicForm basicData={basicData} />
    </DashboardPageShell>
  )
}
