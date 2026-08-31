import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Share2, Users, Heart } from 'lucide-react'
import { StampLogo } from '@/components/ui/Logo'
import { shopHours } from '@/lib/content'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/kontakt', label: 'Kontakt' },
]

const vereinLinks = [
  { href: '/verein', label: 'Über uns' },
  { href: '/verein/werkstaetten', label: 'Werkstätten' },
  { href: '/verein/angebot', label: 'Angebote' },
  { href: '/verein/transparenz#mitglied', label: 'Mitglied werden' },
  { href: '/verein/transparenz#spenden', label: 'Spenden' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#1a0f14' }} className="text-gray-400">
      {/* Top band */}
      <div className="border-b border-white/5">
        <div className="container-base py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand + contacts */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-flex mb-5" aria-label="Rosa Brockenhaus — Startseite">
                <StampLogo size="sm" />
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Gemeinnütziger Verein in Bern. Secondhand mit Herz — für Nachhaltigkeit und Integration.
              </p>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <MapPin size={14} className="mt-0.5 text-rosa-400 shrink-0" />
                  <span className="text-gray-400">Wankdorffeldstrasse 96<br />3014 Bern</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={14} className="text-rosa-400 shrink-0" />
                  <a href="tel:+41319917700" className="hover:text-white transition-colors duration-200 min-h-[44px] flex items-center">
                    031 991 77 00
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={14} className="text-rosa-400 shrink-0" />
                  <a href="mailto:mail@rosabrockenhaus.ch" className="hover:text-white transition-colors duration-200 min-h-[44px] flex items-center text-xs sm:text-sm break-all">
                    mail@rosabrockenhaus.ch
                  </a>
                </li>
              </ul>

              <div className="flex gap-2 mt-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-rosa-400 hover:text-rosa-400 transition-all duration-200"
                >
                  <Share2 size={15} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-rosa-400 hover:text-rosa-400 transition-all duration-200"
                >
                  <Users size={15} />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.15em] mb-5">Navigation</p>
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all duration-200 min-h-[44px] flex items-center"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verein */}
            <div>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.15em] mb-5">Verein</p>
              <ul className="space-y-1">
                {vereinLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all duration-200 min-h-[44px] flex items-center"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours */}
            <div>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.15em] mb-5">
                {shopHours.label}
              </p>
              <div className="text-sm space-y-2.5">
                <div className="flex items-center gap-2 text-white mb-3">
                  <Clock size={13} className="text-rosa-400" />
                  <span className="text-xs font-medium uppercase tracking-wide">Brocki</span>
                </div>
                <div className="space-y-2 text-gray-400 text-sm">
                  {shopHours.hours.map(({ days, time }) => (
                    <div key={days} className="flex justify-between gap-4">
                      <span>{days}</span>
                      <span className={time === 'geschlossen' ? 'text-gray-600' : 'text-gray-300'}>{time}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 pt-3 border-t border-white/5 text-xs text-gray-600 leading-relaxed italic">
                  {shopHours.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="container-base py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <span>© 2026 Rosa Brockenhaus Hilfswerkverein Bern</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:flex items-center gap-1">
              Gemacht mit <Heart size={11} className="text-rosa-500 mx-0.5" /> in Bern
            </span>
          </div>
          <div className="flex gap-5">
            <Link href="/datenschutz" className="hover:text-gray-400 transition-colors duration-200 min-h-[44px] flex items-center">
              Datenschutz
            </Link>
            <Link href="/impressum" className="hover:text-gray-400 transition-colors duration-200 min-h-[44px] flex items-center">
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
