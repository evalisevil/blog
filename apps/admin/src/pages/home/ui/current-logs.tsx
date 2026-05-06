import { type ActivityLog, type ActivityLogAction, type ActivityLogStatus } from '@prisma/client'
import { IoAddCircleOutline } from 'react-icons/io5'

import { cn, getRelativeDate } from '@/shared/lib'
import { type StatusBadgeType } from '@/shared/types'
import { StatusBadge } from '@/shared/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card'

const getStatusBadgeClass = (status: ActivityLogStatus): StatusBadgeType => {
  let variant: StatusBadgeType = 'neutral'

  switch (status) {
    case 'success':
      variant = 'success'
      break
    case 'info':
      variant = 'info'
      break
    case 'warning':
      variant = 'warning'
      break
    case 'error':
      variant = 'error'
      break
    case 'publish':
      variant = 'neutral'
      break
  }

  return variant
}

const getActivityInfoByAction = (action: ActivityLogAction) => {
  switch (action) {
    case 'login':
      return {
        icon: <IoAddCircleOutline />,
        iconBgColor: 'bg-blue-500',
        iconTextColor: 'text-white',
        label: '로그인',
      }
    case 'logout':
      return {
        icon: <IoAddCircleOutline />,
        iconBgColor: 'bg-red-500',
        iconTextColor: 'text-white',
        label: '로그아웃',
      }
    case 'create':
      return {
        icon: <IoAddCircleOutline />,
        iconBgColor: 'bg-green-500',
        iconTextColor: 'text-white',
        label: '생성',
      }
    case 'update':
      return {
        icon: <IoAddCircleOutline />,
        iconBgColor: 'bg-yellow-500',
        iconTextColor: 'text-white',
        label: '수정',
      }
    case 'delete':
      return {
        icon: <IoAddCircleOutline />,
        iconBgColor: 'bg-gray-500',
        iconTextColor: 'text-white',
        label: '삭제',
      }
    default:
      return {
        icon: <IoAddCircleOutline />,
        iconBgColor: 'bg-gray-500',
        iconTextColor: 'text-white',
        label: '알 수 없음',
      }
  }
}

export const CurrentLogs = ({ activityData }: { activityData: ActivityLog[] }) => {
  return (
    <Card className="py-0 gap-0">
      <CardHeader className="flex items-center justify-between border-b border-border/60 !py-4 px-6">
        <CardTitle className="text-base font-semibold">최근 활동 로그</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] overflow-y-auto overflow-x-hidden relative p-4">
        <ul className="relative m-0 list-none space-y-0 p-0">
          <li className="absolute left-3.5 top-0 bottom-4 w-px bg-slate-200" />
          {activityData.map((activity) => (
            <li key={activity.id} className="relative flex gap-4 pb-6 last:pb-0 [list-style:none]">
              <div
                className={cn(
                  getActivityInfoByAction(activity.action as ActivityLogAction)?.iconBgColor,
                  'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-sm',
                )}
              >
                {getActivityInfoByAction(activity.action as ActivityLogAction)?.icon}
              </div>
              <div className="min-w-0 flex-1 space-y-1 pt-0.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">
                      {getActivityInfoByAction(activity.action as ActivityLogAction)?.label}
                    </span>
                    <StatusBadge
                      label={activity.status.toUpperCase()}
                      variant={getStatusBadgeClass(activity.status)}
                    />
                  </div>
                  <span className="shrink-0 text-xs text-slate-400">
                    {getRelativeDate(activity.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{activity.message}</p>
                <p className="text-xs text-slate-400">{activity.actorName}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
