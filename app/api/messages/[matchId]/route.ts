import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getUserFromAuthHeader } from '@/lib/auth'
import { messageSchema } from '@/lib/validators'

type Ctx = { params: Promise<{ matchId: string }> }

export async function GET(req: Request, { params }: Ctx) {
  const user = await getUserFromAuthHeader(req.headers.get('authorization'))
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { matchId } = await params

  const { data, error } = await supabaseAdmin
    .from('messages')
    .select('*')
    .eq('match_id', matchId)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ messages: data })
}

export async function POST(req: Request, { params }: Ctx) {
  const user = await getUserFromAuthHeader(req.headers.get('authorization'))
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { matchId } = await params
  const body = await req.json()
  const parsed = messageSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid input', details: parsed.error.flatten() }, { status: 400 })
  }

  const { content, message_type = 'NOTE' } = parsed.data

  const { data: match, error: matchError } = await supabaseAdmin
    .from('matches')
    .select('*')
    .eq('id', matchId)
    .maybeSingle()

  if (matchError) return NextResponse.json({ error: matchError.message }, { status: 400 })
  if (!match) return NextResponse.json({ error: 'match not found' }, { status: 404 })

  const recipientUserId = match.user_id === user.id ? match.candidate_user_id : match.user_id

  const { error } = await supabaseAdmin.from('messages').insert({
    match_id: matchId,
    sender_user_id: user.id,
    recipient_user_id: recipientUserId,
    content,
    message_type,
    is_guardian_visible: true,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ message: 'sent' }, { status: 201 })
}
