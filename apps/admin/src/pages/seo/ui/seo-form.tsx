'use client'

import { ChevronDown, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { type Control, type FieldValues, useForm, useWatch } from 'react-hook-form'

import { TitleSeparatorPicker } from '@/shared/ui'
import { CardContainer } from '@/shared/ui/card'
import { ProgressGroup } from '@/shared/ui/progress/progress-group'
import { Badge } from '@/shared/ui/shadcn/badge'
import { Button } from '@/shared/ui/shadcn/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderTypeB,
  CardTitle,
} from '@/shared/ui/shadcn/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui/shadcn/collapsible'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/shadcn/form'
import { Input } from '@/shared/ui/shadcn/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/select'
import { Textarea } from '@/shared/ui/shadcn/textarea'

import { buildPagesDefaultValues, PAGES_SEO_MOCK } from '../constants/page-seo-mock'
import { WEBMASTER_VERIFICATION_FIELDS } from '../constants/page-seo-verification'
import { pageSeoField } from '../lib/page-seo-field'
import {
  buildTitlePreviewLine,
  getPageSeoPreviewLine,
  isPageSeoComplete,
} from '../lib/page-seo-preview'
import type { PageSeoMockType } from '../types/page-seo'

const PageSeoRowPreview = ({
  page,
  control,
}: {
  page: PageSeoMockType
  control: Control<FieldValues>
}) => {
  const title = useWatch({ control, name: pageSeoField(page.path, 'title') })
  const titleSuffix = useWatch({ control, name: pageSeoField(page.path, 'titleSuffix') })
  const titleSeparator = useWatch({ control, name: pageSeoField(page.path, 'titleSeparator') })
  const description = useWatch({
    control,
    name: pageSeoField(page.path, 'description'),
    disabled: page.description === undefined,
  })

  return getPageSeoPreviewLine(page, {
    title: title as string | undefined,
    titleSuffix: titleSuffix as string | undefined,
    titleSeparator: titleSeparator as string | undefined,
    description: page.description === undefined ? undefined : (description as string | undefined),
  })
}

export const SeoForm = () => {
  const [previewTab, setPreviewTab] = useState<'google' | 'naver'>('google')
  const [keywords, setKeywords] = useState([
    '코어테크',
    'IT 솔루션',
    '클라우드 서비스',
    '데이터 분석',
    '소프트웨어 개발',
    '기업 IT',
  ])
  const [expandedPages, setExpandedPages] = useState<string[]>(['/', '/about'])

  const form = useForm<FieldValues>({
    defaultValues: {
      companyName: '',
      representative: '',
      tel: '',
      fax: '',
      email: '',
      address: '',
      businessNumber: '',
      industry: '',
      logo: '',
      favicon: '',
      // SEO 관련 필드
      defaultTitle: '(주)코어테크',
      titleSuffix: '혁신으로 세상을 바꾸는 기업',
      titleSeparator: '|',
      defaultDescription:
        '(주)코어테크는 2012년 창립 이래 기술과 신뢰를 바탕으로 다양한 산업 분야에 솔루션을 제공하는 혁신 기업입니다. 클라우드·데이터·소프트웨어 전문.',
      ogImage: '/images/og-default.jpg',
      naverVerification: 'abc123def456ghi789',
      googleVerification: 'xyz789uvw012abc345',
      bingVerification: '',
      pages: buildPagesDefaultValues(),
    },
  })

  const { control } = form

  const [defaultTitle, defaultDescription, titleSuffix, titleSeparator] = form.watch([
    'defaultTitle',
    'defaultDescription',
    'titleSuffix',
    'titleSeparator',
  ])

  const defaultSerpTitle = buildTitlePreviewLine(
    typeof defaultTitle === 'string' ? defaultTitle : '',
    typeof titleSuffix === 'string' ? titleSuffix : '',
    typeof titleSeparator === 'string' ? titleSeparator : '|',
  )

  const defaultDescriptionText = typeof defaultDescription === 'string' ? defaultDescription : ''

  const seoScores = [
    { label: '타이틀 태그', score: 90 },
    { label: '메타 설명', score: 75 },
    { label: '키워드 최적화', score: 60 },
    { label: '구조화 데이터', score: 85 },
    { label: 'Sitemap / robots.txt', score: 100 },
    { label: '모바일 최적화', score: 40 },
  ]

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index))
  }

  const addKeyword = () => {
    const newKeyword = prompt('새 키워드를 입력하세요:')
    if (newKeyword && newKeyword.trim()) {
      setKeywords([...keywords, newKeyword.trim()])
    }
  }

  const handleTogglePageExpansion = (path: string) => {
    setExpandedPages((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path],
    )
  }

  const handleRobotsChange = (value: string, onChange: (value: string) => void) => {
    onChange(value)
  }

  const formValues = useWatch({ control: control })
  const watchedPages = useMemo(
    () => (formValues?.pages ?? {}) as Record<string, Record<string, unknown>>,
    [formValues?.pages],
  )

  const { completedCount, incompleteCount } = useMemo(() => {
    let completed = 0
    for (const p of PAGES_SEO_MOCK) {
      if (isPageSeoComplete(p, watchedPages[p.path])) {
        completed++
      }
    }

    return {
      completedCount: completed,
      incompleteCount: PAGES_SEO_MOCK.length - completed,
    }
  }, [watchedPages])

  return (
    <Form {...form}>
      <form
      // onSubmit={form.handleSubmit(onSubmit)}
      >
        <CardContainer>
          <div className="flex flex-col gap-6 flex-1">
            {/* 검색엔진 웹마스터 인증 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">검색엔진 웹마스터 인증</CardTitle>
                <CardDescription>
                  각 검색엔진의 사이트 소유자 확인 메타 태그를 입력하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {WEBMASTER_VERIFICATION_FIELDS.map(({ name, label, metaName }) => (
                  <FormField
                    key={name}
                    control={control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <div className="flex">
                          <div className="px-3 py-2 bg-muted border border-r-0 rounded-l-md text-xs text-muted-foreground whitespace-nowrap flex-shrink-0 min-w-40">
                            {metaName}
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              className="rounded-l-none font-mono"
                              placeholder="인증 코드 입력"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
            </Card>

            {/* 기본 메타 태그 */}
            <Card>
              <CardHeaderTypeB
                content="페이지별 SEO가 없을 때 적용되는 기본값입니다."
                title="기본 메타 태그"
              />
              <CardContent className="space-y-6">
                <FormField
                  control={control}
                  name="defaultTitle"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel required>기본 타이틀</FormLabel>
                        <span className="text-xs text-muted-foreground">
                          {field.value?.length ?? 0} / 60자
                        </span>
                      </div>
                      <FormControl>
                        <Input {...field} placeholder="페이지 대표 제목" />
                      </FormControl>
                      <FormDescription>페이지별 제목이 없을 때 사용. 50~60자 권장.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="titleSuffix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between">
                        타이틀 접미사
                        <span className="text-xs text-muted-foreground">
                          {field.value?.length ?? 0} / 60자
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="예: 회사명·브랜드 슬로건" />
                      </FormControl>
                      <FormDescription>
                        페이지명 뒤에 붙는 브랜드·슬로건(구분자로 연결).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="titleSeparator"
                  render={({ field }) => {
                    const handleSeparatorChange = (next: string) => {
                      field.onChange(next)
                    }

                    return (
                      <FormItem>
                        <FormControl>
                          <TitleSeparatorPicker
                            value={field.value ?? '|'}
                            onChange={handleSeparatorChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  control={control}
                  name="defaultDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between">
                        메타 설명 (기본)
                        <span className="text-xs text-muted-foreground">
                          {field.value?.length ?? 0} / 160자
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormDescription>120~160자 권장.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-2 ">
                  <label className="text-sm font-medium">핵심 키워드</label>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <Badge key={keyword} className="flex items-center gap-2" variant="secondary">
                        {keyword}{' '}
                        <button
                          className="text-xs"
                          type="button"
                          onClick={() => removeKeyword(index)}
                        >
                          ✕
                        </button>
                      </Badge>
                    ))}
                    <Button
                      className="h-6 px-2 text-xs"
                      size="sm"
                      type="button"
                      variant="outline"
                      onClick={addKeyword}
                    >
                      + 추가
                    </Button>
                  </div>
                </div>

                <FormField
                  control={control}
                  name="ogImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        기본 OG 이미지
                        <span className="text-xs text-muted-foreground">1200 × 630px 권장</span>
                      </FormLabel>
                      <div className="flex gap-3 items-center">
                        <div className="w-30 h-16 border rounded-lg flex items-center justify-center text-2xl flex-shrink-0 cursor-pointer">
                          🖼
                        </div>
                        <div className="flex-1 space-y-2">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <Button size="sm" variant="ghost">
                            이미지 교체
                          </Button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6 sticky top-20 flex-1">
            {/* SEO 진단 점수 */}
            <Card>
              <CardHeaderTypeB
                content="현재 설정 기준으로 자동 분석한 결과입니다."
                title="SEO 진단 점수"
              >
                <Badge variant="secondary">양호</Badge>
              </CardHeaderTypeB>
              <CardContent className="space-y-4">
                <ProgressGroup scores={seoScores} />
              </CardContent>
            </Card>

            {/* 실시간 검색 미리보기 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center gap-2">검색 결과 미리보기</CardTitle>
                <div className="flex border rounded-md">
                  <Button
                    className="rounded-r-none"
                    size="sm"
                    type="button"
                    variant={previewTab === 'google' ? 'default' : 'ghost'}
                    onClick={() => setPreviewTab('google')}
                  >
                    Google
                  </Button>
                  <Button
                    className="rounded-l-none"
                    size="sm"
                    type="button"
                    variant={previewTab === 'naver' ? 'default' : 'ghost'}
                    onClick={() => setPreviewTab('naver')}
                  >
                    Naver
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {previewTab === 'google' ? (
                  <div className="p-4 bg-background border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-full" />
                      <span className="text-sm text-muted-foreground">coretech.co.kr</span>
                    </div>
                    <div className="text-lg text-blue-600 hover:underline cursor-pointer mb-1">
                      {defaultSerpTitle}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="text-xs">2024. 10. 7.</span> — {defaultDescriptionText}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 border rounded-lg">
                    <div className="text-xs text-gray-500 mb-2">coretech.co.kr</div>
                    <div className="text-lg text-blue-700 font-bold hover:underline cursor-pointer mb-1">
                      {defaultSerpTitle}
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {defaultDescriptionText}
                    </div>
                  </div>
                )}

                <div className="mt-4 p-3 bg-muted rounded-lg border">
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    픽셀 기준 너비 체크
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span>타이틀</span>
                      <span className="font-mono text-green-600">
                        {defaultSerpTitle.length}자 · 약{' '}
                        {Math.min(600, defaultSerpTitle.length * 9)}
                        px / 600px
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>설명</span>
                      <span className="font-mono text-green-600">
                        {defaultDescriptionText.length}자 · 약{' '}
                        {Math.min(920, defaultDescriptionText.length * 9)}
                        px / 920px
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContainer>

        {/* 페이지별 SEO 메타 설정 */}
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2">페이지별 SEO 메타 설정</CardTitle>
              <CardDescription>
                각 페이지를 클릭하면 개별 SEO 설정을 펼쳐서 편집할 수 있습니다.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-100 text-green-800" variant="secondary">
                완료 {completedCount}
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800" variant="secondary">
                미설정 {incompleteCount}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {PAGES_SEO_MOCK.map((page) => {
              const pageFilled = isPageSeoComplete(page, watchedPages[page.path])
              return (
                <Collapsible
                  key={page.path}
                  open={expandedPages.includes(page.path)}
                  onOpenChange={() => handleTogglePageExpansion(page.path)}
                >
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="flex flex-col items-start gap-3">
                        <Badge className="font-mono text-xs" variant="outline">
                          {page.path}
                        </Badge>
                        <div className="font-medium">{page.name}</div>
                        <div
                          className={`text-sm ${
                            pageFilled ? 'text-muted-foreground' : 'text-yellow-600'
                          }`}
                        >
                          <PageSeoRowPreview control={control} page={page} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            pageFilled
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }
                          variant={pageFilled ? 'secondary' : 'outline'}
                        >
                          {pageFilled ? '설정됨' : '미설정'}
                        </Badge>
                        <span className="text-muted-foreground">
                          {expandedPages.includes(page.path) ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </span>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4 border-l border-r border-b rounded-b-lg bg-muted/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={control}
                          name={pageSeoField(page.path, 'title')}
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel className="flex items-center justify-between">
                                페이지 타이틀
                                <span className="text-xs text-muted-foreground">
                                  {String(field.value ?? page.title ?? '').length} / 60자
                                </span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="페이지 타이틀을 입력하세요"
                                  value={(field.value as string) ?? ''}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={pageSeoField(page.path, 'titleSuffix')}
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel className="flex items-center justify-between">
                                타이틀 접미사 (이 페이지)
                                <span className="text-xs text-muted-foreground">
                                  {String(field.value ?? page.titleSuffix ?? '').length} / 60자
                                </span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="예: 회사명·브랜드 슬로건"
                                  value={(field.value as string) ?? ''}
                                />
                              </FormControl>
                              <FormDescription>
                                페이지명 뒤에 붙는 브랜드·슬로건(구분자로 연결).
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={pageSeoField(page.path, 'titleSeparator')}
                          render={({ field }) => {
                            const handlePageSeparatorChange = (next: string) => {
                              field.onChange(next)
                            }

                            return (
                              <FormItem className="md:col-span-2">
                                <FormControl>
                                  <TitleSeparatorPicker
                                    value={field.value ?? page.titleSeparator}
                                    onChange={handlePageSeparatorChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />

                        {page.description !== undefined && (
                          <FormField
                            control={control}
                            name={pageSeoField(page.path, 'description')}
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <div className="flex items-center justify-between">
                                  <FormLabel>
                                    메타 설명
                                    {page.description === '' && (
                                      <span className="text-xs text-yellow-600">⚠ 비어있음</span>
                                    )}
                                  </FormLabel>
                                  <span className="text-xs text-muted-foreground">
                                    {String(field.value ?? page.description ?? '').length} / 160자
                                  </span>
                                </div>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    placeholder="메타 설명을 입력하세요. (120~160자 권장)"
                                    rows={2}
                                    value={(field.value as string) ?? ''}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {page.canonicalUrl && (
                          <FormField
                            control={control}
                            name={`pages.${page.path}.canonicalUrl`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Canonical URL</FormLabel>
                                <div className="flex">
                                  <div className="px-3 py-2 bg-green-100 text-green-800 border border-r-0 rounded-l-md text-xs">
                                    https://
                                  </div>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      className="rounded-l-none font-mono text-xs"
                                      value={(field.value as string) ?? ''}
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {page.robots && (
                          <FormField
                            control={control}
                            name={pageSeoField(page.path, 'robots')}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>robots 설정</FormLabel>
                                <Select
                                  value={(field.value as string) ?? page.robots}
                                  onValueChange={(value) =>
                                    handleRobotsChange(value, field.onChange)
                                  }
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="index, follow">
                                      index, follow (기본)
                                    </SelectItem>
                                    <SelectItem value="noindex, follow">noindex, follow</SelectItem>
                                    <SelectItem value="index, nofollow">index, nofollow</SelectItem>
                                    <SelectItem value="noindex, nofollow">
                                      noindex, nofollow
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {page.ogImage && (
                          <FormField
                            control={control}
                            name={pageSeoField(page.path, 'ogImage')}
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>OG 이미지 (이 페이지 전용)</FormLabel>
                                <div className="flex gap-2 items-center">
                                  <div className="w-20 h-11 border rounded-md flex items-center justify-center text-lg flex-shrink-0 cursor-pointer">
                                    🖼
                                  </div>
                                  <FormControl>
                                    <Input {...field} value={(field.value as string) ?? ''} />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
