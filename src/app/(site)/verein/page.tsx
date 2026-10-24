import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Wrench, Briefcase, FileText, HandHeart, Users } from 'lucide-react'
import { team, verein, vereinAngebot, vereinWerkstaetten } from '@/lib/content'
import CopyIban from '@/components/verein/CopyIban'

export const metadata: Metadata = {
  title: 'Über uns – Verein',
  description: 'Erfahren Sie mehr über den gemeinnützigen Rosa Brockenhaus Hilfswerkverein Bern.',
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Wrench,
  Briefcase,
  Heart,
}

// Card subtitles come from the linked page's own Keystatic config
const subtitleByHref: Record<string, string> = {
  '/verein/werkstaette': vereinWerkstaetten.subtitle,
  '/verein/angebot': vereinAngebot.subtitle,
}

export default function VereinPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 bg-rosa-50 border-b border-rosa-100">
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
              alt="Team der Werkstätte im Rosa Brockenhaus bei der Arbeit"
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              {verein.stats.map((stat) => (
                <div
                  key={stat.sub}
                  className={`${verein.stats.length % 2 === 1 ? 'col-span-2' : ''} bg-rosa-50 border border-rosa-100 rounded-2xl p-6 text-center`}
                >
                  <p className="text-3xl font-medium text-rosa-600">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.sub}</p>
                </div>
              ))}

              {/* Link cards (Werkstätte / Angebot) — editable in Keystatic */}
              {verein.links.map(({ icon, title, href, cta }) => {
                const Icon = iconMap[icon] ?? Wrench
                const description = subtitleByHref[href]
                return (
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
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Spenden + Mitglied werden — editable in Keystatic */}
      <section className="section-padding bg-rosa-50">
        <div className="container-base max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Spenden */}
            <div id="spenden" className="scroll-mt-28 bg-white border border-rosa-100 rounded-3xl p-8 flex flex-col">
              <div className="w-11 h-11 rounded-2xl bg-rosa-50 flex items-center justify-center mb-5">
                <HandHeart size={20} className="text-rosa-600" />
              </div>
              <h2 className="text-gray-900 font-display text-2xl mb-3">{verein.spenden.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{verein.spenden.text}</p>
              <div className="mt-auto bg-cream-50 border border-cream-200 rounded-2xl p-5 space-y-3 text-sm">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">IBAN</p>
                    <CopyIban iban={verein.spenden.iban} />
                  </div>
                  <p className="font-mono text-base text-gray-900 break-all">{verein.spenden.iban}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Bank</p>
                  <p className="text-gray-900">{verein.spenden.bankName}</p>
                </div>
                {verein.spenden.beneficiary && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Begünstigter</p>
                    <p className="text-gray-900">{verein.spenden.beneficiary}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Mitglied werden */}
            <div id="mitglied" className="scroll-mt-28 bg-white border border-rosa-100 rounded-3xl p-8 flex flex-col">
              <div className="w-11 h-11 rounded-2xl bg-rosa-50 flex items-center justify-center mb-5">
                <Users size={20} className="text-rosa-600" />
              </div>
              <h2 className="text-gray-900 font-display text-2xl mb-3">{verein.mitgliedschaft.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{verein.mitgliedschaft.text}</p>
              <div className="space-y-3 mb-6">
                {verein.mitgliedschaft.fees.map((fee) => (
                  <div
                    key={fee.label}
                    className="flex items-center justify-between gap-4 bg-cream-50 border border-cream-200 rounded-2xl px-5 py-4"
                  >
                    <span className="text-gray-700">{fee.label}</span>
                    <span className="font-medium text-rosa-600 whitespace-nowrap">{fee.price}</span>
                  </div>
                ))}
              </div>
              <Link
                href={verein.mitgliedschaft.ctaHref}
                className="mt-auto inline-flex items-center justify-center gap-2 bg-rosa-600 hover:bg-rosa-800 text-white rounded-full px-7 py-3 font-medium transition-colors min-h-[48px]"
              >
                {verein.mitgliedschaft.ctaLabel} <ArrowRight size={16} />
              </Link>
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

          {verein.statutenPdf && (
            <a
              href={verein.statutenPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 flex items-center gap-4 p-4 bg-white border border-gray-100 hover:border-rosa-300 rounded-xl transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-rosa-50 flex items-center justify-center shrink-0">
                <FileText size={20} className="text-rosa-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">Statuten</p>
                <p className="text-xs text-gray-500">PDF herunterladen</p>
              </div>
              <ArrowRight size={16} className="text-rosa-600 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
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
              href="#mitglied"
              className="inline-flex items-center gap-2 bg-white text-rosa-600 hover:bg-rosa-50 rounded-full px-7 py-3 font-medium transition-colors"
            >
              Mitglied werden
              <ArrowRight size={16} />
            </Link>
            <Link
              href="#spenden"
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
