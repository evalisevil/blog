import z from 'zod'

import { FORM_MESSAGES } from '@/shared/config'

export const loginSchema = z.object({
  accountId: z.string().min(1, FORM_MESSAGES.REQUIRED),
  password: z.string().min(1, FORM_MESSAGES.REQUIRED),
})

export type LoginFormValuesType = z.infer<typeof loginSchema>

export const loginDefaultValues: LoginFormValuesType = {
  accountId: '',
  password: '',
}
