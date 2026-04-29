import type { Inquiry } from '@prisma/client'
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns'

export type StatusFilterValueType = 'all-status' | Inquiry['status']

export type PeriodFilterValueType = 'all-period' | 'today' | 'week' | 'month'

export type SortValueType = 'received-desc' | 'received-asc' | 'name-asc' | 'name-desc'

/** `referenceDate`가 속한 달·주·일 기준으로 기간 필터 (행의 날짜가 아님) */
export const filterInquiryByPeriod = (
  row: Inquiry,
  period: PeriodFilterValueType,
  referenceDate: Date,
): boolean => {
  if (period === 'all-period') return true
  const d = new Date(row.received)
  if (period === 'today') {
    return isWithinInterval(d, {
      end: endOfDay(referenceDate),
      start: startOfDay(referenceDate),
    })
  }
  if (period === 'week') {
    return isWithinInterval(d, {
      end: endOfWeek(referenceDate, { weekStartsOn: 1 }),
      start: startOfWeek(referenceDate, { weekStartsOn: 1 }),
    })
  }
  if (period === 'month') {
    return isWithinInterval(d, {
      end: endOfMonth(referenceDate),
      start: startOfMonth(referenceDate),
    })
  }
  return true
}

const compareInquiryRows = (a: Inquiry, b: Inquiry, sort: SortValueType): number => {
  if (sort === 'received-desc' || sort === 'received-asc') {
    const t = new Date(a.received).getTime() - new Date(b.received).getTime()
    return sort === 'received-desc' ? -t : t
  }
  const cmp = a.name.localeCompare(b.name, 'ko')
  return sort === 'name-desc' ? -cmp : cmp
}

export const applyFiltersAndSort = (
  rows: Inquiry[],
  status: StatusFilterValueType,
  period: PeriodFilterValueType,
  sort: SortValueType,
  referenceDate: Date = new Date(),
): Inquiry[] => {
  let next = rows.filter((row) => filterInquiryByPeriod(row, period, referenceDate))
  if (status !== 'all-status') {
    next = next.filter((row) => row.status === status)
  }
  return [...next].sort((a, b) => compareInquiryRows(a, b, sort))
}
