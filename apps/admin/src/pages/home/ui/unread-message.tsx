import { Archive, Mail, MoreHorizontal, Star } from 'lucide-react'

import { Button } from '@/shared/ui/shadcn/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown-menu'
import { ScrollArea } from '@/shared/ui/shadcn/scroll-area'

interface MessageType {
  id: string
  sender: string
  senderAvatar?: string
  subject: string
  preview: string
  timestamp: string
  isImportant: boolean
  isUnread: boolean
}

const mockMessages: MessageType[] = [
  {
    id: '1',
    sender: '김철수',
    subject: '월간 보고서 검토 요청',
    preview:
      '안녕하세요. 이번 달 매출 보고서를 검토해주시면 감사하겠습니다. 특히 마케팅 부분에 대한...',
    timestamp: '10분 전',
    isImportant: true,
    isUnread: true,
  },
  {
    id: '2',
    sender: '이영희',
    subject: '시스템 업데이트 공지',
    preview:
      '다음 주 화요일 오후 2시부터 4시까지 시스템 점검이 예정되어 있습니다. 해당 시간 동안은...',
    timestamp: '1시간 전',
    isImportant: false,
    isUnread: true,
  },
  {
    id: '3',
    sender: '박민수',
    subject: '프로젝트 일정 변경',
    preview: '클라이언트 요청으로 인해 프로젝트 일정이 일주일 연기되었습니다. 새로운 일정표를...',
    timestamp: '2시간 전',
    isImportant: true,
    isUnread: true,
  },
  {
    id: '4',
    sender: '최지은',
    subject: '회의실 예약 확인',
    preview: '내일 오후 3시 회의실 A 예약이 확인되었습니다. 필요한 자료가 있으시면 미리...',
    timestamp: '3시간 전',
    isImportant: false,
    isUnread: true,
  },
  {
    id: '5',
    sender: '정도현',
    subject: '보안 정책 업데이트',
    preview: '새로운 보안 정책이 적용됩니다. 모든 직원은 비밀번호를 변경하고 2단계 인증을...',
    timestamp: '5시간 전',
    isImportant: true,
    isUnread: true,
  },
]

export const UnreadMessage = () => {
  const unreadCount = mockMessages.filter((msg) => msg.isUnread).length

  return (
    <Card className="h-[400px] overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 w-full">
            읽지 않은 문의
            {unreadCount > 0 && (
              <p className="text-xs text-white px-2 py-1 bg-red-400 rounded-sm flex items-center justify-center ml-auto">
                {unreadCount}건
              </p>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px] px-6">
          <div className="space-y-2">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 cursor-pointer ${
                  message.isUnread ? 'bg-muted/30' : ''
                }`}
              >
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-medium text-sm truncate ${
                          message.isUnread ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {message.sender}
                      </span>
                      {message.isImportant && (
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {message.timestamp}
                    </span>
                  </div>

                  <h4
                    className={`text-sm truncate ${
                      message.isUnread
                        ? 'font-semibold text-foreground'
                        : 'font-normal text-muted-foreground'
                    }`}
                  >
                    {message.subject}
                  </h4>

                  <p className="text-xs text-muted-foreground line-clamp-2">{message.preview}</p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="h-8 w-8 p-0 flex-shrink-0" size="sm" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      읽음 표시
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star className="h-4 w-4 mr-2" />
                      중요 표시
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="h-4 w-4 mr-2" />
                      보관함으로
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
