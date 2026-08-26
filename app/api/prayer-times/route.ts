import { NextResponse } from 'next/server'
import { getPrayerTimesByCity } from '@/lib/prayers'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city')
  const country = searchParams.get('country') || 'Nigeria'

  if (!city) return NextResponse.json({ error: 'city is required' }, { status: 400 })

  const data = await getPrayerTimesByCity(city, country)
  return NextResponse.json(data)
}
