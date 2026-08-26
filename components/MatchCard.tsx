'use client'
export default function MatchCard({ match }: { match: any }) {
  async function interest() {
    const token = localStorage.getItem('token')
    const res = await fetch(`/api/matches/${match.profile.user_id}/interest`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    alert(data.message || data.error)
  }

  return (
    <div className="space-y-2 rounded border bg-white p-4">
      <div className="font-semibold">Score: {match.score}</div>
      <div>Location: {match.profile.location || 'N/A'}</div>
      <div>Marriage timeline: {match.profile.marriage_timeline || 'N/A'}</div>
      <div>Halal lifestyle: {match.profile.halal_lifestyle || 'N/A'}</div>
      <button className="rounded bg-slate-900 px-3 py-2 text-white" onClick={interest}>Show interest</button>
    </div>
  )
}
