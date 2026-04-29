'use client'

import { CopyIcon, PencilIcon, SearchIcon, Trash2Icon } from 'lucide-react'
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/shadcn/carousel'
import { Checkbox } from '@/shared/ui/shadcn/checkbox'
import { Input } from '@/shared/ui/shadcn/input'
import { Label } from '@/shared/ui/shadcn/label'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/shared/ui/shadcn/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/select'
import { Switch } from '@/shared/ui/shadcn/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/shadcn/table'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/shadcn/toggle-group'

const SLOT_ROWS = [
  {
    id: 'gnb',
    name: '메인 상단 (GNB 하단)',
    status: '✅ 10월 이벤트 배너 · 728×90',
    rowClass: 'border-primary bg-primary/15',
    nameClass: 'font-semibold text-primary',
  },
  {
    id: 'hero',
    name: '메인 히어로 슬라이더',
    status: '— 빈 슬롯 · 1920×600',
    rowClass: 'border-dashed border-muted-foreground/30 bg-primary/5',
    nameClass: 'text-muted-foreground',
  },
  {
    id: 'service',
    name: '서비스 페이지 CTA',
    status: '✅ 무료 상담 신청 · 전체폭×120',
    rowClass: 'border-emerald-500/40 bg-emerald-500/10',
    nameClass: 'font-semibold text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'news',
    name: '뉴스 사이드바',
    status: '✅ 채용 공고 배너 · 300×250',
    rowClass: 'border-amber-500/40 bg-amber-500/10',
    nameClass: 'font-semibold text-amber-700 dark:text-amber-400',
  },
  {
    id: 'footer',
    name: '푸터 뉴스레터 구독',
    status: '⏸ OFF 상태 · 전체폭×80',
    rowClass: 'border-dashed border-muted-foreground/30 bg-violet-500/5',
    nameClass: 'text-muted-foreground',
  },
] as const

const BANNER_ROWS = [
  {
    id: 'b1',
    emoji: '🎃',
    name: '10월 이벤트 배너',
    file: 'banner_oct.jpg',
    place: '메인 상단',
    size: '728×90',
    period: '10/01~10/31',
    clicks: '2,104',
    ctr: '4.2%',
    ctrClass: 'text-emerald-600 dark:text-emerald-400',
    thumbClass: 'from-[#4f7cff22] to-[#7c5cfc22]',
    dimmed: false,
    clicksDim: false,
  },
  {
    id: 'b2',
    emoji: '💬',
    name: '무료 상담 신청 CTA',
    file: 'cta_consult.png',
    place: '서비스',
    size: '전체폭×120',
    period: '상시',
    clicks: '1,840',
    ctr: '5.1%',
    ctrClass: 'text-emerald-600 dark:text-emerald-400',
    thumbClass: 'from-[#00e5a022] to-[#4f7cff22]',
    dimmed: false,
    clicksDim: false,
  },
  {
    id: 'b3',
    emoji: '👔',
    name: '하반기 채용 공고',
    file: 'banner_recruit.jpg',
    place: '뉴스 사이드',
    size: '300×250',
    period: '10/01~11/30',
    clicks: '920',
    ctr: '3.1%',
    ctrClass: 'text-amber-600 dark:text-amber-400',
    thumbClass: 'from-[#ffb54722] to-[#ff4f6a22]',
    dimmed: false,
    clicksDim: false,
  },
  {
    id: 'b4',
    emoji: '✉️',
    name: '뉴스레터 구독 유도',
    file: 'newsletter.png',
    place: '푸터',
    size: '전체폭×80',
    period: '상시',
    clicks: '—',
    ctr: '—',
    ctrClass: 'text-muted-foreground',
    thumbClass: 'bg-muted',
    dimmed: true,
    clicksDim: true,
  },
  {
    id: 'b5',
    emoji: '🏆',
    name: '혁신기업 대상 수상',
    file: 'award_banner.png',
    place: '메인 히어로',
    size: '1920×600',
    period: '09/23~10/31',
    clicks: '5,320',
    ctr: '6.8%',
    ctrClass: 'text-emerald-600 dark:text-emerald-400',
    thumbClass: 'from-[#7c5cfc22] to-[#4f7cff22]',
    dimmed: false,
    clicksDim: false,
  },
] as const

export const BannerPage = () => {
  const [rowOn, setRowOn] = React.useState<Record<string, boolean>>({
    b1: true,
    b2: true,
    b3: true,
    b4: false,
    b5: true,
  })
  const [bannerOn, setBannerOn] = React.useState(true)
  const [linkTarget, setLinkTarget] = React.useState('same')

  const flipRow = (id: string, v: boolean) => {
    setRowOn((prev) => ({ ...prev, [id]: v }))
  }

  return (
    <DashboardPageShell title="배너 관리">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">배너 슬라이드 미리보기</CardTitle>
          <CardDescription>세로 캐러셀 · 홈 히어로용 목업</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative rounded-lg border">
            <Carousel
              className="static mx-auto w-full max-w-md"
              opts={{ align: 'center', loop: true }}
              orientation="vertical"
            >
              <CarouselContent className="h-[350px]">
                {[1, 2, 3, 4, 5].map((num) => (
                  <CarouselItem key={num} className="pt-1 md:basis-1/2">
                    <div className="p-1">
                      <Card className="aspect-video">
                        <CardContent className="flex h-full items-center justify-center">
                          <span className="text-3xl font-semibold">{num}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="top-1/2 left-[5%] right-auto translate-x-0 -translate-y-1/2 rotate-0" />
              <CarouselNext className="top-1/2 right-[5%] left-auto translate-x-0 -translate-y-1/2 rotate-0" />
            </Carousel>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 배너</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums text-primary">9</CardTitle>
            <p className="text-xs text-muted-foreground">등록된 배너 총계</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>노출 중</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
              5
            </CardTitle>
            <p className="text-xs text-muted-foreground">현재 ON 상태</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>평균 CTR</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums text-violet-600 dark:text-violet-400">
              3.8<span className="text-base font-semibold">%</span>
            </CardTitle>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">↑ 0.4% 전월 대비</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>이번 달 클릭</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums text-amber-600 dark:text-amber-400">
              4,821
            </CardTitle>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">↑ 12% 전월 대비</p>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-1 border-b sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-sm font-semibold">🗺 사이트 배너 노출 위치 현황</CardTitle>
          <CardDescription className="sm:text-right">
            슬롯을 클릭하면 해당 배너를 편집합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 pt-6">
          {SLOT_ROWS.map((slot) => (
            <button
              key={slot.id}
              className={cn(
                'flex w-full items-center justify-between rounded-lg border px-3.5 py-2.5 text-left text-xs transition-colors',
                'hover:bg-muted/60',
                slot.rowClass,
              )}
              type="button"
            >
              <span className={slot.nameClass}>{slot.name}</span>
              <span className={cn('shrink-0', slot.id === 'footer' && 'text-muted-foreground')}>
                {slot.status}
              </span>
            </button>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <div className="min-w-0 flex-1 space-y-4">
          <Card className="gap-0 overflow-hidden py-0">
            <CardHeader className="flex flex-col gap-3 border-b py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="relative w-full min-w-[200px] flex-1 sm:max-w-xs">
                <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="배너명 검색..." type="search" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select defaultValue="all-loc">
                  <SelectTrigger className="w-[130px]" size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-loc">전체 위치</SelectItem>
                    <SelectItem value="main">메인</SelectItem>
                    <SelectItem value="service">서비스</SelectItem>
                    <SelectItem value="news">뉴스</SelectItem>
                    <SelectItem value="footer">푸터</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-status">
                  <SelectTrigger className="w-[120px]" size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-status">전체 상태</SelectItem>
                    <SelectItem value="on">ON</SelectItem>
                    <SelectItem value="off">OFF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0 pt-0">
              <TableContainer>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-9" />
                      <TableHead className="text-left">배너명</TableHead>
                      <TableHead>위치</TableHead>
                      <TableHead>사이즈</TableHead>
                      <TableHead>기간</TableHead>
                      <TableHead>클릭수</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {BANNER_ROWS.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Checkbox aria-label={`${row.name} 선택`} />
                        </TableCell>
                        <TableCell className="text-left">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={cn(
                                'flex size-12 shrink-0 items-center justify-center rounded border bg-gradient-to-br text-sm',
                                row.thumbClass,
                              )}
                            >
                              {row.emoji}
                            </div>
                            <div className="min-w-0">
                              <div
                                className={cn('truncate font-medium', row.dimmed && 'opacity-50')}
                              >
                                {row.name}
                              </div>
                              <div className="text-[11px] text-muted-foreground">{row.file}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{row.place}</Badge>
                        </TableCell>
                        <TableCell className="font-mono text-[11.5px]">{row.size}</TableCell>
                        <TableCell className="font-mono text-xs">{row.period}</TableCell>
                        <TableCell
                          className={cn(
                            'font-mono',
                            row.clicksDim && 'text-muted-foreground opacity-40',
                          )}
                        >
                          {row.clicks}
                        </TableCell>
                        <TableCell
                          className={cn(
                            'font-mono text-xs',
                            row.ctrClass,
                            row.clicksDim && 'opacity-40',
                          )}
                        >
                          {row.ctr}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={rowOn[row.id] ?? false}
                            onCheckedChange={(v) => flipRow(row.id, v)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button aria-label="편집" size="icon" type="button" variant="ghost">
                              <PencilIcon className="size-4" />
                            </Button>
                            <Button aria-label="복제" size="icon" type="button" variant="ghost">
                              <CopyIcon className="size-4" />
                            </Button>
                            <Button
                              aria-label="삭제"
                              className="text-destructive hover:text-destructive"
                              size="icon"
                              type="button"
                              variant="ghost"
                            >
                              <Trash2Icon className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          <div className="flex flex-wrap items-center gap-4">
            <Pagination className="mx-0 w-auto justify-start">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink isActive href="#">
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <span className="text-muted-foreground text-sm">총 9개 배너</span>
          </div>
        </div>

        <Card className="w-full shrink-0 xl:sticky xl:top-4 xl:w-[360px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
            <CardTitle className="text-base">✏️ 뉴스 사이드바 편집</CardTitle>
            <Button size="sm" type="button" variant="outline">
              새 배너
            </Button>
          </CardHeader>
          <CardContent className="space-y-3.5 pt-6">
            <div className="space-y-2">
              <Label htmlFor="bf-title">배너명 (내부용)</Label>
              <Input defaultValue="10월 이벤트 배너" id="bf-title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bf-loc">노출 위치</Label>
              <Select defaultValue="main-top">
                <SelectTrigger className="w-full" id="bf-loc" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main-top">메인 상단 (GNB 하단)</SelectItem>
                  <SelectItem value="hero">메인 히어로 슬라이더</SelectItem>
                  <SelectItem value="service">서비스 페이지 CTA</SelectItem>
                  <SelectItem value="news">뉴스 사이드바</SelectItem>
                  <SelectItem value="footer">푸터</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>배너 이미지</Label>
              <div className="cursor-pointer rounded-lg border-2 border-dashed px-3 py-4 text-center text-xs text-muted-foreground transition-colors hover:border-primary">
                🖼 banner_oct.jpg · 728×90px
                <br />
                <span className="text-[11px]">클릭하여 교체</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bf-url">클릭 링크 URL</Label>
              <Input
                className="font-mono text-[12.5px]"
                defaultValue="/events/oct2024"
                id="bf-url"
              />
            </div>
            <div className="space-y-2">
              <Label>링크 열기 방식</Label>
              <ToggleGroup
                className="w-full"
                type="single"
                value={linkTarget}
                variant="outline"
                onValueChange={(v) => v && setLinkTarget(v)}
              >
                <ToggleGroupItem className="flex-1 text-xs" value="same">
                  현재 창
                </ToggleGroupItem>
                <ToggleGroupItem className="flex-1 text-xs" value="blank">
                  새 창
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="bf-start">시작일</Label>
                <Input defaultValue="2024-10-01" id="bf-start" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bf-end">종료일</Label>
                <Input defaultValue="2024-10-31" id="bf-end" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bf-alt">alt 텍스트 (접근성)</Label>
              <Input defaultValue="2024년 10월 이벤트 안내 배너" id="bf-alt" />
            </div>
            <div className="rounded-lg border bg-muted/40 p-3">
              <div className="mb-2 text-xs text-muted-foreground">📊 성과 요약</div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <span className="text-muted-foreground">노출수</span>
                <span className="text-right font-mono">49,810</span>
                <span className="text-muted-foreground">클릭수</span>
                <span className="text-right font-mono">2,104</span>
                <span className="text-muted-foreground">CTR</span>
                <span className="text-right font-mono text-emerald-600 dark:text-emerald-400">
                  4.22%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-md border bg-muted/40 px-3 py-2.5">
              <Switch checked={bannerOn} id="bf-on" onCheckedChange={setBannerOn} />
              <Label className="text-muted-foreground text-sm" htmlFor="bf-on">
                배너 ON / OFF
              </Label>
            </div>
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
