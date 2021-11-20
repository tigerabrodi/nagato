import { globalStyles } from '@theme/globalStyles'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  globalStyles()
  return <Component {...pageProps} />
}
