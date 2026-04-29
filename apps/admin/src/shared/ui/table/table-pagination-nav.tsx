'use client'

import { cn } from '@/shared/lib'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/shadcn/pagination'

import { getTablePaginationSlots } from './table-pagination-slots'

export type TablePaginationNavPropsType = {
  page: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

export const TablePaginationNav = ({
  page,
  totalItems,
  pageSize,
  onPageChange,
}: TablePaginationNavPropsType) => {
  if (totalItems <= 0) return null

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const slots = getTablePaginationSlots(totalPages, page)

  return (
    <Pagination className="mx-0 w-auto justify-center">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={page <= 1}
            className={cn(page <= 1 && 'pointer-events-none opacity-50')}
            href="#"
            onClick={(event) => {
              event.preventDefault()
              if (page <= 1) return
              onPageChange(page - 1)
            }}
          />
        </PaginationItem>
        {slots.map((slot, slotIndex, slotsArr) =>
          slot === 'ellipsis' ? (
            <PaginationItem
              key={`ellipsis-${String(slotsArr[slotIndex - 1])}-${String(slotsArr[slotIndex + 1])}`}
            >
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={slot}>
              <PaginationLink
                aria-current={page === slot ? 'page' : undefined}
                href="#"
                isActive={page === slot}
                onClick={(event) => {
                  event.preventDefault()
                  onPageChange(slot)
                }}
              >
                {slot}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            aria-disabled={page >= totalPages}
            className={cn(page >= totalPages && 'pointer-events-none opacity-50')}
            href="#"
            onClick={(event) => {
              event.preventDefault()
              if (page >= totalPages) return
              onPageChange(page + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
