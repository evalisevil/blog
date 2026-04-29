'use client'

import 'md-editor-rt/lib/style.css'

import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR'
import { config, MdEditor } from 'md-editor-rt'
import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'
import { toast } from 'sonner'

config({
  editorConfig: {
    languageUserDefined: {
      'ko-KR': KO_KR,
    },
  },
})

const MAX_IMAGE_BYTES = 1024 * 1024

export const RichEditor = <T extends FieldValues>({
  field,
}: {
  field: ControllerRenderProps<T, Path<T>>
}) => {
  const handleEditorChange = (value: string) => {
    field.onChange(value)
  }

  const handleUploadImages = async (files: File[], callback: (urls: string[]) => void) => {
    try {
      for (const file of files) {
        if (file.size > MAX_IMAGE_BYTES) {
          throw new Error('이미지 크기는 1MB 이하여야 합니다.')
        }
      }

      const urls = files.map((file) => URL.createObjectURL(file))
      callback(urls)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '이미지 처리에 실패했습니다.')
    }
  }

  return (
    <MdEditor
      language="ko-KR"
      placeholder="내용을 입력해주세요."
      previewTheme="github"
      value={field.value}
      onChange={handleEditorChange}
      onUploadImg={handleUploadImages}
    />
  )
}
