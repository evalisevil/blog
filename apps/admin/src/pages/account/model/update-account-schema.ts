import { z } from 'zod'

import { FORM_MESSAGES } from '@/shared/config'

import { ROLES } from '../config/constants'

export const updateAccountFormSchema = z
  .object({
    name: z.string().min(1, FORM_MESSAGES.REQUIRED),
    role: z.enum(ROLES),
    password: z.string().optional(),
    passwordConfirm: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const pw = data.password ?? ''
    if (pw.length === 0) return
    if (pw !== (data.passwordConfirm ?? '')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FORM_MESSAGES.PASSWORD_CONFIRM.MATCH,
        path: ['passwordConfirm'],
      })
    }
  })

export type UpdateAccountFormValuesType = z.infer<typeof updateAccountFormSchema>

export const updateAccountDefaultValues: UpdateAccountFormValuesType = {
  name: '',
  role: 'viewer',
  password: '',
  passwordConfirm: '',
}
