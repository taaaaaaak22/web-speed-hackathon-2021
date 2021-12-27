import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useRouter } from 'next/router'

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll'
import { UserProfilePage } from '../../components/user_profile/UserProfilePage'
import { useFetch } from '../../hooks/use_fetch'
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch'
import { fetchJSON } from '../../utils/fetchers'

/** @type {React.VFC} */
const UserProfileContainer = ({ initialData, user }) => {
  const router = useRouter()
  const username = router.query.name

  const { data: posts, fetchMore } = useInfiniteFetch(
    `/api/v1/users/${username}/posts`,
    fetchJSON,
    initialData
  )

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{user.name} さんのタイムライン - CAwitter</title>
        </Helmet>
      </HelmetProvider>
      <InfiniteScroll fetchMore={fetchMore} items={posts}>
        <UserProfilePage timeline={posts} user={user} />
      </InfiniteScroll>
    </>
  )
}

UserProfileContainer.getInitialProps = async (ctx) => {
  const username = ctx.query ? ctx.query.name : ctx.pathname.split('/')[1]
  const fetchUser = fetch(
    `${process.env.BASE_URL}://${ctx.req.headers.host}/api/v1/users/${username}`
  )

  const fetchPosts = await fetch(
    `${process.env.BASE_URL}/api/v1/users/${username}/posts`
  )
  const [userResponse, postsRepsonse] = await Promise.all([
    fetchUser,
    fetchPosts,
  ])
  const user = await userResponse.json()
  const posts = await postsRepsonse.json()
  return { initialData: posts, user }
}

export default UserProfileContainer
