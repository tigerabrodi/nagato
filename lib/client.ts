import { createClient } from '@supabase/supabase-js'
import { GetServerSidePropsContext } from 'next'

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const redirectAuthenticatedUsers = async ({
  req,
}: GetServerSidePropsContext) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: '/rooms' } }
  }

  return { props: {} }
}

export { supabase, redirectAuthenticatedUsers }
