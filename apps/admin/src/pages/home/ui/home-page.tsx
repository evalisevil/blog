import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

import { getActivityList } from '@/entities/activity'
import { getUnreadInquiryList } from '@/entities/inquiry'
import { DashboardPageShell } from '@/shared/ui/dashboard-page-shell'
import { StatCard, StatCardContainer } from '@/shared/ui/stat-cards'

import { CurrentLogs } from './current-logs'
import { UnreadMessage } from './unread-message'
import { VisitorChart } from './visitor-chart'

export const HomePage = async () => {
  const { count: unreadInquiryCount, data: unreadInquiryData } = await getUnreadInquiryList()
  const { data: activityData } = await getActivityList()

  return (
    <DashboardPageShell title="대시보드">
      <StatCardContainer>
        <StatCard
          accent="blue"
          badge={{
            icon: TrendingUpIcon,
            label: '12.5%',
            tooltip: '전월 대비 +12.5%',
            variant: 'outline',
          }}
          label="이번달 방문자"
          value="24,812"
        />
        <StatCard
          accent="blue"
          badge={{
            icon: TrendingUpIcon,
            label: '11.2%',
            tooltip: '전월 대비 +11.2%',
            variant: 'outline',
          }}
          label="총 페이지 뷰"
          value="89,340"
        />
        <StatCard
          accent="blue"
          badge={{
            icon: TrendingDownIcon,
            label: '3건',
            tooltip: '읽지 않은 3건',
            variant: 'outline',
          }}
          label="신규 문의"
          value="7"
        />
        <StatCard
          accent="blue"
          badge={{
            icon: TrendingUpIcon,
            label: '3건',
            tooltip: '이번 주 3건 추가',
            variant: 'outline',
          }}
          label="게시 중 콘텐츠"
          value="12"
        />
      </StatCardContainer>
      <VisitorChart />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UnreadMessage
          unreadInquiryCount={unreadInquiryCount}
          unreadInquiryList={unreadInquiryData}
        />
        <CurrentLogs activityData={activityData} />
      </div>
    </DashboardPageShell>
  )
}
