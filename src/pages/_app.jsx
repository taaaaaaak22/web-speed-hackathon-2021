import '../styles/index.css'
import 'tailwindcss/tailwind.css'

import React from 'react'
import Head from 'next/head'
import { AppPage } from '../components/application/AppPage'
import { Auth } from '../components/modal/Auth'
import { NewPostModal } from '../components/modal/NewPostModal'
import { useRouter } from 'next/router'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useFetch } from '../hooks/use_fetch'
import { fetchJSON } from '../utils/fetchers'

function MyApp({ Component, pageProps }) {
  const { isReady } = useRouter()

  const [activeUser, setActiveUser] = React.useState(null)
  const { data, isLoading } = useFetch('/api/v1/me', fetchJSON)
  React.useEffect(() => {
    setActiveUser(data)
  }, [data])

  const [modalType, setModalType] = React.useState('none')
  const handleRequestOpenAuthModal = React.useCallback(
    () => setModalType('auth'),
    []
  )
  const handleRequestOpenPostModal = React.useCallback(
    () => setModalType('post'),
    []
  )
  const handleRequestCloseModal = React.useCallback(
    () => setModalType('none'),
    []
  )

  if (!isReady || isLoading) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>読込中 - CAwitter</title>
        </Helmet>
      </HelmetProvider>
    )
  }

  if (typeof window !== 'undefined') {
    window.__BUILD_INFO__ = {
      BUILD_DATE: process.env.BUILD_DATE,
      COMMIT_HASH: process.env.COMMIT_HASH,
    }
  }

  return (
    <>
      <Head>
        <title>CAwitter</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div id="app">
        <AppPage
          activeUser={activeUser}
          onRequestOpenAuthModal={handleRequestOpenAuthModal}
          onRequestOpenPostModal={handleRequestOpenPostModal}
        >
          <Component {...pageProps} />
        </AppPage>

        {modalType === 'auth' ? (
          <Auth
            onRequestCloseModal={handleRequestCloseModal}
            onUpdateActiveUser={setActiveUser}
          />
        ) : null}

        {modalType === 'post' ? (
          <NewPostModal onRequestCloseModal={handleRequestCloseModal} />
        ) : null}
      </div>
      <div id="modal"></div>
    </>
  )
}

export default MyApp
