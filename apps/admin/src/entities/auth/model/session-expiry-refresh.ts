import {
  SESSION_COOKIE_MAX_AGE_SECONDS,
  SESSION_COOKIE_REFRESH_MAX_AGE_SECONDS,
} from '../config/constants'

/** 아직 만료 전이고, 남은 시간이 갱신 임계값(기본 24시간) 미만이면 DB·미러 쿠키를 연장 */
export const isWithinSessionRefreshWindow = (expiresAtMs: number, nowMs: number): boolean => {
  if (!Number.isFinite(expiresAtMs) || expiresAtMs <= nowMs) {
    return false
  }
  return expiresAtMs - nowMs < SESSION_COOKIE_REFRESH_MAX_AGE_SECONDS * 1000
}

/** 로그인·세션 조회와 동일하게 세션 절대 만료 시각을 MAX_AGE만큼 연장 */
export const computeExtendedSessionExpiresAtMs = (nowMs: number): number => {
  return nowMs + SESSION_COOKIE_MAX_AGE_SECONDS * 1000
}
