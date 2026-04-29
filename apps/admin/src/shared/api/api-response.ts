import { NextResponse } from 'next/server'

export type ApiSuccessResponseType<T> = {
  success: true
  data?: T
  status: number
}

export type ApiErrorResponseType = {
  success: false
  message: string
  status: number
}

export const ApiSuccessResponse = <T>(data: T, status: number = 200) => {
  return NextResponse.json<ApiSuccessResponseType<T>>({ success: true, data, status }, { status })
}

export const ApiErrorResponse = (message: string, status: number = 400) => {
  return NextResponse.json<ApiErrorResponseType>({ success: false, message, status }, { status })
}
