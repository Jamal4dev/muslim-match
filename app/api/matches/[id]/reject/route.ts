import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getUserFromAuthHeader } from '@/lib/auth'

type Ctx = { params: Promise<{ id: string }> }

export async function POST(req: Request, { params }: Ctx) {
  const user = await getUserFromAuthHeader(req.headers.get('authorization'))
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await params

  const { error } = await supabaseAdmin
    .from('matches')
    .update({ status: 'REJECTED', rejected_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ message: 'match rejected' })
}
