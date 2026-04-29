import { z } from 'zod'

import { FORM_MESSAGES, REGEX } from '@/shared/config'

import { ROLES } from '../config/constants'

export const createAccountFormSchema = z
  .object({
    accountId: z
      .string()
      .min(4, FORM_MESSAGES.ID.MIN)
      .max(12, FORM_MESSAGES.ID.MAX)
      .regex(REGEX.ENGLISH, FORM_MESSAGES.ID.PATTERN)
      .regex(REGEX.ENGLISH_AND_NUMBER_AND_UNDERSCORE, FORM_MESSAGES.ID.PATTERN)
      .refine((val) => !REGEX.NUMBER_AND_UNDERSCORE.test(val), FORM_MESSAGES.ID.PATTERN),
    name: z.string().min(1, FORM_MESSAGES.REQUIRED),
    password: z.string().min(1, FORM_MESSAGES.REQUIRED),
    passwordConfirm: z.string().min(1, FORM_MESSAGES.REQUIRED),
    role: z.enum(ROLES),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: FORM_MESSAGES.PASSWORD_CONFIRM.MATCH,
    path: ['passwordConfirm'],
  })

export type CreateAccountFormValuesType = z.infer<typeof createAccountFormSchema>

export const createAccountDefaultValues: CreateAccountFormValuesType = {
  accountId: '',
  name: '',
  password: '',
  passwordConfirm: '',
  role: 'viewer',
}
