import { z } from 'zod'

export const createGeneralFormSchema = z.object({
  title: z.string().trim().min(1, '제목을 입력해주세요.'),
  writer: z.string().trim().min(1, '작성자를 입력해주세요.'),
  content: z.string().trim().min(1, '내용을 입력해주세요.'),
  isVisible: z.boolean(),
})

export type CreateGeneralFormValuesType = z.infer<typeof createGeneralFormSchema>
