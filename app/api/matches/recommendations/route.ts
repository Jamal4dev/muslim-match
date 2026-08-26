import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getUserFromAuthHeader } from '@/lib/auth'
import { scoreCompatibility } from '@/lib/matching'

export async function GET(req: Request) {
  const user = await getUserFromAuthHeader(req.headers.get('authorization'))
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { data: myProfile, error: myProfileError } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  if (myProfileError) return NextResponse.json({ error: myProfileError.message }, { status: 400 })
  if (!myProfile) return NextResponse.json({ error: 'create profile first' }, { status: 400 })

  const { data: others, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .neq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  const results = (others || [])
    .map((profile: any) => ({
      profile,
      score: scoreCompatibility(myProfile, profile),
    }))
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, 20)

  return NextResponse.json({ matches: results })
}
