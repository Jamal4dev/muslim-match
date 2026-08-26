'use client'
import { useState } from 'react'

export default function EventForm() {
  const [form, setForm] = useState({
    title: '',
    event_type: 'FAMILY_MEETING',
    scheduled_at: '',
    location: '',
    mode: 'IN_PERSON',
  })

  async function save() {
    const token = localStorage.getItem('token')
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    if (!res.ok) {
      alert(data.error || 'Failed to create event')
      return
    }

    alert('Event created')
  }

  return (
    <div className="grid gap-3">
      <input className="
      " placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <select className="
      " value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })}>
        <option value="FAMILY_MEETING">Family meeting</option>
        <option value="SCHOLAR_SESSION">Scholar session</option>
        <option value="CHECK_IN">Check in</option>
      </select>
      <input className="input" placeholder="Scheduled at" value={form.scheduled_at} onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })} />
      <input className="input" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <input className="input" placeholder="Mode" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })} />
      <button className="primary-button" onClick={save}>Create event</button>
    </div>
  )
}
