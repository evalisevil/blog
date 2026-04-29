import { prisma } from '@prisma/prisma'
import { TrendingUpIcon } from 'lucide-react'

import { DashboardPageShell } from '@/shared/ui/dashboard-page-shell'
import { StatCard, StatCardContainer } from '@/shared/ui/stat-cards'

import { InquiryTable } from './inquiry-table'

export const InquiryPage = async () => {
  const inquiryData = await prisma.inquiry.findMany()

  return (
    <DashboardPageShell title="문의 관리">
      <StatCardContainer>
        <StatCard accent="blue" label="읽지 않음" value="7" />
        <StatCard accent="red" label="미처리" value="7" />
        <StatCard accent="amber" label="처리 중" value="3" />
        <StatCard
          accent="green"
          badge={{
            icon: TrendingUpIcon,
            label: '12.5%',
            tooltip: '전월 대비 +12.5%',
            variant: 'outline',
          }}
          label="이번 달 완료"
          value="41"
        />
      </StatCardContainer>

      {/* 문의 내역 테이블 */}
      <InquiryTable inquiryData={inquiryData} />
    </DashboardPageShell>
  )
}
