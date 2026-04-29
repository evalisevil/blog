'use client'

import { type FieldValues, useForm } from 'react-hook-form'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/shadcn/card'
import {
  Form,
  FormControl,
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

export const PolicyForm = () => {
  const form = useForm<FieldValues>({
    defaultValues: {
      ogTitle: '(주)코어테크 — 혁신으로 세상을 바꾸는 기업',
      ogDescription:
        '기술과 신뢰를 바탕으로 고객의 미래를 함께 설계합니다. 클라우드, 데이터 분석, 맞춤형 소프트웨어 개발 전문.',
      ogImage: '/images/og-default.jpg',
      ogType: 'website',
      ogLocale: 'ko_KR',
      twitterCard: 'summary_large_image',
      twitterSite: 'coretech_kr',
      twitterTitle: '(주)코어테크 — 혁신으로 세상을 바꾸는 기업',
      twitterDescription: '기술과 신뢰를 바탕으로 고객의 미래를 함께 설계합니다.',
    },
  })

  const { control } = form

  const handleOgTypeChange = (value: string, onChange: (value: string) => void) => {
    onChange(value)
  }

  const handleOgLocaleChange = (value: string, onChange: (value: string) => void) => {
    onChange(value)
  }

  const handleTwitterCardChange = (value: string, onChange: (value: string) => void) => {
    onChange(value)
  }

  // 실시간 미리보기를 위한 값들
  const ogTitle = form.getValues('ogTitle') || '(주)코어테크 — 혁신으로 세상을 바꾸는 기업'
  const ogDescription =
    form.getValues('ogDescription') ||
    '기술과 신뢰를 바탕으로 고객의 미래를 함께 설계합니다. 클라우드, 데이터 분석, 맞춤형 소프트웨어 개발 전문.'
  return (
    <Form {...form}>
      <form
      // onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-[1.25] space-y-6">
            {/* Open Graph 설정 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📤</span>
                  Open Graph (OG) 설정
                </CardTitle>
                <CardDescription>카카오톡, 페이스북, 슬랙 등 공유 시 표시됩니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={control}
                  name="ogTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>og:title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="ogDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>og:description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="ogImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        og:image
                        <span className="text-xs text-muted-foreground">1200 × 630px 권장</span>
                      </FormLabel>
                      <div className="flex gap-3 items-center">
                        <div className="w-24 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 border rounded-lg flex items-center justify-center text-xl flex-shrink-0 cursor-pointer">
                          🖼
                        </div>
                        <FormControl>
                          <Input {...field} className="flex-1" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="ogType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>og:type</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={(value) => handleOgTypeChange(value, field.onChange)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="website">website</SelectItem>
                          <SelectItem value="article">article</SelectItem>
                          <SelectItem value="organization">organization</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="ogLocale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>og:locale</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={(value) => handleOgLocaleChange(value, field.onChange)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ko_KR">ko_KR (한국어)</SelectItem>
                          <SelectItem value="en_US">en_US (English)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Twitter / X Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🐦</span>
                  Twitter / X Card
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={control}
                  name="twitterCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>twitter:card 타입</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={(value) => handleTwitterCardChange(value, field.onChange)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="summary_large_image">
                            summary_large_image (대형 이미지)
                          </SelectItem>
                          <SelectItem value="summary">summary (소형 이미지)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="twitterSite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>twitter:site (계정)</FormLabel>
                      <div className="flex">
                        <div className="px-3 py-2 bg-muted border border-r-0 rounded-l-md text-sm">
                          @
                        </div>
                        <FormControl>
                          <Input {...field} className="rounded-l-none" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="twitterTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>twitter:title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="twitterDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>twitter:description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* 소셜 공유 미리보기 */}
          <div className="flex-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  소셜 공유 미리보기
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 카카오톡 / 페이스북 스타일 */}
                <div>
                  <div className="text-xs text-muted-foreground mb-3">
                    카카오톡 / 페이스북 스타일
                  </div>
                  <div className="border rounded-lg overflow-hidden bg-background">
                    <div className="flex">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-2xl flex-shrink-0">
                        🏢
                      </div>
                      <div className="p-3 flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground mb-1">coretech.co.kr</div>
                        <div className="font-medium text-sm leading-tight mb-1 line-clamp-2">
                          {ogTitle}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {ogDescription}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 슬랙 / 노션 스타일 */}
                <div>
                  <div className="text-xs text-muted-foreground mb-2">슬랙 / 노션 스타일</div>
                  <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                    <div className="flex">
                      <div className="w-1 bg-blue-500 flex-shrink-0" />
                      <div className="p-3">
                        <div className="text-sm font-semibold text-white mb-1">{ogTitle}</div>
                        <div className="text-xs text-gray-300 mb-2 line-clamp-2">
                          {ogDescription.slice(0, 80)}...
                        </div>
                        <div className="text-xs text-gray-500">coretech.co.kr</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  )
}
