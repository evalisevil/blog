'use client'

import { type FieldValues, useForm } from 'react-hook-form'

import { Badge } from '@/shared/ui/shadcn/badge'
import { Button } from '@/shared/ui/shadcn/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/shadcn/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/shadcn/form'
import { Textarea } from '@/shared/ui/shadcn/textarea'

export const ToolsForm = () => {
  const form = useForm<FieldValues>({
    defaultValues: {
      headCode: `<!-- 네이버 채널톡 -->
<script>
  (function(){var w=window;if(w.ChannelIO){}})();
</script>`,
      bodyCode: `<!-- Google Tag Manager noscript -->
<noscript>...</noscript>`,
    },
  })

  const { control } = form

  const analyticsTools = [
    {
      id: 'ga4',
      name: 'Google Analytics 4 (GA4)',
      description: '측정 ID: G-XXXXXXXXXX',
      icon: '📈',
      color: 'rgba(66,133,244,.15)',
      connected: true,
    },
    {
      id: 'gsc',
      name: 'Google Search Console',
      description: '속성: https://coretech.co.kr',
      icon: '🔍',
      color: 'rgba(0,181,113,.15)',
      connected: true,
    },
    {
      id: 'naver',
      name: '네이버 Search Advisor',
      description: '등록 도메인: coretech.co.kr',
      icon: '🟢',
      color: 'rgba(3,199,90,.15)',
      connected: true,
    },
    {
      id: 'clarity',
      name: 'Microsoft Clarity',
      description: '히트맵 & 세션 녹화',
      icon: '🔥',
      color: 'rgba(255,120,0,.15)',
      connected: false,
    },
    {
      id: 'gtm',
      name: 'Google Tag Manager',
      description: '태그 통합 관리',
      icon: '📦',
      color: 'rgba(79,124,255,.15)',
      connected: false,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Insight Tag',
      description: 'B2B 방문자 분석',
      icon: '💼',
      color: 'rgba(20,110,180,.15)',
      connected: false,
    },
  ]

  const connectedCount = analyticsTools.filter((tool) => tool.connected).length

  const stats = [
    {
      label: 'GA4 일일 이벤트',
      value: '3,204건',
      color: 'rgba(0,229,160,.06)',
      borderColor: 'rgba(0,229,160,.15)',
    },
    {
      label: 'GSC 클릭수 (7일)',
      value: '1,842회',
      color: 'rgba(79,124,255,.06)',
      borderColor: 'rgba(79,124,255,.15)',
    },
    {
      label: 'GSC 노출수 (7일)',
      value: '28,104회',
      color: 'rgba(79,124,255,.06)',
      borderColor: 'rgba(79,124,255,.15)',
    },
    {
      label: '평균 CTR',
      value: '6.57%',
      color: 'rgba(79,124,255,.06)',
      borderColor: 'rgba(79,124,255,.15)',
    },
    {
      label: '평균 게재순위',
      value: '4.2위',
      color: 'rgba(79,124,255,.06)',
      borderColor: 'rgba(79,124,255,.15)',
    },
  ]
  return (
    <Form {...form}>
      <form
      // onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-[1.25] space-y-6">
            {/* 분석 & 마케팅 도구 연동 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📊</span>
                  분석 & 마케팅 도구 연동
                </CardTitle>
                <CardDescription>
                  추적 코드는 &lt;head&gt; 또는 &lt;body&gt;에 자동 삽입됩니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                      style={{ backgroundColor: tool.color }}
                    >
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{tool.name}</div>
                      <div className="text-sm text-muted-foreground">{tool.description}</div>
                    </div>
                    <Badge
                      className={
                        tool.connected
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }
                      variant={tool.connected ? 'secondary' : 'outline'}
                    >
                      {tool.connected ? '연결됨' : '미연결'}
                    </Badge>
                    <Button size="sm" variant={tool.connected ? 'ghost' : 'default'}>
                      {tool.connected ? '설정' : '연결'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 커스텀 스크립트 삽입 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>💻</span>
                  커스텀 스크립트 삽입
                </CardTitle>
                <CardDescription>
                  태그 매니저로 관리하기 어려운 코드를 직접 삽입합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={control}
                  name="headCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>&lt;head&gt; 삽입 코드</FormLabel>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="px-4 py-2 bg-muted border-b">
                          <span className="text-sm font-medium">head injection</span>
                        </div>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[100px] font-mono text-sm border-0 rounded-none resize-none"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="bodyCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>&lt;body&gt; 끝 삽입 코드</FormLabel>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="px-4 py-2 bg-muted border-b">
                          <span className="text-sm font-medium">body injection</span>
                        </div>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[80px] font-mono text-sm border-0 rounded-none resize-none"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* 연동 현황 요약 */}
          <div className="flex-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📋</span>
                  연동 현황 요약
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-xs text-muted-foreground mb-2">연결된 도구</div>
                  <div className="text-2xl font-bold">
                    {connectedCount}{' '}
                    <span className="text-sm font-normal text-muted-foreground">
                      / {analyticsTools.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between p-3 rounded-lg border text-sm"
                      style={{
                        backgroundColor: stat.color,
                        borderColor: stat.borderColor,
                      }}
                    >
                      <span>{stat.label}</span>
                      <span className="font-mono font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full" variant="ghost">
                  Search Console 열기 ↗
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  )
}
