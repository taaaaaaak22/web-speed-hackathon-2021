import React from 'react'
import Link from 'next/link'

import dayjs from '../../../utils/dayjs'
import { getProfileImagePath } from '../../../utils/get_path'

/**
 * @typedef {object} Props
 * @property {Models.Comment} comment
 */

/** @type {React.VFC<Props>} */
const CommentItem = ({ comment }) => {
  return (
    <article className="px-1 hover:bg-gray-50 sm:px-4">
      <div className="flex pb-4 pt-2 px-2 border-b border-gray-300 sm:px-4">
        <div className="flex-grow-0 flex-shrink-0 pr-2 sm:pr-4">
          <Link href={`/users/${comment.user.username}`}>
            <a className="block w-8 h-8 bg-gray-300 border border-gray-300 rounded-full hover:opacity-75 overflow-hidden sm:w-12 sm:h-12">
              <img
                alt={comment.user.profileImage.alt}
                src={getProfileImagePath(comment.user.profileImage.id)}
                loading="lazy"
              />
            </a>
          </Link>
        </div>
        <div className="flex-grow flex-shrink min-w-0">
          <p className="whitespace-nowrap text-xs overflow-hidden overflow-ellipsis">
            <Link href={`/users/${comment.user.username}`}>
              <a className="pr-1 text-gray-800 hover:underline font-bold">
                {comment.user.name}
              </a>
            </Link>
            <Link href={`/users/${comment.user.username}`}>
              <a className="pr-1 text-gray-500 hover:underline">
                @{comment.user.username}
              </a>
            </Link>
          </p>
          <p className="text-gray-800 text-sm leading-relaxed">
            {comment.text}
          </p>
          <p className="text-gray-500 text-xs">
            <time dateTime={dayjs(comment.createdAt).toISOString()}>
              {dayjs(comment.createdAt).format('YYYY年M月D日')}
            </time>
          </p>
        </div>
      </div>
    </article>
  )
}

export { CommentItem }
