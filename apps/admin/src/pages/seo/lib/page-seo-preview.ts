import { PAGE_SEO_PREVIEW_LABELS } from '../constants'
import type { PageSeoMockType } from '../types/page-seo'

export type PageSeoPreviewOverrides = Partial<
  Pick<PageSeoMockType, 'title' | 'titleSuffix' | 'titleSeparator' | 'description'>
>

export function buildTitlePreviewLine(head: string, tail: string, separator: string): string {
  const h = head.trim()
  const t = tail.trim()
  if (!h && !t) {
    return ''
  }
  if (!t) {
    return h
  }
  if (!h) {
    return t
  }

  return `${h} ${separator} ${t}`
}

export function isPageSeoComplete(
  page: PageSeoMockType,
  row?: Record<string, unknown> | null,
): boolean {
  const title = row?.title !== undefined ? String(row.title) : page.title
  if (!title.trim()) {
    return false
  }

  if (page.description !== undefined) {
    const description = row?.description !== undefined ? row.description : page.description
    if (String(description ?? '').trim() === '') {
      return false
    }
  }

  return true
}

export function getPageSeoPreviewLine(
  page: PageSeoMockType,
  formRow?: PageSeoPreviewOverrides | null,
): string {
  const title = formRow?.title !== undefined ? String(formRow.title) : page.title
  const titleSuffix =
    formRow?.titleSuffix !== undefined ? String(formRow.titleSuffix) : page.titleSuffix
  const titleSeparator =
    formRow?.titleSeparator !== undefined ? String(formRow.titleSeparator) : page.titleSeparator
  const description = formRow?.description !== undefined ? formRow.description : page.description

  if (!title.trim()) {
    return PAGE_SEO_PREVIEW_LABELS.NO_SEO
  }
  if (page.description !== undefined && String(description ?? '').trim() === '') {
    return PAGE_SEO_PREVIEW_LABELS.NO_DESCRIPTION
  }

  return buildTitlePreviewLine(title, titleSuffix, titleSeparator)
}
