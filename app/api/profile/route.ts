import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getUserFromAuthHeader } from '@/lib/auth'
import { profileSchema } from '@/lib/validators'

export async function GET(req: Request) {
  const user = await getUserFromAuthHeader(req.headers.get('authorization'))
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin.from('profiles').select('*').eq('user_id', user.id).maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ profile: data })
}

export async function POST(req: Request) {
  const user = await getUserFromAuthHeader(req.headers.get('authorization'))
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = profileSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid input', details: parsed.error.flatten() }, { status: 400 })
  }

  const payload = { user_id: user.id, ...parsed.data }

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .upsert(payload, { onConflict: 'user_id' })
    .select('*')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  await supabaseAdmin.from('audit_logs').insert({
    actor_user_id: user.id,
    action: 'profile_upsert',
    target_type: 'profiles',
    target_id: data.id,
    metadata: payload,
  })

  return NextResponse.json({ profile: data }, { status: 201 })
}
