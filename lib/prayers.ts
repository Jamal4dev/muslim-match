export async function getPrayerTimesByCity(city: string, country = 'Nigeria') {
  const url = new URL('https://api.aladhan.com/v1/timingsByCity')
  url.searchParams.set('city', city)
  url.searchParams.set('country', country)
  url.searchParams.set('method', '2')
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Failed to fetch prayer times')
  return res.json()
}
