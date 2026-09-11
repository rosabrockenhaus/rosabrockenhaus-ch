'use client'

import Link from 'next/link'
import { Tag, ArrowRight, X } from 'lucide-react'
import { useBanner } from '@/contexts/BannerContext'

type AnnouncementBannerProps = {
  discount: string
  message: string
  ctaLabel: string
  ctaHref: string
}

export default function AnnouncementBanner({
  discount,
  message,
  ctaLabel,
  ctaHref,
}: AnnouncementBannerProps) {
  const { visible, dismiss } = useBanner()
  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-rosa-600 text-white h-12">
      <div className="container-base h-full flex items-center justify-center gap-4 text-sm font-medium pr-12">
        <Tag size={14} className="shrink-0 opacity-80" aria-hidden />
        <span>
          <strong>{discount} auf alles</strong>
          <span className="hidden sm:inline text-white/85"> — {message}</span>
        </span>
        <Link
          href={ctaHref}
          className="hidden sm:inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/30 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 shrink-0"
        >
          {ctaLabel} <ArrowRight size={11} />
        </Link>
      </div>
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2 flex items-center justify-center cursor-pointer rounded-full hover:bg-white/10"
        aria-label="Banner schließen"
      >
        <X size={14} />
      </button>
    </div>
  )
}
