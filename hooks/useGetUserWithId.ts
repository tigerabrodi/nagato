import { supabase } from '@lib/client'
import { User } from '@lib/types'
import * as React from 'react'

type Params = {
  userId: string | undefined
  selectProperties: string
}

export const useGetUserWithId = ({ userId, selectProperties }: Params) => {
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    const getUser = async () => {
      if (user) return
      if (userId) {
        const { data: userData } = await supabase
          .from<User>('users')
          .select(selectProperties)
          .eq('userId', userId)
          .single()
        setUser(userData)
      }
    }
    getUser()
  }, [selectProperties, user, userId])

  return user
}
