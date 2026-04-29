'use client'

import { useState } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'

import { Badge } from '@/shared/ui/shadcn/badge'
import { Button } from '@/shared/ui/shadcn/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/shadcn/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/ui/shadcn/form'
import { Switch } from '@/shared/ui/shadcn/switch'
import { Textarea } from '@/shared/ui/shadcn/textarea'

export const IndexingForm = () => {
  const [sitemapSettings, setSitemapSettings] = useState({
    includeStaticPages: true,
    includeNews: true,
    includeImages: false,
  })

  const [schemaSettings, setSchemaSettings] = useState({
    organization: true,
    localBusiness: true,
    website: false,
    breadcrumb: true,
  })

  const form = useForm<FieldValues>({
    defaultValues: {
      robotsTxt: `# (주)코어테크 robots.txt
# Updated: 2024-10-01

User-agent: *
Allow: /

# 어드민 경로 차단
Disallow: /admin/
Disallow: /api/
Disallow: /_next/

# 특정 봇 최적화
User-agent: Googlebot
Allow: /

User-agent: Yeti
Allow: /

# Sitemap
Sitemap: https://coretech.co.kr/sitemap.xml
Sitemap: https://coretech.co.kr/sitemap-news.xml`,
      organizationSchema: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "(주)코어테크",
  "url": "https://coretech.co.kr",
  "logo": "https://coretech.co.kr/images/logo.png",
  "sameAs": ["https://linkedin.com/company/coretech"]
}`,
    },
  })

  const { control } = form

  const checklistItems = [
    { id: 'https', label: 'HTTPS 적용', description: 'SSL 인증서 정상', status: 'completed' },
    {
      id: 'www-redirect',
      label: 'www 리다이렉트',
      description: 'www → non-www 정규화됨',
      status: 'completed',
    },
    { id: 'robots', label: 'robots.txt 존재', description: '정상 응답 (200)', status: 'completed' },
    { id: 'sitemap', label: 'XML Sitemap 존재', description: '32개 URL 포함', status: 'completed' },
    {
      id: 'schema',
      label: '구조화 데이터 적용',
      description: 'Organization, LocalBusiness',
      status: 'completed',
    },
    {
      id: 'canonical',
      label: 'Canonical 태그',
      description: '전체 페이지 설정됨',
      status: 'completed',
    },
    { id: 'og', label: 'Open Graph 태그', description: '기본 설정 완료', status: 'completed' },
    { id: 'hreflang', label: 'Hreflang', description: 'ko-KR 설정됨', status: 'completed' },
    { id: 'alt-tags', label: '이미지 alt 태그', description: '12개 누락', status: 'warning' },
    { id: 'mobile', label: '모바일 뷰포트 최적화', description: '미적용', status: 'error' },
    { id: 'cwv', label: 'Core Web Vitals', description: 'LCP 개선 필요', status: 'warning' },
  ]

  const completedCount = checklistItems.filter((item) => item.status === 'completed').length
  return (
    <Form {...form}>
      <form
      // onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-[1.25] space-y-6">
            {/* robots.txt 편집 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <span>🤖</span>
                    robots.txt 편집
                  </CardTitle>
                  <CardDescription>검색 봇의 크롤링 규칙을 정의합니다.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    저장 & 배포
                  </Button>
                  <Button className="text-xs" size="sm" variant="link">
                    coretech.co.kr/robots.txt ↗
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
                    <span className="text-sm font-medium">robots.txt</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                  </div>
                  <FormField
                    control={control}
                    name="robotsTxt"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[200px] font-mono text-sm border-0 rounded-none resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* XML Sitemap 설정 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <span>🗺</span>
                    XML Sitemap 설정
                  </CardTitle>
                  <CardDescription>마지막 생성: 2024.10.07 09:30</CardDescription>
                </div>
                <Button size="sm">🔄 재생성</Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">정적 페이지 포함</div>
                      <div className="text-xs text-muted-foreground">
                        /about, /services, /team, /inquiry, /news 등
                      </div>
                    </div>
                    <Switch
                      checked={sitemapSettings.includeStaticPages}
                      onCheckedChange={(checked) =>
                        setSitemapSettings((prev) => ({ ...prev, includeStaticPages: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">뉴스/게시글 자동 포함</div>
                      <div className="text-xs text-muted-foreground">
                        새 게시글 발행 시 자동으로 Sitemap에 추가
                      </div>
                    </div>
                    <Switch
                      checked={sitemapSettings.includeNews}
                      onCheckedChange={(checked) =>
                        setSitemapSettings((prev) => ({ ...prev, includeNews: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">이미지 Sitemap 생성</div>
                      <div className="text-xs text-muted-foreground">
                        이미지 검색 노출을 위한 이미지 Sitemap 포함
                      </div>
                    </div>
                    <Switch
                      checked={sitemapSettings.includeImages}
                      onCheckedChange={(checked) =>
                        setSitemapSettings((prev) => ({ ...prev, includeImages: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg border">
                    <span className="text-sm">sitemap.xml</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">32개 URL</span>
                      <Button className="text-xs p-0 h-auto" size="sm" variant="link">
                        보기 ↗
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg border">
                    <span className="text-sm">sitemap-news.xml</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">23개 URL</span>
                      <Button className="text-xs p-0 h-auto" size="sm" variant="link">
                        보기 ↗
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 구조화 데이터 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <span>🧩</span>
                    구조화 데이터 (Schema.org)
                  </CardTitle>
                  <CardDescription>리치 스니펫 노출을 위한 JSON-LD 설정입니다.</CardDescription>
                </div>
                <Button size="sm" variant="ghost">
                  + 추가
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    type: 'Organization',
                    desc: '기업 기본 정보 — 글로벌 적용',
                    active: true,
                    hasCode: true,
                  },
                  {
                    type: 'LocalBusiness',
                    desc: '사업장 위치·연락처',
                    active: true,
                    hasCode: false,
                  },
                  { type: 'WebSite', desc: '검색박스 연동', active: false, hasCode: false },
                  {
                    type: 'BreadcrumbList',
                    desc: '경로 구조 — 뉴스 페이지',
                    active: true,
                    hasCode: false,
                  },
                ].map((schema) => (
                  <div key={schema.type} className="border rounded-lg">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <Badge className="font-mono" variant="outline">
                          {schema.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{schema.desc}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            schema.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }
                          variant={schema.active ? 'secondary' : 'outline'}
                        >
                          {schema.active ? '활성' : '비활성'}
                        </Badge>
                        <Switch
                          checked={schema.active}
                          onCheckedChange={(checked) => {
                            const key = schema.type.toLowerCase() as keyof typeof schemaSettings
                            if (key in schemaSettings) {
                              setSchemaSettings((prev) => ({ ...prev, [key]: checked }))
                            }
                          }}
                        />
                      </div>
                    </div>
                    {schema.hasCode && (
                      <div className="px-4 pb-4">
                        <FormField
                          control={control}
                          name="organizationSchema"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  className="min-h-[130px] font-mono text-xs bg-gray-900 text-gray-100 border-gray-700"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 기술 SEO 체크리스트 */}
          <div className="flex-1">
            <Card className="sticky top-20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center gap-2">
                  <span>✅</span>
                  기술 SEO 체크리스트
                </CardTitle>
                <span className="text-sm text-green-600 font-medium">
                  {completedCount} / {checklistItems.length} 완료
                </span>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {checklistItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        // eslint-disable-next-line
                        item.status === 'completed'
                          ? 'border-green-200 bg-green-50'
                          : item.status === 'warning'
                            ? 'border-yellow-200 bg-yellow-50'
                            : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <span className="text-lg">
                        {
                          // eslint-disable-next-line
                          item.status === 'completed'
                            ? '✅'
                            : item.status === 'warning'
                              ? '⚠️'
                              : '❌'
                        }
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{item.label}</div>
                        <div
                          className={`text-xs ${
                            // eslint-disable-next-line
                            item.status === 'completed'
                              ? 'text-green-700'
                              : item.status === 'warning'
                                ? 'text-yellow-700'
                                : 'text-red-700'
                          }`}
                        >
                          {item.description}
                        </div>
                      </div>
                      {item.status !== 'completed' && (
                        <Button className="text-xs" size="sm" variant="outline">
                          {item.status === 'warning' ? '확인' : '수정'}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  )
}
