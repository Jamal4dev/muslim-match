import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getUserFromAuthHeader } from '@/lib/auth'

export async function POST(req: Request) {
  const user = await getUserFromAuthHeader(req.headers.get('authorization'))
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { target_type, target_id, reason } = await req.json()

  const { error } = await supabaseAdmin.from('audit_logs').insert({
    actor_user_id: user.id,
    action: 'report',
    target_type,
    target_id,
    metadata: { reason },
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ message: 'reported' }, { status: 201 })
}
