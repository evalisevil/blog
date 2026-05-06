'use client'

import { CheckCircle2, ImageIcon, RefreshCw, Upload } from 'lucide-react'
import {
  CldImage,
  CldUploadWidget,
  type CloudinaryUploadWidgetInfo,
  type CloudinaryUploadWidgetOptions,
  type CloudinaryUploadWidgetResults,
} from 'next-cloudinary'
import { useState } from 'react'
import { type ControllerRenderProps, type FieldValues, type Path } from 'react-hook-form'

import { Button } from './shadcn/button'

const UPLOAD_PRESET = 'ml_default'

export const ImageUploader = <T extends FieldValues>({
  field,
  options,
}: {
  field: ControllerRenderProps<T, Path<T>>
  options: CloudinaryUploadWidgetOptions
}) => {
  const [publicId, setPublicId] = useState<string | null>(() => (field.value as string) ?? null)
  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    const publicId = (result.info as CloudinaryUploadWidgetInfo)?.public_id ?? null
    if (!publicId) return
    setPublicId(publicId)
    field.onChange(publicId)
  }

  return (
    <div className="w-full">
      <CldUploadWidget
        options={options}
        signatureEndpoint="/api/sign-cloudinary-params"
        uploadPreset={UPLOAD_PRESET}
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col gap-2.5 rounded-xl border border-dashed bg-muted/25 p-3">
              {publicId && (
                <div className="flex items-center gap-2 rounded-lg border bg-background p-2">
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md border">
                    <CldImage
                      fill
                      alt="이미지 미리보기"
                      src={publicId}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary">
                      <CheckCircle2 className="size-3.5" />
                      업로드 완료
                    </div>
                    <p className="mt-1 truncate text-xs text-muted-foreground">{publicId}</p>
                  </div>
                </div>
              )}

              {!publicId && (
                <div className="flex min-h-20 flex-col items-center justify-center rounded-lg border bg-background px-3 text-center">
                  <ImageIcon className="mb-1.5 size-5 text-muted-foreground" />
                  <p className="text-xs font-medium">이미지를 업로드해 주세요</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    이미지 미리보기가 제공됩니다.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" type="button" onClick={() => open()}>
                  {publicId ? <RefreshCw className="size-4" /> : <Upload className="size-4" />}
                  {publicId ? '파일 변경' : '파일 선택'}
                </Button>

                {publicId && (
                  <Button
                    size="sm"
                    type="button"
                    variant="outline"
                    onClick={() => setPublicId(null)}
                  >
                    다시 선택
                  </Button>
                )}
              </div>

              <div className="rounded-md bg-background px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                <p>최대 파일 크기: {(options.maxFileSize ?? 0) / 1024}KB 이하</p>
                <p>허용 파일 형식: {options.clientAllowedFormats?.join(', ')}</p>
              </div>
            </div>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
