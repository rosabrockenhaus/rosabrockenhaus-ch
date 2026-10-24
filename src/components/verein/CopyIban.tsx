'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CopyIban({ iban }: { iban: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(iban.replace(/\s/g, ''))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-rosa-600 hover:text-rosa-800 transition-colors cursor-pointer min-h-[32px]"
      aria-label="IBAN kopieren"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Kopiert' : 'Kopieren'}
    </button>
  )
}
