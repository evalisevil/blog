'use client'

import { type Inquiry } from '@prisma/client'
import { useState } from 'react'

import { useChangeInquiryStatus } from '@/features/inquiry'

export const useReadInquiryModal = () => {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { changeInquiryStatus } = useChangeInquiryStatus()

  const handleOpenModal = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry)
    setIsModalOpen(true)
    changeInquiryStatus({ inquiryId: inquiry.id, status: 'read' })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedInquiry(null)
  }

  return { handleOpenModal, handleCloseModal, isModalOpen, selectedInquiry }
}
