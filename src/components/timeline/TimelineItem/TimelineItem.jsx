import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { getProfileImagePath } from '../../../utils/get_path'
import dayjs from '../../../utils/dayjs'
import { ImageArea } from '../../post/ImageArea'
import { MovieArea } from '../../post/MovieArea'
import { SoundArea } from '../../post/SoundArea'

/**
 * @param {Element} target
 * @param {Element} currentTarget
 * @returns {boolean}
 */
const isClickedAnchorOrButton = (target, currentTarget) => {
  while (target !== null) {
    const tagName = target.tagName.toLowerCase()
    if (['button', 'a'].includes(tagName)) {
      return true
    }
    if (currentTarget === target) {
      return false
    }
    target = target.parentNode
  }
  return false
}

/**
 * @typedef {object} Props
 * @property {Models.Post} post
 */

/** @type {React.VFC<Props>} */
const TimelineItem = ({ post }) => {
  const router = useRouter()

  /**
   * ボタンやリンク以外の箇所をクリックしたとき かつ 文字が選択されてないとき、投稿詳細ページに遷移する
   * @type {React.MouseEventHandler}
   */
  const handleClick = React.useCallback(
    (ev) => {
      const isSelectedText = document.getSelection().isCollapsed === false
      if (
        !isClickedAnchorOrButton(ev.target, ev.currentTarget) &&
        !isSelectedText
      ) {
        router.push(`/posts/${post.id}`)
      }
    },
    [post, router]
  )

  return (
    <article className="px-1 hover:bg-gray-50 sm:px-4" onClick={handleClick}>
      <div className="flex pb-4 pt-2 px-2 border-b border-gray-300 sm:px-4">
        <div className="flex-grow-0 flex-shrink-0 pr-2 sm:pr-4">
          <Link href={`/users/${post.user.username}`}>
            <a
              className="block w-12 h-12 bg-gray-300 border border-gray-300 rounded-full hover:opacity-75 overflow-hidden sm:w-16 sm:h-16"
              style={{ position: 'relative' }}
            >
              <Image
                alt={post.user.profileImage.alt}
                src={getProfileImagePath(post.user.profileImage.id)}
                layout="fill"
                objectFit="contain"
              />
            </a>
          </Link>
        </div>
        <div className="flex-grow flex-shrink min-w-0">
          <p className="whitespace-nowrap text-sm overflow-hidden overflow-ellipsis">
            <Link href={`/users/${post.user.username}`}>
              <a className="pr-1 text-gray-800 hover:underline font-bold">
                {post.user.name}
              </a>
            </Link>
            <Link href={`/users/${post.user.username}`}>
              <a className="pr-1 text-gray-500 hover:underline">
                @{post.user.username}
              </a>
            </Link>
            <span className="pr-1 text-gray-500">-</span>
            <Link href={`/posts/${post.id}`}>
              <a className="pr-1 text-gray-500 hover:underline">
                <time dateTime={dayjs(post.createdAt).toISOString()}>
                  {dayjs(post.createdAt).format('YYYY年M月D日')}
                </time>
              </a>
            </Link>
          </p>
          <p className="text-gray-800 leading-relaxed">{post.text}</p>
          {post.images?.length > 0 ? (
            <div className="relative mt-2 w-full">
              <ImageArea images={post.images} />
            </div>
          ) : null}
          {post.movie ? (
            <div className="relative mt-2 w-full">
              <MovieArea movie={post.movie} />
            </div>
          ) : null}
          {post.sound ? (
            <div className="relative mt-2 w-full">
              <SoundArea sound={post.sound} />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export { TimelineItem }
