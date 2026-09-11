import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Wrench, Briefcase } from 'lucide-react'
import { team, verein } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Über uns – Verein',
  description: 'Erfahren Sie mehr über den gemeinnützigen Rosa Brockenhaus Hilfswerkverein Bern.',
}

const links = [
  {
    icon: Wrench,
    title: 'Werkstätten',
    description: 'Textil, Elektro, Möbel, Geschirr, Velo — fünf Werkstätten für eine zweite Chance.',
    href: '/verein/werkstaetten',
    cta: 'Unsere Werkstätten',
  },
  {
    icon: Briefcase,
    title: 'Angebot',
    description: 'Wir bieten Arbeits- und Praktikumsplätze für Menschen nach Burnout, mit Behinderung oder in Reintegration.',
    href: '/verein/angebot',
    cta: 'Für wen wir da sind',
  },
]

export default function VereinPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-rosa-50 border-b border-rosa-100">
        <div className="container-base max-w-3xl">
          <p className="text-rosa-600 text-sm font-medium uppercase tracking-wider mb-2">
            {verein.eyebrow}
          </p>
          <h1 className="text-gray-900 mb-5">{verein.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{verein.intro}</p>
        </div>
      </section>

      {/* Team photo */}
      <section className="bg-rosa-50">
        <div className="container-base max-w-5xl pb-16">
          <div className="relative rounded-3xl overflow-hidden aspect-[21/9]">
            <Image
              src="/media/verein/rosa-brockenhaus-verein-source-01.jpg"
              alt="Team der Werkstätten im Rosa Brockenhaus bei der Arbeit"
              fill
              className="object-cover"
              sizes="1000px"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="container-base">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-rosa-600 text-sm font-medium uppercase tracking-wider mb-2">
                {verein.missionEyebrow}
              </p>
              <h2 className="text-gray-900 mb-5">{verein.missionHeading}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {verein.missionParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <blockquote className="mt-8 border-l-4 border-rosa-300 bg-rosa-50 rounded-r-2xl px-6 py-5 text-gray-700 italic leading-relaxed">
                {verein.quoteText}
                <footer className="mt-2 not-italic text-sm text-rosa-600">{verein.quoteAttribution}</footer>
              </blockquote>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {verein.stats.map((stat) => (
                <div
                  key={stat.sub}
                  className="bg-rosa-50 border border-rosa-100 rounded-2xl p-6 text-center"
                >
                  <p className="text-3xl font-medium text-rosa-600">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.sub}</p>
                </div>
              ))}

              {/* Werkstätten / Angebot links */}
              {links.map(({ icon: Icon, title, description, href, cta }) => (
                <Link
                  key={title}
                  href={href}
                  className="group col-span-2 border border-gray-100 hover:border-rosa-300 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-[0_8px_32px_rgba(198,4,111,0.08)]"
                >
                  <div className="w-11 h-11 rounded-2xl bg-rosa-50 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-rosa-600" />
                  </div>
                  <h3 className="text-gray-900 font-display text-lg mb-2 leading-snug">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-rosa-600 text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
                    {cta} <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vorstand */}
      <section className="section-padding bg-cream-50">
        <div className="container-base max-w-3xl">
          <div className="mb-10">
            <p className="text-rosa-600 text-sm font-medium uppercase tracking-wider mb-2">
              Führung
            </p>
            <h2 className="text-gray-900">Vorstand</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {team.map((person) => (
              <div
                key={person.name}
                className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl"
              >
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-rosa-100">
                  <Image src={person.photo} alt={person.name} fill className="object-cover" sizes="56px" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{person.name}</p>
                  <p className="text-xs text-gray-500">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-rosa-600">
        <div className="container-base text-center">
          <Heart size={32} className="text-rosa-200 mx-auto mb-4" />
          <h2 className="text-white mb-4">{verein.ctaHeading}</h2>
          <p className="text-rosa-200 mb-8 max-w-md mx-auto">{verein.ctaText}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/verein/transparenz#mitglied"
              className="inline-flex items-center gap-2 bg-white text-rosa-600 hover:bg-rosa-50 rounded-full px-7 py-3 font-medium transition-colors"
            >
              Mitglied werden
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/verein/transparenz#spenden"
              className="inline-flex items-center gap-2 border border-rosa-400 text-white hover:bg-rosa-700 rounded-full px-7 py-3 font-medium transition-colors"
            >
              Spenden
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
