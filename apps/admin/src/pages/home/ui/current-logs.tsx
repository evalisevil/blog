import { Activity, AlertCircle, User } from 'lucide-react'

import { Badge } from '@/shared/ui/shadcn/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card'
import { ScrollArea } from '@/shared/ui/shadcn/scroll-area'

interface LogEntryType {
  id: string
  timestamp: string
  user: string
  action: string
  type: 'info' | 'warning' | 'error' | 'success'
  description: string
}

const mockLogs: LogEntryType[] = [
  {
    id: '1',
    timestamp: '2분 전',
    user: '김철수',
    action: '로그인',
    type: 'success',
    description: '관리자 계정으로 로그인했습니다.',
  },
  {
    id: '2',
    timestamp: '5분 전',
    user: '이영희',
    action: '데이터 수정',
    type: 'info',
    description: '사용자 프로필 정보를 업데이트했습니다.',
  },
  {
    id: '3',
    timestamp: '12분 전',
    user: '박민수',
    action: '시스템 경고',
    type: 'warning',
    description: '메모리 사용량이 80%를 초과했습니다.',
  },
  {
    id: '4',
    timestamp: '18분 전',
    user: '최지은',
    action: '백업 완료',
    type: 'success',
    description: '일일 데이터 백업이 성공적으로 완료되었습니다.',
  },
  {
    id: '5',
    timestamp: '25분 전',
    user: '시스템',
    action: '오류 발생',
    type: 'error',
    description: 'API 연결에 실패했습니다. 재시도가 필요합니다.',
  },
]

const getTypeIcon = (type: LogEntryType['type']) => {
  switch (type) {
    case 'success':
      return <Activity className="h-4 w-4 text-green-500" />
    case 'warning':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-500" />
    default:
      return <Activity className="h-4 w-4 text-blue-500" />
  }
}

const getTypeBadgeVariant = (type: LogEntryType['type']) => {
  switch (type) {
    case 'success':
      return 'default'
    case 'warning':
      return 'secondary'
    case 'error':
      return 'destructive'
    default:
      return 'outline'
  }
}

export const CurrentLogs = () => {
  return (
    <Card className="h-[400px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">최근 활동 로그</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px] px-6">
          <div className="space-y-4">
            {mockLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex-shrink-0 mt-0.5">{getTypeIcon(log.type)}</div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{log.action}</span>
                      <Badge className="text-xs" variant={getTypeBadgeVariant(log.type)}>
                        {log.type}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {log.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{log.user}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
