'use client'

import { useState } from 'react'

import axios from 'axios'

import ModalConfirm from '@/app/components/shared/components/ModalConfirm.tsx'

export default function DeleteDraft({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalOpen = () => {
    setIsModalOpen(true)
    document.documentElement.style.overflow = 'hidden'
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    document.documentElement.style.overflow = 'auto'
  }

  const handleDelete = async () => {
    await axios.delete(`/api/article?id=${id}&type=drafts`)
    handleModalClose()
  }

  return (
    <>
      <button
        type="button"
        className="text-sm underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
        onClick={handleModalOpen}
      >
        삭제
      </button>

      {isModalOpen && (
        <ModalConfirm
          title="임시 글 삭제"
          description="삭제된 게시글은 복구할 수 없습니다."
          confirmText="삭제"
          cancelText="취소"
          onConfirm={handleDelete}
          onCancel={handleModalClose}
        />
      )}
    </>
  )
}
