import { supabase } from '@lib/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  supabase.auth.api.setAuthCookie(request, response)
}
