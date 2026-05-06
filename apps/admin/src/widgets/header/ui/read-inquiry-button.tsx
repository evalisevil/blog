'use client'

import { type Inquiry } from '@prisma/client'
import { IoMailUnreadOutline } from 'react-icons/io5'

import { getRelativeDate } from '@/shared/lib'
import { Button } from '@/shared/ui/shadcn/button'

export const ReadInquiryButton = ({
  inquiry,
  onOpenModal,
}: {
  inquiry: Inquiry
  onOpenModal: () => void
}) => {
  return (
    <Button
      key={inquiry.id}
      className="flex items-start gap-3 rounded-lg border border-slate-200 bg-card p-3 transition-colors hover:bg-slate-50/80 w-full h-auto text-left"
      type="button"
      variant="ghost"
      onClick={onOpenModal}
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
        <IoMailUnreadOutline className="text-primary size-5" />
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold truncate">{inquiry.name}</p>
          <p className="text-xs text-muted-foreground/70 whitespace-nowrap">
            {getRelativeDate(inquiry.received)}
          </p>
        </div>
        <p className="text-xs rounded-full bg-sky-50 w-max p-1 px-2 text-sky-700">
          {inquiry.email}
        </p>
        <p className="max-w-[90%] truncate text-sm font-semibold">{inquiry.subject}</p>
        <p className="max-w-[90%] truncate text-sm text-muted-foreground">{inquiry.content}</p>
      </div>
    </Button>
  )
}
