import type { PageSeoMockType } from '../types/page-seo'

export const PAGES_SEO_MOCK: PageSeoMockType[] = [
  {
    path: '/',
    name: '메인 홈',
    status: 'completed',
    title: '(주)코어테크',
    titleSuffix: '혁신으로 세상을 바꾸는 기업',
    titleSeparator: '—',
    description:
      '(주)코어테크는 2012년 창립 이래 기술과 신뢰를 바탕으로 다양한 산업 분야에 솔루션을 제공하는 혁신 기업입니다. 클라우드·데이터·소프트웨어 전문.',
    canonicalUrl: 'coretech.co.kr/',
    robots: 'index, follow',
    ogImage: '/images/og-home.jpg',
  },
  {
    path: '/about',
    name: '회사 소개',
    status: 'completed',
    title: '회사 소개',
    titleSuffix: '(주)코어테크의 비전과 미션',
    titleSeparator: '—',
    description:
      '코어테크의 창립 배경, 비전·미션, 핵심 가치, 그리고 12년의 성장 역사를 소개합니다.',
  },
  {
    path: '/services',
    name: '서비스/사업',
    status: 'completed',
    title: '서비스 소개 — 클라우드·데이터·소프트웨어',
    titleSuffix: '코어테크',
    titleSeparator: '|',
  },
  {
    path: '/team',
    name: '팀/조직',
    status: 'completed',
    title: '팀 소개',
    titleSuffix: '코어테크를 이끄는 사람들',
    titleSeparator: '—',
  },
  {
    path: '/contact',
    name: '문의하기',
    status: 'incomplete',
    title: '문의하기',
    titleSuffix: '코어테크',
    titleSeparator: '|',
    description: '',
  },
  {
    path: '/news',
    name: '뉴스 & 공지',
    status: 'incomplete',
    title: '',
    titleSuffix: '(주)코어테크',
    titleSeparator: '|',
    description: '',
  },
]

export function buildPagesDefaultValues(): Record<string, Record<string, unknown>> {
  const pages: Record<string, Record<string, unknown>> = {}
  for (const p of PAGES_SEO_MOCK) {
    const row: Record<string, unknown> = {
      title: p.title,
      titleSuffix: p.titleSuffix,
      titleSeparator: p.titleSeparator,
    }
    if (p.description !== undefined) row.description = p.description
    if (p.canonicalUrl) row.canonicalUrl = p.canonicalUrl
    if (p.robots) row.robots = p.robots
    if (p.ogImage) row.ogImage = p.ogImage
    pages[p.path] = row
  }
  return pages
}
