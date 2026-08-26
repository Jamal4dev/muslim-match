'use client'

import { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      
      const installed = localStorage.getItem('pwa_installed')
      if (!installed) {
        setTimeout(() => setShowPrompt(true), 3000)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      localStorage.setItem('pwa_installed', 'true')
    }
    
    setShowPrompt(false)
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa_installed', 'true')
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-lg border border-white/10 bg-[#071a18] p-4 text-emerald-100 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold">Install Muslim Match</p>
          <p className="text-sm text-emerald-100/65">Get quick access to your matches</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDismiss}
            className="rounded px-3 py-2 text-sm hover:bg-white/10"
          >
            Later
          </button>
          <button
            onClick={handleInstall}
            className="primary-button text-sm"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  )
}