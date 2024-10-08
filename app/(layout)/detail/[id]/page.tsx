import Link from 'next/link'

import BottomNav from './components/BottomNav.tsx'
import DeletePost from './components/DeletePost.tsx'
import MarkDownPreview from './components/MarkDownPreview.tsx'

import { getPostById, getPrevOrNextPost } from '@/app/services/postService.ts'
import { getNickname } from '@/app/services/profileService.ts'

import Hash from '@/app/components/shared/components/Hash.tsx'
import InnerCol from '@/app/components/shared/components/InnerCol.tsx'
import NoItems from '@/app/components/shared/components/NoItems.tsx'

import convertIdToString from '@/app/utils/convertIdToString.ts'
import dateFormat from '@/app/utils/dateFormat.ts'

import type { ListItemType } from '@/app/types/types'

function Hashes({ hashes }: { hashes: string[] }) {
  return (
    <div className="flex gap-2 mt-6">
      {hashes.map((hash) => (
        <Hash key={hash} hash={hash} />
      ))}
    </div>
  )
}

export default async function Page({
  params: { id }
}: {
  params: { id: string }
}) {
  const [post, nickname, previousPost, nextPost] = await Promise.all([
    getPostById(id),
    getNickname(),
    getPrevOrNextPost(id, 'prev'),
    getPrevOrNextPost(id, 'next')
  ])

  if (!post) {
    return <NoItems />
  }

  return (
    <main>
      <InnerCol>
        <hgroup>
          <h2 className="text-4xl font-bold leading-snug">{post.title}</h2>
          <div className="flex items-center gap-2 mt-10 justify-between">
            <div className="flex items-center gap-2">
              <span>{nickname}</span> &middot;
              <span className="text-gray-500">
                {dateFormat(post.registerDate)}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={`/write?id=${id}&draft=false`}
                className="opacity-70 hover:opacity-100"
              >
                수정
              </Link>
              <DeletePost id={id} />
            </div>
          </div>
        </hgroup>

        <Hashes hashes={post.hashes} />
        <MarkDownPreview contents={post.content} />
        <BottomNav
          prevPost={convertIdToString(previousPost[0] as ListItemType)}
          nextPost={convertIdToString(nextPost[0] as ListItemType)}
        />
      </InnerCol>
    </main>
  )
}
