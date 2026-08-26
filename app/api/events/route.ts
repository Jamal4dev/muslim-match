import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getUserFromAuthHeader } from '@/lib/auth'
import { eventSchema } from '@/lib/validators'

export async function GET(req: Request) {
  const user = await getUserFromAuthHeader(req.headers.get('authorization'))
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin.from('events').select('*').order('scheduled_at', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ events: data })
}

export async function POST(req: Request) {
  const user = await getUserFromAuthHeader(req.headers.get('authorization'))
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = eventSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid input', details: parsed.error.flatten() }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('events')
    .insert({
      created_by: user.id,
      title: parsed.data.title,
      event_type: parsed.data.event_type,
      scheduled_at: parsed.data.scheduled_at,
      location: parsed.data.location || null,
      mode: parsed.data.mode,
      guardian_visible: true,
      wali_approved: false,
      status: 'PENDING',
    })
    .select('*')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ event: data }, { status: 201 })
}
