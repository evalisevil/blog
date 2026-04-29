export type PageSeoStatusType = 'completed' | 'incomplete'

export interface PageSeoMockType {
  path: string
  name: string
  status: PageSeoStatusType
  title: string
  titleSuffix: string
  titleSeparator: string
  description?: string
  canonicalUrl?: string
  robots?: string
  ogImage?: string
}
