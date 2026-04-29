'use client'

import { Eye } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/select'

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const

export type TablePageSizeSelectPropsType = {
  page: number
  pageSize: number
  totalItems: number
  onPageSizeChange: (pageSize: number) => void
}

export const TablePageSizeSelect = ({
  page,
  pageSize,
  totalItems,
  onPageSizeChange,
}: TablePageSizeSelectPropsType) => {
  const rangeStart = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const rangeEnd = Math.min(page * pageSize, totalItems)

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <p className="text-muted-foreground text-sm tabular-nums">
        {rangeStart}–{rangeEnd} / {totalItems}건
      </p>

      <div className="flex items-center gap-2">
        <Select
          value={String(pageSize)}
          onValueChange={(value) => {
            onPageSizeChange(Number(value))
          }}
        >
          <SelectTrigger size="sm">
            <Eye className="size-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DEFAULT_PAGE_SIZE_OPTIONS.map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}건
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
