/** 총 페이지가 많을 때 현재 페이지 주변·맨앞·맨뒤 번호와 생략 구간 표시용 슬롯 */
export const getTablePaginationSlots = (
  totalPages: number,
  current: number,
): Array<number | 'ellipsis'> => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }
  const set = new Set<number>([1, totalPages, current, current - 1, current + 1])
  const sorted = [...set].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b)
  const slots: Array<number | 'ellipsis'> = []
  for (let index = 0; index < sorted.length; index += 1) {
    const value = sorted[index]
    if (value === undefined) continue
    const prev = sorted[index - 1]
    if (prev !== undefined && value - prev > 1) {
      slots.push('ellipsis')
    }
    slots.push(value)
  }
  return slots
}
