/** 요청 IP 주소 조회 */
export const getRequestIpAddress = (request: Request): string => {
  const forwardedFor = request.headers.get('x-forwarded-for')

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim() ?? ''
  }

  return request.headers.get('x-real-ip') ?? ''
}

/** 요청 사용자 에이전트 조회 */
export const getRequestUserAgent = (request: Request): string =>
  request.headers.get('user-agent') ?? ''
