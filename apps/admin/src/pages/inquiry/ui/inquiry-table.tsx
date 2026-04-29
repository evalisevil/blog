'use client'

import { type Inquiry, type InquiryStatus } from '@prisma/client'
import { Eye, Loader } from 'lucide-react'
import React, { useState } from 'react'

import { useChangeInquiryStatus } from '@/features/inquiry'
import { usePageSize } from '@/shared/model'
import { type InquiryModalType } from '@/shared/types'
import { StatusBadge } from '@/shared/ui'
import {
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/shared/ui/shadcn/dropdown-menu'
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
  TableCellStatusIndicator,
  TableCellText,
  TableEmptyData,
  TableModalTrigger,
  TablePageSizeSelect,
  TablePaginationNav,
} from '@/shared/ui/table'
import { ReadInquiryModal } from '@/widgets/header'

import { getStatusLabel, getStatusVariant } from '../lib/get-inquiry-status'
import { DeleteInquiryModal } from './delete-inquiry-modal'
import { TableSorter } from './table-sorter'

export const InquiryTable = ({ inquiryData }: { inquiryData: Inquiry[] }) => {
  const [sortedData, setSortedData] = useState<Inquiry[]>(inquiryData)
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [openDialogs, setOpenDialogs] = useState<Record<InquiryModalType, boolean>>({
    read: false,
    delete: false,
  })
  const { pageSize, setPageSize, page, setPage, paginatedRows } = usePageSize(sortedData)

  /** 문의 상태 변경 */
  const { changeInquiryStatus } = useChangeInquiryStatus()

  /** 정렬 데이터 처리 */
  const handleSortedData = (data: Inquiry[]) => {
    setSortedData(data)
    setPage((current) => {
      const maxPage = Math.max(1, Math.ceil(data.length / pageSize))
      return Math.min(Math.max(1, current), maxPage)
    })
  }

  /** 모달 열기 */
  const openDialog = (dialogId: InquiryModalType, inquiryId?: string) => {
    if (inquiryId) {
      setSelectedInquiry(sortedData.find((inquiry) => inquiry.id === inquiryId) ?? null)
    }
    setOpenDialogs((prev) => ({ ...prev, [dialogId]: true }))
  }

  /** 모달 닫기 */
  const closeDialog = (dialogId: InquiryModalType) => {
    setOpenDialogs((prev) => ({ ...prev, [dialogId]: false }))
  }

  return (
    <>
      {/* 정렬 및 필터 컴포넌트 */}
      <TableSorter inquiryData={inquiryData} onSortChange={handleSortedData} />

      {/* 페이지 사이즈 선택 컴포넌트 */}
      <TablePageSizeSelect
        page={page}
        pageSize={pageSize}
        totalItems={sortedData.length}
        onPageSizeChange={(next) => {
          setPageSize(next)
          setPage(1)
        }}
      />

      {/* 테이블 컴포넌트 */}
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>상태</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>접수 시간</TableHead>
              <TableHead>관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!sortedData || sortedData.length === 0 ? (
              <TableEmptyData colSpan={6} />
            ) : (
              paginatedRows.map((column) => (
                <React.Fragment key={column.id}>
                  <TableRow>
                    <TableCellStatusIndicator
                      label={getStatusLabel(column.status)}
                      variant={getStatusVariant(column.status)}
                    />
                    <TableCellText text={column.name} />
                    <TableCellText text={column.email} />
                    <TableCellText text={column.subject} />
                    <TableCellDate withTime date={column.received} />
                    <TableCellActionDropdown onDelete={openDialog.bind(null, 'delete', column.id)}>
                      <TableModalTrigger
                        icon={Eye}
                        label="문의 읽기"
                        variant="default"
                        onOpen={() => {
                          openDialog('read', column.id)
                          if (column.status === 'unread') {
                            changeInquiryStatus({ inquiryId: column.id, status: 'read' })
                          }
                        }}
                      />
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="gap-2">
                          <Loader className="size-4" />
                          상태 변경
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuRadioGroup
                              value={column.status}
                              onValueChange={(value) => {
                                changeInquiryStatus({
                                  inquiryId: column.id,
                                  status: value as InquiryStatus,
                                })
                              }}
                            >
                              <DropdownMenuRadioItem value="unread">
                                <StatusBadge label="읽지 않음" variant="error" />
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="read">
                                <StatusBadge label="읽음" variant="success" />
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </TableCellActionDropdown>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이지 네비게이션 컴포넌트 */}
      <TablePaginationNav
        page={page}
        pageSize={pageSize}
        totalItems={sortedData.length}
        onPageChange={setPage}
      />

      {/* 문의 읽기 모달 */}
      <ReadInquiryModal
        closeDialog={closeDialog}
        inquiry={selectedInquiry}
        open={openDialogs['read']}
      />

      {/* 문의 삭제 모달 */}
      <DeleteInquiryModal
        closeDialog={closeDialog}
        inquiry={selectedInquiry}
        open={openDialogs['delete']}
      />
    </>
  )
}
