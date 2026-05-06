'use client'

import { type Inquiry } from '@prisma/client'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { BellIcon } from 'lucide-react'

import { Button } from '@/shared/ui/shadcn/button'
import { DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/shadcn/dropdown-menu'

import { useReadInquiryModal } from '../model/use-read-inquiry-modal'
import { EmptyUnreadInquiry } from './empty-unread-inquiry'
import { ReadInquiryButton } from './read-inquiry-button'
import { ReadInquiryModal } from './read-inquiry-modal'

export const AlertButton = ({ unreadInquiryList }: { unreadInquiryList: Inquiry[] }) => {
  const { handleOpenModal, handleCloseModal, isModalOpen, selectedInquiry } = useReadInquiryModal()

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
        <DropdownMenuContent className="p-2 space-y-2 max-h-[400px] overflow-y-auto overscroll-none">
          {unreadInquiryList.length === 0 && <EmptyUnreadInquiry />}

          {unreadInquiryList.length > 0 &&
            unreadInquiryList.map((inquiry) => (
              <ReadInquiryButton
                key={inquiry.id}
                inquiry={inquiry}
                onOpenModal={handleOpenModal.bind(null, inquiry)}
              />
            ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <ReadInquiryModal
        inquiry={selectedInquiry}
        open={isModalOpen}
        onOpenChange={handleCloseModal}
      />
    </>
  )
}

{
  /* <DropdownMenuItem
                  key={inquiry.id}
                  onClick={() => {
                    setSelectedInquiry(inquiry)
                    toggleModal()
                    changeInquiryStatus({ inquiryId: inquiry.id, status: 'read' })
                  }}
                >
                  <p className="w-full truncate">{inquiry.subject}</p>
                </DropdownMenuItem> */
}
