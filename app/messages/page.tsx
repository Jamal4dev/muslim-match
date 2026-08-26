'use client'
import { useState } from 'react'
import MessageThread from '@/components/MessageThread'
export default function MessagesPage() {
  const [matchId, setMatchId] = useState('')
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Messages</h1>
      <input className="mb-4 w-full rounded border p-2" placeholder="Enter match ID" value={matchId} onChange={(e) => setMatchId(e.target.value)} />
      {matchId ? <MessageThread matchId={matchId} /> : <p>Enter a match ID to view the thread.</p>}
    </main>
  )
}
