'use client'
import { useState } from 'react'
import MatchCard from '@/components/MatchCard'
export default function MatchesPage() {
  const [matches, setMatches] = useState<any[]>([])
  async function load() {
    const token = localStorage.getItem('token')
    const res = await fetch('/api/matches/recommendations', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    setMatches(data.matches || [])
  }
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Matches</h1>
      <button className="mb-4 rounded bg-slate-900 px-4 py-2 text-white" onClick={load}>Load recommendations</button>
      <div className="grid gap-4">{matches.map((match, index) => <MatchCard key={index} match={match} />)}</div>
    </main>
  )
}
