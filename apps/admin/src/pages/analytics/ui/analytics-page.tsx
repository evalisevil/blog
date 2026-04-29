import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

import { DashboardPageShell } from '@/shared/ui/dashboard-page-shell'
import { Badge } from '@/shared/ui/shadcn/badge'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/shadcn/card'
import { Progress } from '@/shared/ui/shadcn/progress'

const TOP_PAGES = [
  { label: '/ (메인 홈)', value: '32,104', pct: 100 },
  { label: '/services', value: '18,840', pct: 58 },
  { label: '/about', value: '14,221', pct: 44 },
  { label: '/inquiry', value: '11,508', pct: 35 },
  { label: '/news', value: '8,302', pct: 25 },
  { label: '/team', value: '5,104', pct: 15 },
  { label: '/news/recruit-2024h2', value: '4,820', pct: 14 },
] as const

const TRAFFIC = [
  { label: '🔍 네이버 검색', value: '38.4%', pct: 38 },
  { label: '🔍 구글 검색', value: '24.1%', pct: 24 },
  { label: '🔗 직접 유입', value: '18.2%', pct: 18 },
  { label: '📱 SNS (LinkedIn)', value: '10.8%', pct: 11 },
  { label: '📱 SNS (인스타그램)', value: '5.2%', pct: 5 },
  { label: '📧 이메일 뉴스레터', value: '3.3%', pct: 3 },
] as const

const MONTHLY_BARS = [
  { month: 1, pct: 50 },
  { month: 2, pct: 45 },
  { month: 3, pct: 58 },
  { month: 4, pct: 65 },
  { month: 5, pct: 60 },
  { month: 6, pct: 70 },
  { month: 7, pct: 80 },
  { month: 8, pct: 75 },
  { month: 9, pct: 85 },
  { month: 10, pct: 100 },
] as const

const BarList = ({
  title,
  dotClassName,
  rows,
}: {
  title: string
  dotClassName?: string
  rows: readonly { label: string; value: string; pct: number }[]
}) => {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b py-4">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <span
            aria-hidden
            className={`size-2 shrink-0 rounded-full bg-primary ${dotClassName ?? ''}`}
          />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6 pb-6">
        {rows.map((row) => (
          <div key={row.label} className="space-y-2">
            <div className="flex justify-between gap-2 text-sm">
              <span className="text-foreground">{row.label}</span>
              <span className="text-muted-foreground tabular-nums">{row.value}</span>
            </div>
            <Progress className="h-2" max={100} value={row.pct} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export const AnalyticsPage = () => {
  return (
    <DashboardPageShell title="통계 & 분석">
      <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>이번 달 방문자</CardDescription>
            <CardTitle className="text-3xl font-extrabold tabular-nums text-primary @[250px]/card:text-4xl">
              24,812
            </CardTitle>
            <CardAction>
              <Badge className="gap-1.5" variant="outline">
                <TrendingUpIcon className="size-4" />↑ 12.4% MoM
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>총 페이지뷰</CardDescription>
            <CardTitle className="text-3xl font-extrabold tabular-nums text-violet-600 dark:text-violet-400 @[250px]/card:text-4xl">
              89,340
            </CardTitle>
            <CardAction>
              <Badge className="gap-1.5" variant="outline">
                <TrendingUpIcon className="size-4" />↑ 8.1% MoM
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>평균 체류 시간</CardDescription>
            <CardTitle className="text-3xl font-extrabold tabular-nums text-emerald-600 dark:text-emerald-400 @[250px]/card:text-4xl">
              3:24
            </CardTitle>
            <CardAction>
              <Badge className="gap-1.5" variant="outline">
                <TrendingUpIcon className="size-4" />↑ 0:18 증가
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>이탈률</CardDescription>
            <CardTitle className="text-3xl font-extrabold tabular-nums @[250px]/card:text-4xl">
              42.1<span className="text-lg font-semibold">%</span>
            </CardTitle>
            <CardAction>
              <Badge className="gap-1.5" variant="outline">
                <TrendingDownIcon className="size-4" />↓ 2.3% 개선
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <BarList dotClassName="bg-primary" rows={TOP_PAGES} title="인기 페이지 TOP 10" />
        <BarList dotClassName="bg-violet-500" rows={TRAFFIC} title="유입 경로 분석" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <span aria-hidden className="size-2 shrink-0 rounded-full bg-emerald-500" />
            월별 방문자 추이 (2024)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-40 items-end justify-between gap-1 border-b border-border/60 pb-2 sm:gap-2">
            {MONTHLY_BARS.map((bar) => (
              <div key={bar.month} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                <div
                  className="w-full max-w-10 rounded-t-md bg-gradient-to-t from-primary to-violet-500/80 transition-all"
                  style={{ height: `${bar.pct}%` }}
                  title={`${bar.pct}%`}
                />
                <span className="text-[10px] text-muted-foreground sm:text-xs">{bar.month}월</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardPageShell>
  )
}
