import * as React from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@lib/userContext'

export const useRedirectAuthUsers = () => {
  const router = useRouter()
  const { isAuthenticated } = useUserContext()

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/rooms')
    }
  }, [isAuthenticated, router])
}
