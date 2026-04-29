'use client'

import type { Inquiry } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'

import {
  applyFiltersAndSort,
  type PeriodFilterValueType,
  type SortValueType,
  type StatusFilterValueType,
} from '@/pages/inquiry/lib/inquiry-table-filter'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/select'

export const TableSorter = ({
  inquiryData,
  onSortChange,
}: {
  inquiryData: Inquiry[]
  onSortChange: (sortedData: Inquiry[]) => void
}) => {
  const [status, setStatus] = useState<StatusFilterValueType>('all-status')
  const [period, setPeriod] = useState<PeriodFilterValueType>('all-period')
  const [sort, setSort] = useState<SortValueType>('received-desc')

  const processed = useMemo(
    () => applyFiltersAndSort(inquiryData, status, period, sort),
    [inquiryData, period, sort, status],
  )

  useEffect(() => {
    onSortChange(processed)
  }, [onSortChange, processed])

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Select
        value={status}
        onValueChange={(value) => {
          setStatus(value as StatusFilterValueType)
        }}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder="상태" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-status">전체 상태</SelectItem>
          <SelectItem value="unread">읽지 않음</SelectItem>
          <SelectItem value="read">읽음</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={period}
        onValueChange={(value) => {
          setPeriod(value as PeriodFilterValueType)
        }}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder="기간" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-period">전체 기간</SelectItem>
          <SelectItem value="today">오늘</SelectItem>
          <SelectItem value="week">이번 주</SelectItem>
          <SelectItem value="month">이번 달</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={sort}
        onValueChange={(value) => {
          setSort(value as SortValueType)
        }}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder="정렬" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="received-desc">최신 접수순</SelectItem>
          <SelectItem value="received-asc">오래된 접수순</SelectItem>
          <SelectItem value="name-asc">이름 (가나다)</SelectItem>
          <SelectItem value="name-desc">이름 (역순)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
