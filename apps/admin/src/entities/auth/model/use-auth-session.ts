import { useQuery } from '@tanstack/react-query'

import { api } from '@/shared/api'

export const useAuthSession = () => {
  const { data } = useQuery({
    queryKey: ['auth-session'],
    queryFn: () => api.get('/auth/me'),
  })

  return { data: data?.data }
}
