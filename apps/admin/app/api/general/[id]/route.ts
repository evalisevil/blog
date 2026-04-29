import { prisma } from '@prisma/prisma'
import { NextResponse } from 'next/server'

import { API_RESPONSE_MESSAGES } from '@/shared/config'

/** 일반 게시판 단건 수정 (노출 여부 등) */
export const PATCH = async (request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params
    const body = (await request.json()) as { isVisible?: unknown }

    if (typeof body.isVisible !== 'boolean') {
      return NextResponse.json(
        { error: API_RESPONSE_MESSAGES.ERROR.GENERAL.INVALID_VISIBILITY },
        { status: 400 },
      )
    }

    const existing = await prisma.general.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json(
        { error: API_RESPONSE_MESSAGES.ERROR.GENERAL.NOT_FOUND },
        { status: 404 },
      )
    }

    const updated = await prisma.general.update({
      data: { isVisible: body.isVisible },
      where: { id },
    })

    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: API_RESPONSE_MESSAGES.ERROR.SERVER }, { status: 500 })
  }
}

/** 일반 게시판 단건 삭제 */
export const DELETE = async (_request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params

    const existing = await prisma.general.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json(
        { error: API_RESPONSE_MESSAGES.ERROR.GENERAL.NOT_FOUND },
        { status: 404 },
      )
    }

    await prisma.general.delete({ where: { id } })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: API_RESPONSE_MESSAGES.ERROR.SERVER }, { status: 500 })
  }
}
