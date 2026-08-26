'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Mode = 'login' | 'register'

type FormState = {
  full_name: string
  email: string
  password: string
  gender: string
  date_of_birth: string
}

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState<FormState>({
    full_name: '',
    email: '',
    password: '',
    gender: '',
    date_of_birth: '',
  })

  const isRegister = mode === 'register'

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const endpoint = isRegister
      ? '/api/auth/register'
      : '/api/auth/login'

    const payload = isRegister
      ? {
          full_name: form.full_name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          gender: form.gender.trim(),
          date_of_birth: form.date_of_birth,
        }
      : {
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const responseText = await res.text()
      let data: { details?: unknown; error?: string; access_token?: string } = {}

      if (responseText) {
        try {
          data = JSON.parse(responseText)
        } catch {
          data = { error: responseText }
        }
      }

      if (!res.ok) {
        const details =
          typeof data.details === 'string'
            ? data.details
            : data.details
              ? JSON.stringify(data.details)
              : ''

        setError(
          details
            ? `${data.error || 'Request failed'}: ${details}`
            : data.error || 'Request failed'
        )

        return
      }

      if (data.access_token) {
        localStorage.setItem('token', data.access_token)
        window.dispatchEvent(new Event('auth-change'))
      }

      if (isRegister) {
        setMessage(
          'Account created successfully. You can now sign in.'
        )

        setTimeout(() => {
          router.push('/login')
        }, 1200)

        return
      }

      router.push('/dashboard')
    } catch {
      setError(
        'We could not complete the request. Please check your connection and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      {isRegister && (
        <>
          <div>
            <label className="mb-2 block text-sm text-emerald-100">
              Full name
            </label>

            <input
              className="input"
              placeholder="Amina Bello"
              value={form.full_name}
              onChange={(event) =>
                updateField('full_name', event.target.value)
              }
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-emerald-100">
              Gender
            </label>

            <select
              className="input"
              value={form.gender}
              onChange={(event) =>
                updateField('gender', event.target.value)
              }
              required
            >
              <option value="">Select gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-emerald-100">
              Date of birth
            </label>

            <input
              className="input"
              type="date"
              value={form.date_of_birth}
              onChange={(event) =>
                updateField('date_of_birth', event.target.value)
              }
              required
            />
          </div>
        </>
      )}

      <div>
        <label className="mb-2 block text-sm text-emerald-100">
          Email
        </label>

        <input
          className="input"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(event) =>
            updateField('email', event.target.value)
          }
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-emerald-100">
          Password
        </label>

        <div className="relative">
          <input
            className="input pr-20"
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 6 characters"
            value={form.password}
            onChange={(event) =>
              updateField('password', event.target.value)
            }
            minLength={6}
            required
          />

          {!isRegister && (
            <button
              className="absolute inset-y-0 right-3 text-sm font-semibold text-amber-300 hover:text-amber-200"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-300/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {message && (
        <div className="rounded-xl border border-emerald-300/30 bg-emerald-500/10 p-3 text-sm text-emerald-100">
          {message}
        </div>
      )}

      <button
        className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={loading}
      >
        {loading
          ? 'Please wait...'
          : isRegister
            ? 'Create account'
            : 'Sign in'}
      </button>
    </form>
  )
}