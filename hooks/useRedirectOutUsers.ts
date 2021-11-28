import { useUserContext } from '@lib/userContext'
import { useRouter } from 'next/router'
import * as React from 'react'
import toast from 'react-hot-toast'

export const useRedirectOutUsers = () => {
  const { isAuthenticated } = useUserContext()
  const router = useRouter()

  React.useEffect(() => {
    if (isAuthenticated === false && isAuthenticated !== undefined) {
      toast.error('You must be logged in to view this page.')
      router.push('/')
    }
  }, [isAuthenticated, router])
}
