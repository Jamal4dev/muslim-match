import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getUserFromAuthHeader } from '@/lib/auth'

type Ctx = { params: Promise<{ id: string }> }

export async function POST(req: Request, { params }: Ctx) {
  const user = await getUserFromAuthHeader(req.headers.get('authorization'))
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await params

  const { error } = await supabaseAdmin.from('matches').insert({
    user_id: user.id,
    candidate_user_id: id,
    initiated_by: user.id,
    status: 'PENDING',
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ message: 'interest sent' }, { status: 201 })
}
