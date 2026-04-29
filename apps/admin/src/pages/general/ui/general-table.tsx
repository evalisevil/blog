'use client'

import type { General } from '@prisma/client'
import { Eye, EyeOff, SquarePen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import { TOAST_MESSAGES } from '@/shared/config'
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/shadcn/table'
import {
  TableCellActionDropdown,
  TableCellDate,
  TableCellNumberText,
  TableCellOrderButtons,
  TableCellStatusIndicator,
  TableCellText,
  TableCellTitle,
  TableEmptyData,
  TableModalTrigger,
  TablePageSizeSelect,
  TablePaginationNav,
} from '@/shared/ui/table'

import { DeleteGeneralModal } from './modals/delete-general-modal'

export const GeneralTable = ({ generaBoardData = [] }: { generaBoardData: General[] }) => {
  const router = useRouter()
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [reorderingId, setReorderingId] = useState<string | null>(null)
  const [togglingVisibilityId, setTogglingVisibilityId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<General | null>(null)

  const pageForSlice = Math.min(
    Math.max(1, page),
    Math.max(1, Math.ceil(generaBoardData.length / pageSize)),
  )

  const paginatedRows = useMemo(() => {
    const start = (pageForSlice - 1) * pageSize
    return generaBoardData.slice(start, start + pageSize)
  }, [pageForSlice, pageSize, generaBoardData])

  const changeOrder = async (id: string, direction: 'up' | 'down') => {
    if (reorderingId) return
    setReorderingId(id)
    const res = await fetch(`/api/general/${id}/reorder`, {
      body: JSON.stringify({ direction }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    })
    const payload = (await res.json().catch(() => ({}))) as { error?: string }

    setReorderingId(null)

    if (!res.ok) {
      toast.error(payload.error ?? TOAST_MESSAGES.ERROR.ORDER)
      return
    }

    toast.success(TOAST_MESSAGES.SUCCESS.ORDER)
    router.refresh()
  }

  const toggleVisibility = async (row: General) => {
    if (togglingVisibilityId !== null) return
    setTogglingVisibilityId(row.id)
    const res = await fetch(`/api/general/${row.id}`, {
      body: JSON.stringify({ isVisible: !row.isVisible }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    })
    const payload = (await res.json().catch(() => ({}))) as { error?: string }

    setTogglingVisibilityId(null)

    if (!res.ok) {
      toast.error(payload.error ?? TOAST_MESSAGES.ERROR.UPDATE)
      return
    }

    toast.success(TOAST_MESSAGES.SUCCESS.STATUS)
    router.refresh()
  }

  const openDelete = (id: string) => {
    setDeleteTarget(generaBoardData.find((row) => row.id === id) ?? null)
  }

  const handleDeleteOpenChange = (next: boolean) => {
    if (next) return
    setDeleteTarget(null)
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>번호</TableHead>
              <TableHead>순서</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>작성자</TableHead>
              <TableHead>작성일</TableHead>
              <TableHead>관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {generaBoardData.length === 0 ? (
              <TableEmptyData colSpan={7} />
            ) : (
              paginatedRows.map((column) => {
                const indexInSorted = generaBoardData.findIndex((row) => row.id === column.id)
                const disableUp = indexInSorted <= 0
                const disableDown = indexInSorted < 0 || indexInSorted >= generaBoardData.length - 1
                const reorderBusy = reorderingId !== null
                const visibilityBusy = togglingVisibilityId !== null

                return (
                  <TableRow key={column.id}>
                    <TableCellNumberText
                      text={(generaBoardData.length + 1 - column.order).toString()}
                    />
                    <TableCellOrderButtons
                      disableOrderDown={disableDown || reorderBusy}
                      disableOrderUp={disableUp || reorderBusy}
                      onOrderChangeDown={() => {
                        void changeOrder(column.id, 'down')
                      }}
                      onOrderChangeUp={() => {
                        void changeOrder(column.id, 'up')
                      }}
                    />
                    <TableCellStatusIndicator
                      label={column.isVisible ? '활성' : '비활성'}
                      variant={column.isVisible ? 'success' : 'error'}
                    />
                    <TableCellTitle title={column.title} />
                    <TableCellText text={column.writer} />
                    <TableCellDate relativeDate date={column.createdAt} />

                    <TableCellActionDropdown onDelete={() => openDelete(column.id)}>
                      <TableModalTrigger
                        disabled={visibilityBusy}
                        icon={column.isVisible ? EyeOff : Eye}
                        label={column.isVisible ? '비활성화' : '활성화'}
                        onOpen={() => {
                          void toggleVisibility(column)
                        }}
                      />
                      <TableModalTrigger icon={SquarePen} label="수정" onOpen={() => {}} />
                    </TableCellActionDropdown>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {generaBoardData.length > 0 ? (
        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <TablePageSizeSelect
            page={pageForSlice}
            pageSize={pageSize}
            totalItems={generaBoardData.length}
            onPageSizeChange={(next) => {
              setPageSize(next)
              setPage(1)
            }}
          />
          <TablePaginationNav
            page={pageForSlice}
            pageSize={pageSize}
            totalItems={generaBoardData.length}
            onPageChange={setPage}
          />
        </div>
      ) : null}

      <DeleteGeneralModal
        general={deleteTarget}
        open={deleteTarget !== null}
        onOpenChange={handleDeleteOpenChange}
      />
    </>
  )
}
