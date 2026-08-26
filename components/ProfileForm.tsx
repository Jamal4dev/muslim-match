'use client'
import { useState } from 'react'

export default function ProfileForm() {
  const [form, setForm] = useState({
    bio: '',
    madhhab: '',
    prayer_frequency: 3,
    quran_recitation_level: '',
    hijab_or_beard: '',
    halal_lifestyle: '',
    marriage_timeline: '',
    children_preference: '',
    relocation_willingness: '',
    education: '',
    occupation: '',
    location: '',
    privacy_level: 'MATCHED_ONLY',
    visible_to_wali: true,
    photo_visibility: 'BLURRED',
  })

  async function save() {
    const token = localStorage.getItem('token')
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    if (!res.ok) {
      alert(data.error || 'Failed to save profile')
      return
    }

    alert('Profile saved successfully')
  }

  return (
    <div className="grid gap-3">
      <textarea className="input" placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
      <input className="input" placeholder="Madhhab" value={form.madhhab} onChange={(e) => setForm({ ...form, madhhab: e.target.value })} />
      <input className="input" placeholder="Prayer frequency (0-5)" type="number" value={form.prayer_frequency} onChange={(e) => setForm({ ...form, prayer_frequency: Number(e.target.value) })} />
      <input className="input" placeholder="Quran recitation level" value={form.quran_recitation_level} onChange={(e) => setForm({ ...form, quran_recitation_level: e.target.value })} />
      <input className="input" placeholder="Hijab/beard preference" value={form.hijab_or_beard} onChange={(e) => setForm({ ...form, hijab_or_beard: e.target.value })} />
      <input className="input" placeholder="Halal lifestyle" value={form.halal_lifestyle} onChange={(e) => setForm({ ...form, halal_lifestyle: e.target.value })} />
      <input className="input" placeholder="Marriage timeline" value={form.marriage_timeline} onChange={(e) => setForm({ ...form, marriage_timeline: e.target.value })} />
      <input className="input" placeholder="Children preference" value={form.children_preference} onChange={(e) => setForm({ ...form, children_preference: e.target.value })} />
      <input className="input" placeholder="Relocation willingness" value={form.relocation_willingness} onChange={(e) => setForm({ ...form, relocation_willingness: e.target.value })} />
      <input className="input" placeholder="Education" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} />
      <input className="input" placeholder="Occupation" value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} />
      <input className="input" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <select className="input" value={form.privacy_level} onChange={(e) => setForm({ ...form, privacy_level: e.target.value })}>
        <option value="MATCHED_ONLY">Matched only</option>
        <option value="WALI_ONLY">Wali only</option>
        <option value="PRIVATE">Private</option>
        <option value="PUBLIC">Public</option>
      </select>
      <select className="input" value={String(form.visible_to_wali)} onChange={(e) => setForm({ ...form, visible_to_wali: e.target.value === 'true' })}>
        <option value="true">Visible to wali</option>
        <option value="false">Not visible to wali</option>
      </select>
      <select className="input" value={form.photo_visibility} onChange={(e) => setForm({ ...form, photo_visibility: e.target.value })}>
        <option value="BLURRED">Blurred</option>
        <option value="MATCHED_ONLY">Matched only</option>
        <option value="PRIVATE">Private</option>
      </select>
      <button className="primary-button" onClick={save}>Save profile</button>
    </div>
  )
}
