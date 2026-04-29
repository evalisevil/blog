import { type ControllerRenderProps, type FieldValues, type Path } from 'react-hook-form'
import { toast } from 'sonner'

const ALLOWED_TYPES = {
  document: ['application/pdf'],
  image: ['image/gif', 'image/jpeg', 'image/png', 'image/webp'],
} as const

const ALERT_MESSAGES = {
  FILE_FORMAT: '허용되지 않은 파일 형식입니다.',
  FILE_SIZE: '파일 크기가 너무 큽니다.',
} as const

export const fileChangeHandler = <T extends FieldValues>(
  e: React.ChangeEvent<HTMLInputElement>,
  {
    allowedFormat,
    maxSize,
    field,
  }: {
    allowedFormat: keyof typeof ALLOWED_TYPES
    maxSize: number
    field: ControllerRenderProps<T, Path<T>>
  },
) => {
  const file = e.target.files?.[0]
  if (!file) return

  const allowed = ALLOWED_TYPES[allowedFormat] as readonly string[]
  const isAllowedFormat = allowed.includes(file.type)

  if (!isAllowedFormat) {
    e.target.value = ''
    toast.error(ALERT_MESSAGES.FILE_FORMAT)
    return
  }

  if (file.size > maxSize) {
    e.target.value = ''
    toast.error(ALERT_MESSAGES.FILE_SIZE)
    return
  }

  return field.onChange(file)
}
