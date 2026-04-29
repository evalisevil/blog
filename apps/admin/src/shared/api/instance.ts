import axios, { AxiosError } from 'axios'

// export class AxiosError extends Error {
//   constructor(
//     public message: string,
//     public status: number
//   ) {
//     super(message)
//     this.name = 'ApiError'
//   }
// }

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error instanceof AxiosError) {
      return Promise.reject(error.response?.data.message)
    }
    return Promise.reject(error)
  },
)

/* // 요청 인터셉터 — 토큰 자동 주입
api.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 응답 인터셉터 — 공통 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) signOut()
    if (error.response?.status === 403) redirect('/forbidden')
    return Promise.reject(error)
  }
) */
