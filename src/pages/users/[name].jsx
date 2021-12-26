import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useRouter } from 'next/router'

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll'
import { UserProfilePage } from '../../components/user_profile/UserProfilePage'
import { useFetch } from '../../hooks/use_fetch'
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch'
import { fetchJSON } from '../../utils/fetchers'

/** @type {React.VFC} */
const UserProfileContainer = () => {
  const router = useRouter()
  const username = router.query.name

  const { data: user, isLoading: isLoadingUser } = useFetch(
    `/api/v1/users/${username}`,
    fetchJSON
  )
  const { data: posts, fetchMore } = useInfiniteFetch(
    `/api/v1/users/${username}/posts`,
    fetchJSON
  )

  if (isLoadingUser) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>読込中 - CAwitter</title>
        </Helmet>
      </HelmetProvider>
    )
  }

  if (user === null) {
    return router.push('/404')
  }

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

export default UserProfileContainer
