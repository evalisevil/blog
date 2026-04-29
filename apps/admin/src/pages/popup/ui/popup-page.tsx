'use client'

import { ChevronDownIcon, CopyIcon, EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react'
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
import { Switch } from '@/shared/ui/shadcn/switch'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/shadcn/toggle-group'

const ACTIVE_POPUPS = [
  {
    id: '1',
    title: '2024 하반기 채용 안내 팝업',
    status: 'live' as const,
    emoji: '🎉',
    size: '550×400',
    stripBg: 'bg-primary',
    cardBorder: 'border-primary',
    meta: [
      { t: '📍 메인 페이지' },
      { t: '📅 10/01 ~ 11/30' },
      { t: '🖱 클릭수 ', b: '1,204' },
      { t: '🔁 하루 1회' },
      { t: '📐 중앙 팝업' },
      { t: '👁 노출수 ', b: '8,840' },
    ],
    thumbClass: 'from-[#4f7cff22] to-[#7c5cfc33]',
  },
  {
    id: '2',
    title: '2024 혁신기업 대상 수상 기념',
    status: 'live' as const,
    emoji: '🏆',
    size: '600×300',
    stripBg: 'bg-emerald-500',
    cardBorder: 'border-emerald-500',
    meta: [
      { t: '📍 전체 페이지' },
      { t: '📅 09/23 ~ 10/31' },
      { t: '🖱 클릭수 ', b: '3,120' },
      { t: '🔁 세션당 1회' },
      { t: '📐 하단 슬라이드' },
      { t: '👁 노출수 ', b: '21,500' },
    ],
    thumbClass: 'from-[#00e5a022] to-[#4f7cff22]',
    sizeBadgeClass: 'bg-emerald-500 text-[#0d0f14]',
  },
  {
    id: '3',
    title: '2024 연말 이벤트 안내',
    status: 'scheduled' as const,
    emoji: '🎄',
    size: '550×400',
    stripBg: 'bg-violet-500',
    cardBorder: 'border-border',
    meta: [
      { t: '📍 메인 페이지' },
      { t: '📅 12/01 ~ 12/31' },
      { t: '⏰ D-52 후 시작' },
      { t: '🔁 하루 1회' },
      { t: '📐 중앙 팝업' },
      { t: '👁 노출 예정' },
    ],
    thumbClass: 'from-[#7c5cfc22] to-[#4f7cff22]',
  },
] as const

const EXPIRED_POPUPS = [
  { emoji: '🎑', title: '추석 연휴 고객지원 안내', range: '09/14 ~ 09/18 · 메인 페이지' },
  { emoji: '🌸', title: '상반기 인턴십 모집', range: '03/01 ~ 04/15 · 전체 페이지' },
  { emoji: '🎊', title: '창립 12주년 기념', range: '03/01 ~ 03/31 · 메인 페이지' },
] as const

export const PopupPage = () => {
  const [popupOn, setPopupOn] = React.useState<Record<string, boolean>>({
    '1': true,
    '2': true,
    '3': false,
  })
  const [exposeNow, setExposeNow] = React.useState(true)
  const [popupStyle, setPopupStyle] = React.useState('center')

  const setOn = (id: string, v: boolean) => {
    setPopupOn((prev) => ({ ...prev, [id]: v }))
  }

  return (
    <DashboardPageShell title="팝업 관리">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 팝업</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums text-primary">6</CardTitle>
            <p className="text-xs text-muted-foreground">등록된 팝업 총계</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>노출 중</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
              2
            </CardTitle>
            <p className="text-xs text-muted-foreground">현재 ON 상태</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>노출 종료</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums text-amber-600 dark:text-amber-400">
              3
            </CardTitle>
            <p className="text-xs text-muted-foreground">기간 만료</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>예약 대기</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums text-violet-600 dark:text-violet-400">
              1
            </CardTitle>
            <p className="text-xs text-muted-foreground">노출 예정</p>
          </CardHeader>
        </Card>
      </div>

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <span aria-hidden className="size-2 rounded-full bg-primary" />
              팝업 목록
            </h2>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all-status">
                <SelectTrigger className="w-[140px]" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">전체 상태</SelectItem>
                  <SelectItem value="live">노출 중</SelectItem>
                  <SelectItem value="scheduled">예약 대기</SelectItem>
                  <SelectItem value="ended">노출 종료</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-place">
                <SelectTrigger className="w-[140px]" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-place">전체 위치</SelectItem>
                  <SelectItem value="main">메인 페이지</SelectItem>
                  <SelectItem value="all-pages">전체 페이지</SelectItem>
                  <SelectItem value="specific">특정 페이지</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {ACTIVE_POPUPS.map((p) => (
              <Card key={p.id} className={cn('gap-0 overflow-hidden py-0', p.cardBorder)}>
                <CardContent className="flex p-0">
                  <div aria-hidden className={cn('w-1.5 shrink-0', p.stripBg)} />
                  <div className="min-w-0 flex-1 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <div
                        className={cn(
                          'relative flex h-[70px] w-[100px] shrink-0 items-center justify-center rounded-lg border bg-gradient-to-br text-2xl',
                          p.thumbClass,
                        )}
                      >
                        {p.emoji}
                        <span
                          className={cn(
                            'absolute right-1 bottom-1 rounded px-1 py-0 text-[9px] text-white',
                            'sizeBadgeClass' in p ? p.sizeBadgeClass : 'bg-primary',
                          )}
                        >
                          {p.size}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1.5 flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold">{p.title}</span>
                          {p.status === 'live' ? (
                            <Badge variant="default">노출 중</Badge>
                          ) : (
                            <Badge
                              className="border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300"
                              variant="outline"
                            >
                              ⏰ 예약 대기
                            </Badge>
                          )}
                        </div>
                        <div className="mb-2.5 grid grid-cols-1 gap-1.5 text-xs text-muted-foreground sm:grid-cols-3">
                          {p.meta.map((m) => (
                            <span key={`${p.id}-${m.t}`}>
                              {m.t}
                              {'b' in m && m.b ? <b className="text-foreground">{m.b}</b> : null}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Switch
                            checked={popupOn[p.id] ?? false}
                            id={`popup-on-${p.id}`}
                            onCheckedChange={(v) => {
                              setOn(p.id, v)
                            }}
                          />
                          <Label
                            className="text-muted-foreground text-xs"
                            htmlFor={`popup-on-${p.id}`}
                          >
                            노출 ON/OFF
                          </Label>
                          <div className="ml-auto flex gap-1">
                            <Button aria-label="복제" size="icon" type="button" variant="ghost">
                              <CopyIcon className="size-4" />
                            </Button>
                            <Button aria-label="미리보기" size="icon" type="button" variant="ghost">
                              <EyeIcon className="size-4" />
                            </Button>
                            <Button aria-label="편집" size="icon" type="button" variant="ghost">
                              <PencilIcon className="size-4" />
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
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Collapsible>
              <Card className="gap-0 py-0">
                <CollapsibleTrigger asChild>
                  <Button
                    className="group h-auto w-full justify-between rounded-b-none px-5 py-3.5 font-normal"
                    type="button"
                    variant="ghost"
                  >
                    <span className="text-sm text-muted-foreground">
                      종료된 팝업 <b className="text-foreground">3건</b>
                    </span>
                    <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-0 border-t p-0">
                    {EXPIRED_POPUPS.map((ex, idx) => (
                      <div
                        key={ex.title}
                        className={cn(
                          'flex items-center gap-3.5 px-5 py-3.5 opacity-70',
                          idx < EXPIRED_POPUPS.length - 1 && 'border-b',
                        )}
                      >
                        <div className="flex size-[42px] shrink-0 items-center justify-center rounded-md bg-muted text-lg">
                          {ex.emoji}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium">{ex.title}</div>
                          <div className="text-[11.5px] text-muted-foreground">{ex.range}</div>
                        </div>
                        <Badge className="shrink-0 text-[10.5px]" variant="secondary">
                          종료
                        </Badge>
                        <div className="flex gap-1">
                          <Button aria-label="복제" size="icon" type="button" variant="ghost">
                            <CopyIcon className="size-4" />
                          </Button>
                          <Button aria-label="편집" size="icon" type="button" variant="ghost">
                            <PencilIcon className="size-4" />
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
                      </div>
                    ))}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>
        </div>

        <Card className="w-full shrink-0 xl:sticky xl:top-4 xl:w-[360px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
            <CardTitle className="text-base">✏️ 팝업 편집</CardTitle>
            <Button size="sm" type="button" variant="outline">
              새 팝업
            </Button>
          </CardHeader>
          <CardContent className="space-y-3.5 pt-6">
            <div className="space-y-2">
              <Label htmlFor="pf-title">팝업 제목 (내부용)</Label>
              <Input defaultValue="2024 하반기 채용 안내 팝업" id="pf-title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-loc">노출 위치</Label>
              <Select defaultValue="main">
                <SelectTrigger className="w-full" id="pf-loc" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">메인 페이지 (/)</SelectItem>
                  <SelectItem value="all">전체 페이지</SelectItem>
                  <SelectItem value="services">서비스 페이지 (/services)</SelectItem>
                  <SelectItem value="custom">특정 URL 지정</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>팝업 스타일</Label>
              <ToggleGroup
                className="grid w-full grid-cols-2 gap-2"
                type="single"
                value={popupStyle}
                variant="outline"
                onValueChange={(v) => v && setPopupStyle(v)}
              >
                <ToggleGroupItem className="h-auto flex-col gap-1 py-2 text-xs" value="center">
                  <span className="text-lg">⬛</span>
                  중앙 팝업
                </ToggleGroupItem>
                <ToggleGroupItem className="h-auto flex-col gap-1 py-2 text-xs" value="bottom">
                  <span className="text-lg">⬇️</span>
                  하단 슬라이드
                </ToggleGroupItem>
                <ToggleGroupItem className="h-auto flex-col gap-1 py-2 text-xs" value="float">
                  <span className="text-lg">↙️</span>
                  좌하단 플로팅
                </ToggleGroupItem>
                <ToggleGroupItem className="h-auto flex-col gap-1 py-2 text-xs" value="topbar">
                  <span className="text-lg">🔔</span>
                  상단 알림바
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="pf-w">너비 (px)</Label>
                <Input defaultValue="550" id="pf-w" type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pf-h">높이 (px)</Label>
                <Input defaultValue="400" id="pf-h" type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pf-start">노출 시작</Label>
                <Input defaultValue="2024-10-01" id="pf-start" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pf-end">노출 종료</Label>
                <Input defaultValue="2024-11-30" id="pf-end" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-repeat">재노출 주기</Label>
              <Select defaultValue="daily">
                <SelectTrigger className="w-full" id="pf-repeat" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">하루 1회 (쿠키 24시간)</SelectItem>
                  <SelectItem value="session">세션당 1회</SelectItem>
                  <SelectItem value="always">매번 노출</SelectItem>
                  <SelectItem value="weekly">일주일 1회</SelectItem>
                  <SelectItem value="monthly">한 달 1회</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>팝업 이미지</Label>
              <div className="cursor-pointer rounded-lg border-2 border-dashed px-3 py-4 text-center text-xs text-muted-foreground transition-colors hover:border-primary">
                🖼 popup_recruit_2024.jpg
                <br />
                <span className="text-[11px]">550×400px · 클릭하여 교체</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-url">클릭 링크 URL</Label>
              <Input
                className="font-mono text-[12.5px]"
                defaultValue="/news/recruit-2024h2"
                id="pf-url"
              />
            </div>
            <div className="flex items-center gap-3 rounded-md border bg-muted/40 px-3 py-2.5">
              <Switch checked={exposeNow} id="pf-now" onCheckedChange={setExposeNow} />
              <Label className="text-muted-foreground text-sm" htmlFor="pf-now">
                지금 바로 노출
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
