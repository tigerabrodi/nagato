import * as React from 'react'
import { Footer } from '@components/Footer'
import { Navigation } from '@components/Navigation'
import { globalStyles } from '@theme/globalStyles'
import { toastOptions } from '@theme/toastOptions'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '@lib/userContext'
import { useAuth } from 'hooks/useAuth'
import { Spinner } from '@components/Spinner'
import { useLoadingStore } from '@components/Spinner/store'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { isAuthenticated } = useAuth()

  const { status } = useLoadingStore()

  globalStyles()
  /* Calculate viewport height for mobile */
  React.useEffect(() => {
    function handleResize() {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <UserContext.Provider value={{ isAuthenticated }}>
      <Navigation />
      {status === 'loading' && <Spinner />}
      <Component {...pageProps} />
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={toastOptions}
        containerStyle={{ top: 50 }}
      />
    </UserContext.Provider>
  )
}
