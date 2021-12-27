import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useRouter } from 'next/router'

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll'
import { PostPage } from '../../components/post/PostPage'
import { useFetch } from '../../hooks/use_fetch'
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch'
import { fetchJSON } from '../../utils/fetchers'

/** @type {React.VFC} */
const PostContainer = ({ initialData, post }) => {
  const { query } = useRouter()

  const { data: comments, fetchMore } = useInfiniteFetch(
    `/api/v1/posts/${query.id}/comments`,
    fetchJSON,
    initialData
  )

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{post.user.name} さんのつぶやき - CAwitter</title>
        </Helmet>
      </HelmetProvider>
      <InfiniteScroll fetchMore={fetchMore} items={comments}>
        <PostPage comments={comments} post={post} />
      </InfiniteScroll>
    </>
  )
}

PostContainer.getInitialProps = async (ctx) => {
  const id = ctx.query ? ctx.query.id : ctx.pathname.split('/')[2]
  const fetchPost = fetch(`${process.env.BASE_URL}/api/v1/posts/${id}`)

  const fetchComments = await fetch(
    `${process.env.BASE_URL}/api/v1/posts/${id}/comments`
  )
  const [postResponse, comentsRepsonse] = await Promise.all([
    fetchPost,
    fetchComments,
  ])
  const post = await postResponse.json()
  const comments = await comentsRepsonse.json()
  return { initialData: comments, post }
}

export default PostContainer
