'use client'

import { useCallback, useEffect, useReducer, useState } from 'react'

import axios from 'axios'
import { useRouter } from 'next/navigation'

import ChangeProfileImage from './components/ChangeProfileImage.tsx'
import Field from './components/Field.tsx'

import useCallSnackbar from '@/app/hooks/useCallSnackbar.ts'

import Loading from '@/app/loading.tsx'

import Button from '@/app/components/shared/components/Button.tsx'
import InnerCol from '@/app/components/shared/components/InnerCol.tsx'
import ModalAlert from '@/app/components/shared/components/ModalAlert.tsx'
import Snackbar from '@/app/components/shared/components/Snackbar.tsx'

import type { ProfileData } from '@/app/types/types.ts'

export default function Page() {
  const [formData, setFormData] = useState<ProfileData>({
    profileImage: '',
    blogTitle: '',
    nickname: '',
    introduction: '',
    email: '',
    portfolioUrl: '',
    githubUrl: '',
    resumeUrl: ''
  })
  const router = useRouter()
  const [isModalOpen, toggleModal] = useReducer((prev) => !prev, false)
  const { showSnackbar, displaySnackbar } = useCallSnackbar(() => {
    router.refresh()
  })
  const [isLoading, setIsLoading] = useState(true)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleProfileChange = (imgSrc: string) => {
    setFormData({ ...formData, profileImage: imgSrc })
  }

  const checkValidation = () => {
    const { profileImage, ...rest } = formData
    return Object.values(rest).every((value) => value !== '')
  }

  const handleSubmit = async () => {
    if (!checkValidation()) {
      toggleModal()
      return
    }

    await axios.put('/api/profile', formData)
    displaySnackbar()
  }

  const fetchData = useCallback(async () => {
    const {
      data: { data }
    } = await axios.get('/api/profile')

    setFormData(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (isLoading) return <Loading />

  return (
    <main className="mb-20">
      <InnerCol>
        <section className="w-full sm:w-[540px] mx-auto relative">
          <ChangeProfileImage
            onProfileChange={handleProfileChange}
            imgSrc={formData.profileImage}
          />
          <ul className="mt-10">
            <Field
              id="blogTitle"
              title="블로그 제목"
              value={formData.blogTitle}
              onChange={handleChange}
            />
            <Field
              id="nickname"
              title="닉네임"
              value={formData.nickname}
              onChange={handleChange}
            />
            <Field
              id="introduction"
              title="간략 소개"
              value={formData.introduction}
              isTextarea
              onChange={handleChange}
            />
            <Field
              id="email"
              title="이메일 주소"
              value={formData.email}
              onChange={handleChange}
            />
            <Field
              id="portfolioUrl"
              title="포트폴리오 URL"
              value={formData.portfolioUrl}
              onChange={handleChange}
            />
            <Field
              id="githubUrl"
              title="깃 URL"
              value={formData.githubUrl}
              onChange={handleChange}
            />
            <Field
              id="resumeUrl"
              title="이력서 URL"
              value={formData.resumeUrl}
              onChange={handleChange}
            />
          </ul>

          <Button
            text="저장하기"
            className="mt-6 mx-auto px-6"
            type="tertiary"
            onClick={handleSubmit}
          />
        </section>
      </InnerCol>
      {showSnackbar && (
        <Snackbar message="설정이 저장되었습니다." type="success" />
      )}

      {isModalOpen && (
        <ModalAlert
          title="⚠️ 알림"
          description="모든 항목을 작성해주세요."
          buttonText="확인"
          onClick={toggleModal}
        />
      )}
    </main>
  )
}
