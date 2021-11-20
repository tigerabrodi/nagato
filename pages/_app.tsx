import { globalStyles } from '@theme/globalStyles'
import { toastOptions } from '@theme/toastOptions'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  globalStyles()
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        toastOptions={toastOptions}
        containerStyle={{ top: 50 }}
      />
    </>
  )
}
