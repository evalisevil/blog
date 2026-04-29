import { getAuthSession } from '@/entities/auth'
import { ApiErrorResponse, ApiSuccessResponse } from '@/shared/api'
import { API_RESPONSE_MESSAGES } from '@/shared/config/messages'

export const GET = async () => {
  try {
    const row = await getAuthSession()

    if (!row) {
      return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.AUTH.UNAUTHORIZED, 401)
    }

    return ApiSuccessResponse(
      {
        accountId: row.accountId,
        name: row.name,
        role: row.role,
        recentLoginAt: row.recentLoginAt,
        createdAt: row.createdAt,
      },
      200,
    )
  } catch {
    return ApiErrorResponse(API_RESPONSE_MESSAGES.ERROR.SERVER, 500)
  }
}
