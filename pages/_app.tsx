import { Navigation } from '@components/Navigation'
import { globalStyles } from '@theme/globalStyles'
import { toastOptions } from '@theme/toastOptions'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  globalStyles()
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        toastOptions={toastOptions}
        containerStyle={{ top: 50 }}
      />
    </>
  )
}
