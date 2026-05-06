'use client'

import { type Inquiry } from '@prisma/client'
import Link from 'next/link'
import { useMemo } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card'
import {
  EmptyUnreadInquiry,
  ReadInquiryButton,
  ReadInquiryModal,
  useReadInquiryModal,
} from '@/widgets/header'

export const UnreadMessage = ({
  unreadInquiryCount,
  unreadInquiryList,
}: {
  unreadInquiryCount: number
  unreadInquiryList: Inquiry[]
}) => {
  const { handleOpenModal, handleCloseModal, isModalOpen, selectedInquiry } = useReadInquiryModal()
  const hasUnreadInquiry = useMemo(() => unreadInquiryCount > 0, [unreadInquiryCount])

  return (
    <>
      <Card className="py-0 gap-0">
        <CardHeader className="flex items-center justify-between border-b border-border/60 !py-4 px-6">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold">읽지 않은 문의</CardTitle>
            {hasUnreadInquiry && (
              <span className="inline-flex min-h-6 min-w-8 items-center justify-center rounded-md bg-rose-100 px-1.5 text-xs font-medium text-rose-700">
                {unreadInquiryCount}건
              </span>
            )}
          </div>
          <Link className="text-sm text-muted-foreground hover:text-foreground" href="/inquiry">
            전체 보기
          </Link>
        </CardHeader>

        <CardContent className="p-0 h-[400px] overflow-y-auto overflow-x-hidden">
          {!hasUnreadInquiry && <EmptyUnreadInquiry />}
          {hasUnreadInquiry && (
            <div className="space-y-2 p-4">
              {unreadInquiryList.map((inquiry) => (
                <ReadInquiryButton
                  key={inquiry.id}
                  inquiry={inquiry}
                  onOpenModal={handleOpenModal.bind(null, inquiry)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ReadInquiryModal
        inquiry={selectedInquiry}
        open={isModalOpen}
        onOpenChange={handleCloseModal}
      />
    </>
  )
}
