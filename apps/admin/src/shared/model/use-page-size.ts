import { useMemo, useState } from 'react'

export const usePageSize = <T>(data: T[]) => {
  const [pageSize, setPageSize] = useState<number>(10)
  const [page, setPage] = useState(1)

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize
    return data.slice(start, start + pageSize)
  }, [page, pageSize, data])

  return { pageSize, setPageSize, page, setPage, paginatedRows }
}
