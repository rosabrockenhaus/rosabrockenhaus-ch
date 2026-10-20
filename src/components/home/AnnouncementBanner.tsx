'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useBanner } from '@/contexts/BannerContext'

type AnnouncementBannerProps = {
  discount: string
  message: string
}

// Shown once per browser session; closing it is remembered until the tab is closed
const STORAGE_KEY = 'rosa-promo-dismissed'

export default function AnnouncementBanner({
  discount,
  message,
}: AnnouncementBannerProps) {
  const { visible, dismiss } = useBanner()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {}
    if (dismissed) return
    const timer = setTimeout(() => setOpen(true), 600)
    return () => clearTimeout(timer)
  }, [])

  const close = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {}
    setOpen(false)
    dismiss()
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!visible || !open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center animate-in zoom-in-90 fade-in duration-300"
      >
        <button
          onClick={close}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          aria-label="Schliessen"
        >
          <X size={18} />
        </button>

        {/* Blinking discount badge */}
        <div className="relative mx-auto mb-6 w-36 h-36">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-rosa-400 opacity-60 animate-ping motion-reduce:animate-none"
          />
          <div className="relative w-full h-full rounded-full bg-rosa-600 text-white flex flex-col items-center justify-center shadow-lg animate-promo-blink motion-reduce:animate-none">
            <span className="font-display text-5xl font-semibold leading-none">{discount}</span>
            <span className="text-sm font-medium uppercase tracking-wider mt-1">auf alles</span>
          </div>
        </div>

        <h2 id="promo-title" className="font-display text-2xl text-gray-900 mb-3">
          {discount} Rabatt im Brockenhaus
        </h2>
        <p className="text-gray-600 mb-8">{message}</p>

        <button
          onClick={close}
          autoFocus
          className="w-full inline-flex items-center justify-center bg-rosa-600 hover:bg-rosa-800 text-white rounded-full px-8 py-3.5 font-medium transition-colors min-h-[48px] cursor-pointer"
        >
          Weiter
        </button>
      </div>
    </div>
  )
}
