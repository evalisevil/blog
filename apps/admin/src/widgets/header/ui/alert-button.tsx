'use client'

import { type Inquiry } from '@prisma/client'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { BellIcon, MailCheck } from 'lucide-react'
import { useReducer, useState } from 'react'

import { useChangeInquiryStatus } from '@/features/inquiry'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui/shadcn/button'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown-menu'

import { ReadInquiryModal } from './read-inquiry-modal'

export const AlertButton = ({ unreadInquiryList }: { unreadInquiryList: Inquiry[] }) => {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isModalOpen, toggleModal] = useReducer((prev: boolean) => !prev, false)
  const { changeInquiryStatus } = useChangeInquiryStatus()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative ml-auto cursor-pointer" size="icon" variant="outline">
            <BellIcon className="size-4" />
            {unreadInquiryList.length > 0 && (
              <div className="size-1.25 rounded-full bg-red-500 absolute top-2.5 right-2.5" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={cn(unreadInquiryList.length > 0 ? 'w-40' : 'w-full')}>
          {unreadInquiryList.length === 0 ? (
            <p className="flex items-center gap-2 p-2 text-sm">
              <MailCheck className="size-4" /> 모든 문의를 확인했어요.
            </p>
          ) : (
            <>
              {unreadInquiryList.map((inquiry) => (
                <DropdownMenuItem
                  key={inquiry.id}
                  onClick={() => {
                    setSelectedInquiry(inquiry)
                    toggleModal()
                    changeInquiryStatus({ inquiryId: inquiry.id, status: 'read' })
                  }}
                >
                  <p className="w-full truncate">{inquiry.subject}</p>
                </DropdownMenuItem>
              ))}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <ReadInquiryModal closeDialog={toggleModal} inquiry={selectedInquiry} open={isModalOpen} />
    </>
  )
}
