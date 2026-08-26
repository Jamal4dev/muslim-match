'use client'
import { useState } from 'react'

export default function MessageThread({ matchId }: { matchId: string }) {
  const [content, setContent] = useState('')
  const [messages, setMessages] = useState<any[]>([])

  async function load() {
    const token = localStorage.getItem('token')
    const res = await fetch(`/api/messages/${matchId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    setMessages(data.messages || [])
  }

  async function send() {
    const token = localStorage.getItem('token')
    const res = await fetch(`/api/messages/${matchId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, message_type: 'NOTE' }),
    })

    const data = await res.json()
    if (!res.ok) {
      alert(data.error || 'Failed')
      return
    }

    setContent('')
    await load()
  }

  return (
    <div className="space-y-3">
      <button className="primary-button" onClick={load}>Load messages</button>
      <div className="space-y-2">
        {messages.map((m) => (
          <div key={m.id} className="rounded border bg-white p-3">
            <div className="text-sm text-slate-500">{m.message_type}</div>
            <div>{m.content}</div>
          </div>
        ))}
      </div>
      <textarea 
        className="input" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Write a respectful message" 
      />
      <button className="primary-button" onClick={send}>Send</button>
    </div>
  )
}