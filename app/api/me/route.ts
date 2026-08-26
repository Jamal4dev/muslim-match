import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getUserFromAuthHeader } from '@/lib/auth'

export async function GET(req: Request) {
  const user = await getUserFromAuthHeader(req.headers.get('authorization'))
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin.from('users').select('*').eq('id', user.id).maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  const { data: profile } = await supabaseAdmin.from('profiles').select('*').eq('user_id', user.id).maybeSingle()

  return NextResponse.json({ user: data, profile })
}
