import { Status } from '@components/Spinner/store'
import { useUserContext } from '@lib/userContext'
import { useRouter } from 'next/router'
import * as React from 'react'

export const useRedirectAuthUsers = () => {
  const [authHookStatus, setAuthHookStatus] = React.useState<Status>('idle')
  const router = useRouter()
  const { isAuthenticated } = useUserContext()

  React.useEffect(() => {
    setAuthHookStatus('loading')
    if (isAuthenticated) {
      router.push('/rooms')
      setAuthHookStatus('success')
      return
    }
    setAuthHookStatus('error')
  }, [isAuthenticated, router])

  return { authHookStatus }
}
