import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useRouter } from 'next/router'

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll'
import { PostPage } from '../../components/post/PostPage'
import { useFetch } from '../../hooks/use_fetch'
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch'
import { fetchJSON } from '../../utils/fetchers'

/** @type {React.VFC} */
const PostContainer = () => {
  const router = useRouter()
  const { query } = useRouter()

  const { data: post, isLoading: isLoadingPost } = useFetch(
    `/api/v1/posts/${query.id}`,
    fetchJSON
  )

  const { data: comments, fetchMore } = useInfiniteFetch(
    `/api/v1/posts/${query.id}/comments`,
    fetchJSON
  )

  if (isLoadingPost) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>読込中 - CAwitter</title>
        </Helmet>
      </HelmetProvider>
    )
  }

  if (post === null) {
    return router.push('/404')
  }

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

export default PostContainer
