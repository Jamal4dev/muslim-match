import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
const secretKey = process.env.SUPABASE_SECRET_KEY!

export const supabaseBrowser = createClient(
  supabaseUrl,
  publishableKey
)

export const supabaseAdmin = createClient(
  supabaseUrl,
  secretKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)