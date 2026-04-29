'use client'

import { isSameDay } from 'date-fns'
import { ko } from 'date-fns/locale'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/lib'
import { DashboardPageShell } from '@/shared/ui/dashboard-page-shell'
import { Badge } from '@/shared/ui/shadcn/badge'
import { Button } from '@/shared/ui/shadcn/button'
import { Calendar } from '@/shared/ui/shadcn/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card'
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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/shadcn/table'
import { Textarea } from '@/shared/ui/shadcn/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/shadcn/toggle-group'

const EVENT_DAYS = [
  new Date(2024, 9, 3),
  new Date(2024, 9, 8),
  new Date(2024, 9, 15),
  new Date(2024, 9, 16),
  new Date(2024, 9, 17),
  new Date(2024, 9, 20),
  new Date(2024, 9, 24),
  new Date(2024, 9, 31),
]

const LEGEND = [
  { label: '외부 행사', className: 'bg-[#4f7cff]/50' },
  { label: '사내 일정', className: 'bg-[#00e5a0]/40' },
  { label: '채용', className: 'bg-[#ffb547]/40' },
  { label: '홍보·PR', className: 'bg-[#7c5cfc]/40' },
  { label: '마감', className: 'bg-[#ff4f6a]/40' },
] as const

const EVENT_BADGE: Record<string, string> = {
  external: 'border-[#4f7cff]/40 bg-[#4f7cff]/15 text-[#3b5cdb]',
  recruit: 'border-[#ffb547]/40 bg-[#ffb547]/15 text-[#b45309]',
  internal: 'border-[#00e5a0]/40 bg-[#00e5a0]/15 text-[#0d7d5c]',
  pr: 'border-[#7c5cfc]/40 bg-[#7c5cfc]/15 text-[#5b21b6]',
  deadline: 'border-[#ff4f6a]/40 bg-[#ff4f6a]/15 text-[#be123c]',
}

const TABLE_ROWS = [
  {
    kind: 'external' as const,
    kindLabel: '외부 행사',
    title: '2024 Korea IT Expo 참가',
    date: '10/15 ~ 10/17',
    place: 'COEX 홀 A',
    webOn: true,
    owner: '김관리자',
  },
  {
    kind: 'recruit' as const,
    kindLabel: '채용',
    title: '하반기 공개채용 서류 마감',
    date: '10/20',
    place: '채용 페이지',
    webOn: true,
    owner: '인사팀',
  },
  {
    kind: 'internal' as const,
    kindLabel: '사내 일정',
    title: '2024 창립 기념일 행사',
    date: '10/03',
    place: '본사 강당',
    webOn: false,
    owner: '경영지원팀',
  },
  {
    kind: 'pr' as const,
    kindLabel: '홍보·PR',
    title: '시리즈 B 보도자료 배포',
    date: '10/08',
    place: 'PR 에이전시',
    webOn: true,
    owner: '마케팅팀',
  },
  {
    kind: 'deadline' as const,
    kindLabel: '마감',
    title: 'Q3 실적 보고서 제출',
    date: '10/31',
    place: '내부',
    webOn: false,
    owner: '재무팀',
  },
]

const UPCOMING = [
  { dot: '#4f7cff', name: '창립 기념일 행사', meta: '10/03 (목) · 사내 일정' },
  { dot: '#7c5cfc', name: '시리즈 B 보도자료 배포', meta: '10/08 (화) · 홍보·PR' },
  { dot: '#4f7cff', name: 'Korea IT Expo 참가', meta: '10/15 ~ 17 · 외부 행사' },
  { dot: '#ffb547', name: '하반기 공채 서류 마감', meta: '10/20 (일) · 채용' },
  { dot: '#ff4f6a', name: 'Q3 실적 보고서 제출', meta: '10/31 (목) · 마감' },
]

const COLOR_OPTIONS = [
  { value: '#4f7cff', label: '파랑' },
  { value: '#00e5a0', label: '초록' },
  { value: '#ffb547', label: '노랑' },
  { value: '#7c5cfc', label: '보라' },
  { value: '#ff4f6a', label: '빨강' },
  { value: '#8892b0', label: '회색' },
]

export const CalendarPage = () => {
  const [month, setMonth] = React.useState(() => new Date(2024, 9, 1))
  const [selected, setSelected] = React.useState<Date | undefined>(() => new Date(2024, 9, 15))
  const [calView, setCalView] = React.useState('month')
  const [eventColor, setEventColor] = React.useState(COLOR_OPTIONS[0]?.value ?? '#4f7cff')
  const [repeat, setRepeat] = React.useState('none')
  const [webPublic, setWebPublic] = React.useState(true)
  const [rowStates, setRowStates] = React.useState(() => TABLE_ROWS.map((r) => r.webOn))

  const setRowToggle = (index: number, v: boolean) => {
    setRowStates((prev) => {
      const next = [...prev]
      next[index] = v
      return next
    })
  }

  const goToday = () => {
    const t = new Date()
    setMonth(t)
    setSelected(t)
  }

  return (
    <DashboardPageShell title="캘린더">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <div className="min-w-0 flex-1 space-y-6">
          <Card>
            <CardHeader className="flex flex-col gap-4 border-b py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11.5px] text-muted-foreground">
                  {LEGEND.map((item) => (
                    <span key={item.label} className="flex items-center gap-1.5">
                      <span className={cn('size-2 shrink-0 rounded-sm', item.className)} />
                      {item.label}
                    </span>
                  ))}
                </div>
                <ToggleGroup
                  className="justify-start"
                  type="single"
                  value={calView}
                  variant="outline"
                  onValueChange={(v) => v && setCalView(v)}
                >
                  <ToggleGroupItem className="h-8 px-3 text-xs" value="month">
                    월
                  </ToggleGroupItem>
                  <ToggleGroupItem className="h-8 px-3 text-xs" value="week">
                    주
                  </ToggleGroupItem>
                  <ToggleGroupItem className="h-8 px-3 text-xs" value="day">
                    일
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-stretch pt-6 pb-6">
              <div className="mb-3 flex justify-end">
                <Button size="sm" type="button" variant="outline" onClick={goToday}>
                  오늘
                </Button>
              </div>
              <Calendar
                className="mx-auto rounded-lg border shadow-xs"
                locale={ko}
                mode="single"
                modifiers={{
                  hasEvent: (d) => EVENT_DAYS.some((ed) => isSameDay(ed, d)),
                }}
                modifiersClassNames={{
                  hasEvent:
                    'font-semibold text-primary underline decoration-primary/40 decoration-2 underline-offset-2',
                }}
                month={month}
                selected={selected}
                onMonthChange={setMonth}
                onSelect={setSelected}
              />
            </CardContent>
          </Card>

          <Card className="gap-0 overflow-hidden py-0">
            <CardHeader className="flex flex-col gap-3 border-b py-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <span aria-hidden className="size-2 rounded-full bg-primary" />
                2024년 10월 전체 일정 목록
              </CardTitle>
              <Select defaultValue="all-types">
                <SelectTrigger className="w-[140px]" size="sm">
                  <SelectValue placeholder="유형" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">전체 유형</SelectItem>
                  <SelectItem value="external">외부 행사</SelectItem>
                  <SelectItem value="internal">사내 일정</SelectItem>
                  <SelectItem value="recruit">채용</SelectItem>
                  <SelectItem value="pr">홍보·PR</SelectItem>
                  <SelectItem value="deadline">마감</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="px-0 pb-0 pt-0">
              <TableContainer>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>유형</TableHead>
                      <TableHead className="text-left">제목</TableHead>
                      <TableHead>날짜</TableHead>
                      <TableHead className="text-left">장소/채널</TableHead>
                      <TableHead>웹사이트 노출</TableHead>
                      <TableHead className="text-left">담당자</TableHead>
                      <TableHead>관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TABLE_ROWS.map((row, i) => (
                      <TableRow key={row.title}>
                        <TableCell>
                          <Badge
                            className={cn('text-[11px] font-normal', EVENT_BADGE[row.kind] ?? '')}
                            variant="outline"
                          >
                            {row.kindLabel}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-left font-medium">
                          {row.title}
                        </TableCell>
                        <TableCell className="font-mono text-xs">{row.date}</TableCell>
                        <TableCell className="max-w-[140px] truncate text-left text-muted-foreground">
                          {row.place}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={rowStates[i]}
                            onCheckedChange={(v) => {
                              setRowToggle(i, v)
                            }}
                          />
                        </TableCell>
                        <TableCell className="text-left text-sm text-primary">
                          {row.owner}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-4 xl:w-[360px]">
          <Card className="gap-0 overflow-hidden py-0">
            <CardHeader className="border-b py-4">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <span aria-hidden className="size-2 rounded-full bg-primary" />새 일정 추가
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-5 pb-5">
              <div className="space-y-2">
                <Label htmlFor="evt-title">
                  제목 <span className="text-destructive">*</span>
                </Label>
                <Input id="evt-title" placeholder="일정 제목 입력" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="evt-start">시작일</Label>
                  <Input defaultValue="2024-10-15" id="evt-start" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evt-end">종료일</Label>
                  <Input defaultValue="2024-10-15" id="evt-end" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="evt-type">유형</Label>
                <Select defaultValue="external">
                  <SelectTrigger className="w-full" id="evt-type" size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="external">외부 행사</SelectItem>
                    <SelectItem value="internal">사내 일정</SelectItem>
                    <SelectItem value="recruit">채용</SelectItem>
                    <SelectItem value="pr">홍보·PR</SelectItem>
                    <SelectItem value="deadline">마감</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="evt-place">장소 / 채널</Label>
                <Input id="evt-place" placeholder="예: COEX 홀 A, 온라인" />
              </div>
              <div className="space-y-2">
                <Label>색상</Label>
                <ToggleGroup
                  className="flex flex-wrap justify-start gap-2"
                  type="single"
                  value={eventColor}
                  onValueChange={(v) => v && setEventColor(v)}
                >
                  {COLOR_OPTIONS.map((c) => (
                    <ToggleGroupItem
                      key={c.value}
                      aria-label={c.label}
                      className="size-8 rounded-full border-0 p-0 data-[state=on]:ring-2 data-[state=on]:ring-ring data-[state=on]:ring-offset-2"
                      style={{ backgroundColor: c.value }}
                      value={c.value}
                    />
                  ))}
                </ToggleGroup>
              </div>
              <div className="space-y-2">
                <Label>반복</Label>
                <ToggleGroup
                  className="flex flex-wrap justify-start gap-1"
                  type="single"
                  value={repeat}
                  variant="outline"
                  onValueChange={(v) => v && setRepeat(v)}
                >
                  <ToggleGroupItem className="h-8 px-3 text-xs" value="none">
                    없음
                  </ToggleGroupItem>
                  <ToggleGroupItem className="h-8 px-3 text-xs" value="weekly">
                    매주
                  </ToggleGroupItem>
                  <ToggleGroupItem className="h-8 px-3 text-xs" value="monthly">
                    매월
                  </ToggleGroupItem>
                  <ToggleGroupItem className="h-8 px-3 text-xs" value="yearly">
                    매년
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="space-y-2">
                <Label>웹사이트 공개 여부</Label>
                <div className="flex items-center gap-3 rounded-md border bg-muted/40 px-3 py-2">
                  <Switch checked={webPublic} id="evt-web" onCheckedChange={setWebPublic} />
                  <Label className="text-muted-foreground text-sm font-normal" htmlFor="evt-web">
                    웹사이트 이벤트 페이지에 노출
                  </Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="evt-note">메모</Label>
                <Textarea id="evt-note" placeholder="내부 메모 (비공개)" rows={2} />
              </div>
              <Button
                className="w-full"
                type="button"
                onClick={() => {
                  window.alert('일정이 추가되었습니다!')
                }}
              >
                일정 저장
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <span aria-hidden className="size-2 rounded-full bg-violet-500" />
                이번 달 주요 일정
              </CardTitle>
              <span className="font-mono text-[11px] text-muted-foreground">5건</span>
            </CardHeader>
            <CardContent className="space-y-3 pt-2">
              {UPCOMING.map((item) => (
                <div
                  key={item.name}
                  className="flex gap-3 rounded-md border border-transparent px-1 py-1 transition-colors hover:bg-muted/50"
                >
                  <div
                    className="mt-1 size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.dot }}
                  />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.meta}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageShell>
  )
}
