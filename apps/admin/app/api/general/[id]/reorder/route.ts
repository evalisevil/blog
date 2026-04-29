import { prisma } from '@prisma/prisma'
import { NextResponse } from 'next/server'

import { API_RESPONSE_MESSAGES } from '@/shared/config'

const isReorderDirection = (value: unknown): value is 'up' | 'down' =>
  value === 'up' || value === 'down'

/** 일반 게시판: 표시 순서( order ) 위·아래 인접 항목과 교환 */
export const PATCH = async (request: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params
    const body = (await request.json()) as { direction?: unknown }

    if (!isReorderDirection(body.direction)) {
      return NextResponse.json(
        { error: API_RESPONSE_MESSAGES.ERROR.GENERAL.INVALID_REORDER },
        { status: 400 },
      )
    }

    const current = await prisma.general.findUnique({ where: { id } })

    if (!current) {
      return NextResponse.json(
        { error: API_RESPONSE_MESSAGES.ERROR.GENERAL.NOT_FOUND },
        { status: 404 },
      )
    }

    const all = await prisma.general.findMany()
    const sorted = [...all].sort((a, b) => b.order - a.order)
    const index = sorted.findIndex((row) => row.id === id)

    if (index === -1) {
      return NextResponse.json(
        { error: API_RESPONSE_MESSAGES.ERROR.GENERAL.NOT_FOUND },
        { status: 404 },
      )
    }

    if (body.direction === 'up') {
      if (index === 0) {
        return NextResponse.json(
          { error: API_RESPONSE_MESSAGES.ERROR.GENERAL.REORDER_BOUNDARY },
          { status: 400 },
        )
      }
      const above = sorted[index - 1]
      if (!above) {
        return NextResponse.json(
          { error: API_RESPONSE_MESSAGES.ERROR.GENERAL.REORDER_BOUNDARY },
          { status: 400 },
        )
      }
      await prisma.$transaction([
        prisma.general.update({
          data: { order: above.order },
          where: { id: current.id },
        }),
        prisma.general.update({
          data: { order: current.order },
          where: { id: above.id },
        }),
      ])
    } else {
      if (index >= sorted.length - 1) {
        return NextResponse.json(
          { error: API_RESPONSE_MESSAGES.ERROR.GENERAL.REORDER_BOUNDARY },
          { status: 400 },
        )
      }
      const below = sorted[index + 1]
      if (!below) {
        return NextResponse.json(
          { error: API_RESPONSE_MESSAGES.ERROR.GENERAL.REORDER_BOUNDARY },
          { status: 400 },
        )
      }
      await prisma.$transaction([
        prisma.general.update({
          data: { order: below.order },
          where: { id: current.id },
        }),
        prisma.general.update({
          data: { order: current.order },
          where: { id: below.id },
        }),
      ])
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: API_RESPONSE_MESSAGES.ERROR.SERVER }, { status: 500 })
  }
}
