import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SuggestedPage from '@/components/notfound/SuggestedPage'

// Shown for any URL that does not exist (yet or anymore), and for blog posts that were deleted.
// Renders in the root layout only, so it brings its own Navbar and Footer.
// A page that moved for good should rather get a redirect in next.config.ts.

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: true },
}

const pages = [
  { href: '/', label: 'Startseite', text: 'Öffnungszeiten, Aktuelles und alles auf einen Blick.' },
  { href: '/brockenhaus', label: 'Brockenhaus', text: 'Secondhand kaufen und Sachen abgeben.' },
  { href: '/services', label: 'Services', text: 'Umzug, Räumung, Abholung und Reinigung.' },
  { href: '/blog', label: 'Blog', text: 'Aktionen, Anlässe und Wissenswertes.' },
  { href: '/verein', label: 'Verein', text: 'Wer wir sind und wie Sie mitmachen können.' },
  { href: '/kontakt', label: 'Kontakt', text: 'Adresse, Telefon und Anfahrt.' },
]

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="pt-40 pb-12 bg-cream-50 border-b border-rosa-100">
          <div className="container-base">
            <p className="text-rosa-600 text-sm font-medium uppercase tracking-wider mb-2">Fehler 404</p>
            <h1 className="text-gray-900 mb-4">Diese Seite gibt es nicht (mehr)</h1>
            <p className="text-gray-600 max-w-lg">
              Vielleicht wurde sie verschoben oder der Link ist veraltet. Wie im Brockenhaus: Stöbern
              lohnt sich – hier geht es weiter.
            </p>
            <SuggestedPage />
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-base">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-gray-100 p-5 hover:border-rosa-200 hover:shadow-md transition-all"
                >
                  <span>
                    <span className="block font-medium text-gray-900 mb-1">{page.label}</span>
                    <span className="block text-sm text-gray-600">{page.text}</span>
                  </span>
                  <ArrowRight
                    size={18}
                    className="mt-1 shrink-0 text-rosa-600 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
