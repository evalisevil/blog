import { ListCheck } from 'lucide-react'

export const EmptyUnreadInquiry = () => {
  return (
    <div className="flex items-center gap-1.5 p-2 text-sm text-muted-foreground w-full h-full justify-center">
      <ListCheck className="text-muted-foreground" size={16} /> 읽지 않은 문의가 없습니다.
    </div>
  )
}
