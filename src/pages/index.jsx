import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { InfiniteScroll } from '../components/foundation/InfiniteScroll'
import { TimelinePage } from '../components/timeline/TimelinePage'
import { useInfiniteFetch } from '../hooks/use_infinite_fetch'
import { fetchJSON } from '../utils/fetchers'

/** @type {React.VFC} */
const IndexPage = () => {
  const { data: posts, fetchMore } = useInfiniteFetch(
    '/api/v1/posts',
    fetchJSON
  )

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>タイムライン - CAwitter</title>
        </Helmet>
      </HelmetProvider>
      <InfiniteScroll fetchMore={fetchMore} items={posts}>
        <TimelinePage timeline={posts} />
      </InfiniteScroll>
    </>
  )
}

export default IndexPage
