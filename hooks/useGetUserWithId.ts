import { Status, useLoadingStore } from '@components/Spinner/store'
import { supabase } from '@lib/client'
import { User } from '@lib/types'
import * as React from 'react'

type Params = {
  userId: string | undefined
  selectProperties: string
}

export const useGetUserWithId = ({ userId, selectProperties }: Params) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [hookStatus, setHookStatus] = React.useState<Status>('idle')

  const { setStatus } = useLoadingStore()

  React.useEffect(() => {
    const getUser = async () => {
      if (user) return
      if (userId) {
        setStatus('loading')
        setHookStatus('loading')
        const { data: userData } = await supabase
          .from<User>('users')
          .select(selectProperties)
          .eq('userId', userId)
          .single()
        setUser(userData)
        setHookStatus('loading')
        setStatus('success')
      }
    }
    getUser()
  }, [selectProperties, user, userId, setStatus])

  return { user, hookStatus, setUser }
}
