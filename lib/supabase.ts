import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Clients are created lazily on first use (not at module load) so that Next.js
// can evaluate this module during build-time page data collection even when
// the Supabase env vars aren't present in the build environment. The vars are
// only required at request time, once the app is actually running.
function createLazyClient(factory: () => SupabaseClient): SupabaseClient {
  let client: SupabaseClient | null = null
  return new Proxy({} as SupabaseClient, {
    get(_target, prop) {
      if (!client) client = factory()
      const value = Reflect.get(client, prop)
      return typeof value === 'function' ? value.bind(client) : value
    },
  })
}

export const supabaseBrowser = createLazyClient(() =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
)

export const supabaseAdmin = createLazyClient(() =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
)