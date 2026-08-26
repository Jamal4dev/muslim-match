'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Profile = Record<string, unknown> | null

type Recommendation = {
  profile: {
    user_id: string
    location?: string
    marriage_timeline?: string
  }
  score: number
}

type Event = {
  id: string
  title: string
  scheduled_at: string
  mode?: string
  location?: string
}

const profileFields = ['location', 'marriage_timeline', 'halal_lifestyle', 'religiosity', 'education', 'occupation']

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadDashboard() {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Please sign in to view your account.')
        setLoading(false)
        return
      }

      const headers = { Authorization: `Bearer ${token}` }
      try {
        const [meResponse, matchesResponse, eventsResponse] = await Promise.all([
          fetch('/api/me', { headers }),
          fetch('/api/matches/recommendations', { headers }),
          fetch('/api/events', { headers }),
        ])
        const meData = await meResponse.json()
        const matchesData = await matchesResponse.json()
        const eventsData = await eventsResponse.json()
        if (!meResponse.ok) throw new Error(meData.error || 'Could not load your account.')
        setProfile(meData.profile || {})
        setRecommendations(matchesData.matches?.slice(0, 3) || [])
        setEvents(eventsData.events?.slice(0, 3) || [])
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Could not load your dashboard.')
      } finally {
        setLoading(false)
      }
    }
    loadDashboard()
  }, [])

  const completedFields = profileFields.filter((field) => Boolean(profile?.[field])).length
  const completion = Math.round((completedFields / profileFields.length) * 100)

  return (
    <main className="container mx-auto min-h-[calc(100vh-64px)] px-4 py-10 lg:px-0">
      <div className="mb-8">
        <div>
          <div className="eyebrow mb-2">Your private space</div>
          <h1 className="text-4xl font-black text-white">Assalamu alaikum</h1>
          <p className="mt-2 text-emerald-100/70">Take the next thoughtful step in your journey.</p>
        </div>
      </div>

      {loading && <div className="glass-card p-6 text-emerald-100">Loading your account...</div>}
      {error && !loading && (
        <div className="glass-card border-red-300/30 p-6 text-red-100">
          {error} <Link className="ml-2 underline" href="/login">Go to login</Link>
        </div>
      )}

      {!loading && !error && (
        <>
          <section className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="glass-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="eyebrow mb-2">Profile strength</div>
                  <h2 className="text-2xl font-bold text-white">Build trust before conversation</h2>
                  <p className="mt-2 max-w-xl leading-7 text-emerald-100/70">A complete profile helps people understand your values and makes recommendations more meaningful.</p>
                </div>
                <div className="text-3xl font-black text-amber-300">{completion}%</div>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-amber-300" style={{ width: `${completion}%` }} /></div>
              <Link className="primary-button mt-6" href="/profile">{completion === 100 ? 'Review profile' : 'Complete profile'}</Link>
            </div>

            <div className="glass-card p-6">
              <div className="eyebrow mb-2">Respectful by default</div>
              <h2 className="text-xl font-bold text-white">Keep your intention clear</h2>
              <p className="mt-3 leading-7 text-emerald-100/70">Take conversations at a healthy pace, protect personal information, and involve family when you are ready.</p>
              <Link className="secondary-button mt-5" href="/events">Explore community events</Link>
            </div>
          </section>

          <section className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="glass-card p-6">
              <div className="mb-5 flex items-center justify-between gap-3"><div><div className="eyebrow mb-2">Compatibility</div><h2 className="text-2xl font-bold text-white">Recommended for you</h2></div><Link className="text-sm font-bold text-amber-300" href="/matches">See all</Link></div>
              {recommendations.length > 0 ? <div className="space-y-3">{recommendations.map((match) => <div className="rounded-2xl border border-white/10 bg-white/5 p-4" key={match.profile.user_id}><div className="flex items-center justify-between gap-3"><div><div className="font-bold text-white">A promising connection</div><div className="mt-1 text-sm text-emerald-100/65">{match.profile.location || 'Location private'} · {match.profile.marriage_timeline || 'Timeline not shared'}</div></div><div className="font-bold text-amber-300">{match.score}%</div></div></div>)}</div> : <p className="text-emerald-100/65">Complete your profile to unlock more compatible recommendations.</p>}
            </div>

            <div className="glass-card p-6">
              <div className="mb-5 flex items-center justify-between gap-3"><div><div className="eyebrow mb-2">Community</div><h2 className="text-2xl font-bold text-white">Upcoming events</h2></div><Link className="text-sm font-bold text-amber-300" href="/events">Browse all</Link></div>
              {events.length > 0 ? <div className="space-y-3">{events.map((event) => <div className="rounded-2xl border border-white/10 bg-white/5 p-4" key={event.id}><div className="font-bold text-white">{event.title}</div><div className="mt-1 text-sm text-emerald-100/65">{new Date(event.scheduled_at).toLocaleDateString()} · {event.mode || event.location || 'Details available inside'}</div></div>)}</div> : <p className="text-emerald-100/65">No upcoming events yet. Check back soon.</p>}
            </div>
          </section>
        </>
      )}
    </main>
  )
}
