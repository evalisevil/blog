'use client'

import { ChevronDownIcon, EyeIcon, PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/lib'
import { DashboardPageShell } from '@/shared/ui/dashboard-page-shell'
import { Badge } from '@/shared/ui/shadcn/badge'
import { Button } from '@/shared/ui/shadcn/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/shadcn/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui/shadcn/collapsible'
import { Input } from '@/shared/ui/shadcn/input'
import { Label } from '@/shared/ui/shadcn/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/select'
import { Separator } from '@/shared/ui/shadcn/separator'
import { Switch } from '@/shared/ui/shadcn/switch'
import { Textarea } from '@/shared/ui/shadcn/textarea'

type HistoryCategoryType = 'growth' | 'award' | 'product' | 'people' | 'founding' | 'cert'

interface HistoryItemType {
  month: string
  title: string
  cat: HistoryCategoryType
  catLabel: string
  desc: string
  status: 'published' | 'draft'
  milestone?: boolean
  showView?: boolean
  showDelete?: boolean
}

interface HistoryYearBlockType {
  year: number
  summary: string
  countLabel: string
  defaultOpen: boolean
  muted?: boolean
  items: HistoryItemType[]
  showAdd: boolean
}

const CAT_BADGE: Record<HistoryCategoryType, string> = {
  award: 'border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300',
  growth: 'border-blue-500/40 bg-blue-500/10 text-blue-800 dark:text-blue-300',
  product: 'border-violet-500/40 bg-violet-500/10 text-violet-800 dark:text-violet-300',
  people: 'border-rose-500/40 bg-rose-500/10 text-rose-800 dark:text-rose-300',
  founding: 'border-blue-500/40 bg-blue-500/10 text-blue-800 dark:text-blue-300',
  cert: 'border-teal-500/40 bg-teal-500/10 text-teal-800 dark:text-teal-300',
}

const YEARS: HistoryYearBlockType[] = [
  {
    year: 2024,
    summary: '대한민국 혁신기업 대상 수상 등 5건',
    countLabel: '5건',
    defaultOpen: true,
    showAdd: true,
    items: [
      {
        month: '09월',
        title: '대한민국 혁신기업 대상 수상',
        cat: 'award',
        catLabel: '수상',
        desc: '중소벤처기업부 주관 2024 대한민국 혁신기업 대상을 수상하며 기술력과 성장성을 공식 인정받았습니다.',
        status: 'published',
        milestone: true,
        showView: true,
      },
      {
        month: '08월',
        title: '글로벌파트너스 MOU 체결',
        cat: 'growth',
        catLabel: '성장',
        desc: '동남아시아 시장 공동 진출을 위한 글로벌파트너스와의 전략적 MOU를 체결했습니다.',
        status: 'published',
      },
      {
        month: '07월',
        title: '시리즈 B 투자 유치 완료 (200억)',
        cat: 'growth',
        catLabel: '성장',
        desc: '한국투자파트너스, 스파크랩 등 주요 VC로부터 시리즈 B 투자 200억 원 유치에 성공했습니다.',
        status: 'published',
      },
      {
        month: '04월',
        title: 'CoreCloud v3.0 정식 출시',
        cat: 'product',
        catLabel: '제품',
        desc: 'AI 기반 자동 스케일링 기능을 탑재한 자체 클라우드 플랫폼 CoreCloud 3.0을 정식 출시했습니다.',
        status: 'published',
      },
      {
        month: '01월',
        title: '[초안] 임직원 200명 달성',
        cat: 'people',
        catLabel: '인사',
        desc: '전 직군 합산 임직원 200명 돌파. 정규직 기준.',
        status: 'draft',
      },
    ],
  },
  {
    year: 2023,
    summary: '베트남 법인 설립 등 6건',
    countLabel: '6건',
    defaultOpen: true,
    showAdd: true,
    items: [
      {
        month: '11월',
        title: '베트남 하노이 법인 설립',
        cat: 'growth',
        catLabel: '성장',
        desc: '동남아 시장 진출의 교두보로 베트남 하노이에 현지 법인 CoreTech Vietnam을 설립했습니다.',
        status: 'published',
        milestone: true,
      },
      {
        month: '08월',
        title: 'ISO 27001 정보보안 인증 취득',
        cat: 'cert',
        catLabel: '인증',
        desc: '국제표준 정보보안 경영시스템 ISO/IEC 27001 인증을 획득했습니다.',
        status: 'published',
      },
      {
        month: '03월',
        title: '시리즈 A 투자 유치 (80억)',
        cat: 'growth',
        catLabel: '성장',
        desc: '80억 원 규모의 시리즈 A 투자 유치 완료. 연구개발 및 해외 진출 가속화에 활용.',
        status: 'published',
      },
    ],
  },
  {
    year: 2022,
    summary: '데이터 분석 플랫폼 출시 등 4건',
    countLabel: '4건',
    defaultOpen: false,
    muted: true,
    showAdd: true,
    items: [
      {
        month: '06월',
        title: 'DataLens 1.0 출시',
        cat: 'product',
        catLabel: '제품',
        desc: '자체 개발 데이터 분석 플랫폼 DataLens 1.0 출시. 첫 달 200개 기업 도입.',
        status: 'published',
      },
    ],
  },
  {
    year: 2020,
    summary: '코스닥 상장 등 3건',
    countLabel: '3건',
    defaultOpen: false,
    muted: true,
    showAdd: true,
    items: [
      {
        month: '11월',
        title: '코스닥 시장 상장',
        cat: 'growth',
        catLabel: '성장',
        desc: '코스닥 시장에 공식 상장. 공모가 12,000원 기준 시가총액 480억 원.',
        status: 'published',
        milestone: true,
      },
    ],
  },
  {
    year: 2017,
    summary: '기업부설연구소 설립 등 2건',
    countLabel: '2건',
    defaultOpen: false,
    muted: true,
    showAdd: true,
    items: [
      {
        month: '04월',
        title: "기업부설연구소 'CoreLab' 설립",
        cat: 'growth',
        catLabel: '성장',
        desc: '자체 R&D 역량 강화를 위한 기업부설연구소 CoreLab을 설립. 연구인력 20명 배치.',
        status: 'published',
      },
    ],
  },
  {
    year: 2012,
    summary: '회사 창립',
    countLabel: '1건',
    defaultOpen: false,
    muted: true,
    showAdd: false,
    items: [
      {
        month: '03월',
        title: '(주)코어테크 창립',
        cat: 'founding',
        catLabel: '창립',
        desc: '서울 강남구에서 4명의 공동창업자와 함께 (주)코어테크를 설립. IT 서비스 전문 기업으로 출발.',
        status: 'published',
        milestone: true,
        showDelete: false,
      },
    ],
  },
]

export const HistoryPage = () => {
  const [formYear, setFormYear] = React.useState(2024)
  const [formMonth, setFormMonth] = React.useState('09월')
  const [formTitle, setFormTitle] = React.useState('대한민국 혁신기업 대상 수상')
  const [formDesc, setFormDesc] = React.useState(
    '중소벤처기업부 주관 2024 대한민국 혁신기업 대상을 수상하며 기술력과 성장성을 공식 인정받았습니다.',
  )
  const [milestone, setMilestone] = React.useState(true)

  return (
    <DashboardPageShell title="연혁">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>총 연혁 항목</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums text-primary">38</CardTitle>
            <p className="text-xs text-muted-foreground">2012 ~ 2024</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>수상·인증</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums text-violet-600 dark:text-violet-400">
              9
            </CardTitle>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">↑ 올해 2건 추가</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>주요 이정표</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
              12
            </CardTitle>
            <p className="text-xs text-muted-foreground">창립·상장·해외진출 등</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>미게시 초안</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums text-amber-600 dark:text-amber-400">
              2
            </CardTitle>
            <p className="text-xs text-muted-foreground">검토 후 게시 필요</p>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <span aria-hidden className="size-2 rounded-full bg-primary" />
              연도별 연혁 관리
            </h2>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]" size="sm">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 카테고리</SelectItem>
                  <SelectItem value="award">수상·인증</SelectItem>
                  <SelectItem value="growth">성장·확장</SelectItem>
                  <SelectItem value="product">제품·서비스</SelectItem>
                  <SelectItem value="people">인사·조직</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" type="button" variant="outline">
                <PlusIcon className="size-4" />
                연도 추가
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {YEARS.map((block) => (
              <Collapsible key={block.year} defaultOpen={block.defaultOpen}>
                <Card className="gap-0 py-0">
                  <CollapsibleTrigger asChild>
                    <Button
                      className="group h-auto w-full justify-between rounded-b-none rounded-t-xl border-0 px-4 py-3 hover:bg-muted/60"
                      type="button"
                      variant="ghost"
                    >
                      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-left">
                        <Badge
                          className={cn('shrink-0', block.muted && 'text-muted-foreground')}
                          variant="secondary"
                        >
                          {block.year}
                        </Badge>
                        <span
                          className={cn(
                            'truncate text-sm text-muted-foreground',
                            block.muted && 'opacity-80',
                          )}
                        >
                          {block.summary}
                        </span>
                        <span className="ml-auto shrink-0 text-xs text-muted-foreground tabular-nums">
                          {block.countLabel}
                        </span>
                      </div>
                      <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="space-y-3 border-t pt-4 pb-4">
                      {block.items.map((item) => (
                        <div
                          key={`${block.year}-${item.month}-${item.title}`}
                          className={cn(
                            'relative rounded-lg border bg-card p-4 pl-3 shadow-xs',
                            item.milestone && 'border-primary/30 bg-primary/5',
                          )}
                        >
                          <div className="flex flex-wrap items-center gap-2 gap-y-1">
                            <span className="text-xs font-medium text-muted-foreground">
                              {item.month}
                            </span>
                            <span className="font-medium">{item.title}</span>
                            <Badge
                              className={cn('text-[10px]', CAT_BADGE[item.cat])}
                              variant="outline"
                            >
                              {item.catLabel}
                            </Badge>
                            <Badge
                              className="text-[10.5px]"
                              variant={item.status === 'published' ? 'default' : 'secondary'}
                            >
                              {item.status === 'published' ? '게시 중' : '초안'}
                            </Badge>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                          <div className="mt-3 flex gap-1">
                            <Button aria-label="편집" size="icon" type="button" variant="ghost">
                              <PencilIcon className="size-4" />
                            </Button>
                            {item.showDelete !== false ? (
                              <Button
                                aria-label="삭제"
                                className="text-destructive hover:text-destructive"
                                size="icon"
                                type="button"
                                variant="ghost"
                              >
                                <Trash2Icon className="size-4" />
                              </Button>
                            ) : null}
                            {item.showView ? (
                              <Button
                                aria-label="미리보기"
                                size="icon"
                                type="button"
                                variant="ghost"
                              >
                                <EyeIcon className="size-4" />
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      ))}
                      {block.showAdd ? (
                        <Button className="w-full border-dashed" type="button" variant="outline">
                          <PlusIcon className="size-4" />
                          {block.year}년 항목 추가
                        </Button>
                      ) : null}
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>

        <Card className="w-full shrink-0 xl:sticky xl:top-4 xl:w-[380px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
            <CardTitle className="text-base">✏️ 연혁 항목 편집</CardTitle>
            <Button size="sm" type="button" variant="ghost">
              닫기
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="hy-year">
                연도 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="hy-year"
                max={2099}
                min={2000}
                type="number"
                value={formYear}
                onChange={(e) => setFormYear(Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="hy-month">
                  월 <span className="text-destructive">*</span>
                </Label>
                <Select value={formMonth} onValueChange={setFormMonth}>
                  <SelectTrigger className="w-full" id="hy-month" size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const m = `${String(i + 1).padStart(2, '0')}월`
                      return (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hy-cat">카테고리</Label>
                <Select defaultValue="growth">
                  <SelectTrigger className="w-full" id="hy-cat" size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="growth">성장·확장</SelectItem>
                    <SelectItem value="award">수상·인증</SelectItem>
                    <SelectItem value="product">제품·서비스</SelectItem>
                    <SelectItem value="people">인사·조직</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hy-title">
                제목 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="hy-title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hy-desc">상세 설명</Label>
              <Textarea
                className="min-h-[88px]"
                id="hy-desc"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>주요 이정표 여부</Label>
              <div className="flex items-center gap-3 rounded-md border bg-muted/40 px-3 py-2.5">
                <Switch checked={milestone} id="hy-milestone" onCheckedChange={setMilestone} />
                <Label className="text-muted-foreground font-normal" htmlFor="hy-milestone">
                  이정표로 표시 (타임라인에서 강조)
                </Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hy-publish">게시 상태</Label>
              <Select defaultValue="published">
                <SelectTrigger className="w-full" id="hy-publish" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">게시 중</SelectItem>
                  <SelectItem value="draft">초안 (비게시)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>관련 이미지 (선택)</Label>
              <div className="cursor-pointer rounded-md border border-dashed px-3 py-4 text-center text-xs text-muted-foreground">
                🖼 이미지 업로드 (선택 사항)
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs text-muted-foreground">미리보기</p>
              <div className="rounded-lg border bg-muted/30 p-4 text-sm">
                <div className="text-lg font-bold text-primary">{formYear}</div>
                <div className="text-xs text-muted-foreground">{formMonth}</div>
                <div className="mt-1 font-semibold">{formTitle}</div>
                <p className="mt-2 text-muted-foreground">{formDesc}</p>
              </div>
            </div>

            <Separator />
          </CardContent>
          <CardFooter className="flex gap-2 border-t">
            <Button className="flex-1" type="button" variant="outline">
              취소
            </Button>
            <Button
              className="flex-[2]"
              type="button"
              onClick={() => {
                window.alert('저장되었습니다!')
              }}
            >
              저장
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardPageShell>
  )
}
