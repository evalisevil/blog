import z from 'zod'

import { FORM_MESSAGES, REGEX } from '@/shared/config'

export const basicSchema = z.object({
  // --- 기본 정보 ---
  siteName: z.string().min(1, FORM_MESSAGES.REQUIRED),
  representativeEmail: z.string().min(1, FORM_MESSAGES.REQUIRED).email(FORM_MESSAGES.NOT_FORMATTED),
  representativeTel: z
    .string()
    .min(1, FORM_MESSAGES.REQUIRED)
    .regex(REGEX.PHONE, FORM_MESSAGES.NOT_FORMATTED),
  fax: z.string().regex(REGEX.PHONE, FORM_MESSAGES.NOT_FORMATTED).optional().or(z.literal('')),
  customerTel: z
    .string()
    .regex(REGEX.PHONE, FORM_MESSAGES.NOT_FORMATTED)
    .optional()
    .or(z.literal('')),
  address: z.string().optional(),

  // --- 사업자 정보 ---
  representativeName: z.string().optional(),
  businessNumber: z
    .string()
    .regex(REGEX.BUSINESS_NUMBER, FORM_MESSAGES.NOT_FORMATTED)
    .optional()
    .or(z.literal('')),
  salesRegistrationNumber: z.string().optional(),
  copyright: z.string().min(1, FORM_MESSAGES.REQUIRED),

  // --- SNS 및 외부 링크 (URL 형식 검사) ---
  linkedIn: z.string().url(FORM_MESSAGES.NOT_FORMATTED).optional().or(z.literal('')),
  instagram: z.string().url(FORM_MESSAGES.NOT_FORMATTED).optional().or(z.literal('')),
  youtube: z.string().url(FORM_MESSAGES.NOT_FORMATTED).optional().or(z.literal('')),
  threads: z.string().url(FORM_MESSAGES.NOT_FORMATTED).optional().or(z.literal('')),
  facebook: z.string().url(FORM_MESSAGES.NOT_FORMATTED).optional().or(z.literal('')),
  github: z.string().url(FORM_MESSAGES.NOT_FORMATTED).optional().or(z.literal('')),

  // --- 로고 & 파비콘 (Cloudinary public_id 저장용) ---
  logo: z.string().optional().nullable(),
  whiteLogo: z.string().optional().nullable(),
  favicon: z.string().optional().nullable(),
})

export type BasicFormValuesType = z.infer<typeof basicSchema>

export const basicDefaultValues: BasicFormValuesType = {
  siteName: '',
  representativeEmail: '',
  representativeTel: '',
  fax: '',
  customerTel: '',
  address: '',
  representativeName: '',
  businessNumber: '',
  salesRegistrationNumber: '',
  copyright: '',
}
