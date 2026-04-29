import { createHash, randomBytes } from 'crypto'

/** 세션 토큰 생성 */
export const createSessionToken = (): string => randomBytes(32).toString('base64url')

/** 세션 토큰을 sha256 해쉬 값으로 변환 */
export const hashSessionToken = (token: string): string =>
  createHash('sha256').update(token, 'utf8').digest('hex')
