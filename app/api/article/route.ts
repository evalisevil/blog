import { NextRequest, NextResponse } from 'next/server'

import {
  deleteDraft,
  insertDraft,
  updateDraft
} from '@/app/services/draftService.ts'
import {
  deletePost,
  insertPost,
  updatePost
} from '@/app/services/postService.ts'

import registerDateFormat from '@/app/utils/registerDateFormat.ts'

export async function handler(req: NextRequest) {
  const { method } = req

  if (method === 'POST') {
    const body = await req.json()
    const type: string = req.nextUrl.searchParams.get('type') || 'posts'

    const registerDate = registerDateFormat(new Date())
    const formData = { ...body, registerDate }

    if (type === 'drafts') {
      const insertedId = await insertDraft(formData)
      return NextResponse.json({
        message: 'Success',
        insertedId
      })
    }

    if (type === 'posts') {
      await insertPost(formData)
      return NextResponse.json({ message: 'Success' })
    }
  }

  if (method === 'PUT') {
    const { _id: id, ...body } = await req.json()
    const type: string = req.nextUrl.searchParams.get('type') || 'posts'

    if (type === 'drafts') {
      await updateDraft(id, { ...body })
    } else {
      await updatePost(id, { ...body })
    }

    return NextResponse.json({ message: 'Success' })
  }

  if (method === 'DELETE') {
    const id: string | null = req.nextUrl.searchParams.get('id')
    const type: string = req.nextUrl.searchParams.get('type') || 'posts'

    if (!id) {
      return NextResponse.json({ message: 'No ID' }, { status: 400 })
    }

    if (type === 'drafts') {
      await deleteDraft(id)
    } else {
      await deletePost(id)
    }

    return NextResponse.json({ message: 'Success' })
  }

  return NextResponse.json({ message: 'Failed' }, { status: 405 })
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
