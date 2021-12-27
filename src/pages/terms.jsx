import React from 'react'
import dynamic from 'next/dynamic'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const TermPage = dynamic(() =>
  import('../components/term/TermPage').then((mod) => mod.TermPage)
)

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
