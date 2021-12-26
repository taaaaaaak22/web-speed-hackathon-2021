import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { NotFoundPage } from '../components/application/NotFoundPage'

/** @type {React.VFC} */
const NotFoundContainer = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>ページが見つかりません - CAwitter</title>
        </Helmet>
        <NotFoundPage />
      </HelmetProvider>
    </>
  )
}

export default NotFoundContainer
