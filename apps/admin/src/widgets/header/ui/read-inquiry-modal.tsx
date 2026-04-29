'use client'

import type { Inquiry } from '@prisma/client'
import { formatDate } from 'date-fns'

import { type InquiryModalType } from '@/shared/types'
import { Button } from '@/shared/ui/shadcn/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'
import { ScrollArea } from '@/shared/ui/shadcn/scroll-area'

export const ReadInquiryModal = ({
  inquiry,
  open,
  closeDialog,
}: {
  inquiry: Inquiry | null
  open: boolean
  closeDialog: (dialogId: InquiryModalType) => void
}) => {
  if (!inquiry) return null

  return (
    <Dialog open={open} onOpenChange={closeDialog.bind(null, 'read')}>
      <DialogContent className="max-h-[min(90vh,720px)] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-balance pr-8">{inquiry.subject}</DialogTitle>
        </DialogHeader>

        <dl className="grid gap-3 text-sm sm:grid-cols-[minmax(0,5em)_1fr] sm:gap-x-4 sm:gap-y-2">
          <dt className="text-muted-foreground font-medium">발신인</dt>
          <dd className="min-w-0 break-words">{inquiry.name}</dd>
          <dt className="text-muted-foreground font-medium">이메일</dt>
          <dd className="min-w-0 break-all">
            <a className="text-blue-500 hover:underline" href={`mailto:${inquiry.email}`}>
              {inquiry.email}
            </a>
          </dd>
          <dt className="text-muted-foreground font-medium">전화</dt>
          <dd className="min-w-0 break-words">{inquiry.phone}</dd>
          <dt className="text-muted-foreground font-medium">접수 시간</dt>
          <dd className="min-w-0 break-words">
            {formatDate(inquiry.received, 'yyyy.MM.dd HH:mm')}
          </dd>
        </dl>

        <div className="space-y-2">
          <ScrollArea className="h-[min(40vh,320px)] rounded-md border">
            <div className="p-4">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{inquiry.content}</p>
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
