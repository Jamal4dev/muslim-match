'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(Boolean(localStorage.getItem('token')))
    }
    
    checkAuth()
    
    window.addEventListener('storage', checkAuth)
    window.addEventListener('auth-change', checkAuth)
    return () => {
      window.removeEventListener('storage', checkAuth)
      window.removeEventListener('auth-change', checkAuth)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    window.location.href = '/'
  }

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/profile', label: 'Profile' },
    { href: '/matches', label: 'Matches' },
    { href: '/messages', label: 'Messages' },
    { href: '/events', label: 'Events' },
  ]

  return (
    <nav className="border-b border-white/10 bg-[#071a18] px-4 py-3 text-emerald-100">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4">
        <Link className="font-bold" href="/">
          Muslim Match
        </Link>
        
        {isAuthenticated ? (
          <div className="flex flex-wrap items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#f4c95d]"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="hover:text-[#f4c95d]"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-[#f4c95d]">
              Login
            </Link>
            <Link
              href="/register"
              className="primary-button"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}