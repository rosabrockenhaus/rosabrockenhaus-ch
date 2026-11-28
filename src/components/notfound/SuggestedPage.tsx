'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

// Guess the page the visitor was most likely after from words in the broken URL,
// e.g. an old /blog/… post → Blog, /umzug-bern → Services.
const guesses: { match: RegExp; href: string; label: string }[] = [
  { match: /blog|news|aktuell|aktion|artikel/, href: '/blog', label: 'Blog & Aktuelles' },
  { match: /werkst/, href: '/verein/werkstaette', label: 'Werkstätte' },
  { match: /angebot/, href: '/verein/angebot', label: 'Angebot des Vereins' },
  { match: /verein|ueber|uber|about|mitglied|team/, href: '/verein', label: 'Über den Verein' },
  {
    match: /service|umzug|raeum|raum|abhol|entsorg|reinig|transport|liefer/,
    href: '/services',
    label: 'Services: Umzug, Räumung & Reinigung',
  },
  { match: /brocken|shop|laden|moebel|mobel|kaufen|spende|abgabe/, href: '/brockenhaus', label: 'Brockenhaus' },
  { match: /kontakt|contact|oeffnung|offnung|adresse|anfahrt/, href: '/kontakt', label: 'Kontakt & Öffnungszeiten' },
]

export default function SuggestedPage() {
  const pathname = usePathname() ?? ''
  const path = decodeURIComponent(pathname)
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
  const guess = guesses.find((g) => g.match.test(path))
  if (!guess) return null

  return (
    <Link
      href={guess.href}
      className="group mt-8 inline-flex items-center gap-3 rounded-2xl border border-rosa-200 bg-white px-5 py-4 text-left hover:border-rosa-400 hover:shadow-md transition-all"
    >
      <span>
        <span className="block text-xs font-medium uppercase tracking-wider text-rosa-600">
          Suchen Sie vielleicht…
        </span>
        <span className="block font-medium text-gray-900">{guess.label}</span>
      </span>
      <ArrowRight size={18} className="text-rosa-600 transition-transform group-hover:translate-x-1" />
    </Link>
  )
}
