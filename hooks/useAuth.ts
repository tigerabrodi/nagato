import * as React from 'react'
import { supabase } from '@lib/client'
import { useRouter } from 'next/router'
import { AuthChangeEvent, Session } from '@supabase/gotrue-js'

export const useAuth = () => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>()

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session)
        if (event === 'SIGNED_IN') {
          setIsAuthenticated(true)
        }
        if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false)
          router.push('/')
        }
      }
    )
    checkUser()
    return () => {
      authListener?.unsubscribe()
    }
  }, [router])

  function checkUser() {
    const user = supabase.auth.user()
    setIsAuthenticated(Boolean(user))
  }

  async function handleAuthChange(
    event: AuthChangeEvent,
    session: Session | null
  ) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }

  return { isAuthenticated }
}
