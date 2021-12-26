import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { TermPage } from '../components/term/TermPage'

/** @type {React.VFC} */
const TermContainer = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>利用規約 - CAwitter</title>
        </Helmet>
        <TermPage />
      </HelmetProvider>
    </>
  )
}

export default TermContainer
