import 'dayjs/locale/ko' // 한국어 설정

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('ko')

export const getRelativeDate = (date: Date) => {
  return dayjs(date).fromNow()
}
