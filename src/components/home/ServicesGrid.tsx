'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Truck, Home, Sparkles, Recycle, PackageCheck, ArrowRight } from 'lucide-react'
import { fadeUpVariant, staggerContainer, viewportOnce, noAnimation } from '@/lib/animations'

const services = [
  {
    id: 'umzug',
    icon: Truck,
    title: 'Umzug',
    description:
      'Professioneller Umzugsservice für Privatpersonen und Firmen. Wir packen, transportieren und richten ein — zuverlässig.',
    badge: null,
    accent: 'bg-rosa-100',
    size: 'large',
    href: '/services#umzug',
  },
  {
    id: 'raeumung',
    icon: Home,
    title: 'Räumung',
    description:
      'Wohnungsauflösungen, Nachlässe, Keller- und Estrichräumungen. Brauchbares fliesst direkt in unseren Shop.',
    badge: null,
    accent: 'bg-cream-100',
    size: 'large',
    href: '/services#raeumung',
  },
  {
    id: 'reinigung',
    icon: Sparkles,
    title: 'Reinigung',
    description: 'Endreinigung mit Abgabegarantie. Wir sind erst fertig, wenn der Vermieter zufrieden ist.',
    badge: 'Abgabegarantie',
    accent: 'bg-rosa-50',
    size: 'small',
    href: '/services#reinigung',
  },
  {
    id: 'entsorgung',
    icon: Recycle,
    title: 'Entsorgung',
    description: 'Umweltgerechte Entsorgung aller Materialien nach Schweizer Recht.',
    badge: 'Umweltbewusst',
    accent: 'bg-cream-100',
    size: 'small',
    href: '/services#entsorgung',
  },
  {
    id: 'abholung',
    icon: PackageCheck,
    title: 'Abholung',
    description: 'Wir kommen direkt zu Ihnen — Möbel, Kleider, Elektro und mehr. Kostenlos ab Bern.',
    badge: null,
    accent: 'bg-rosa-50',
    size: 'small',
    href: '/services#abholung',
  },
]

export default function ServicesGrid() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="section-padding bg-warm-gradient">
      <div className="container-base">
        {/* Section header */}
        <motion.div
          variants={prefersReducedMotion ? noAnimation : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12"
        >
          <motion.div variants={prefersReducedMotion ? noAnimation : fadeUpVariant} className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-gray-900 font-display">
              Services
            </h2>
            <Link
              href="/services"
              className="hidden sm:inline-flex items-center gap-2 text-rosa-600 text-sm font-medium hover:gap-3 transition-all duration-200 min-h-[44px]"
            >
              Alle anzeigen <ArrowRight size={15} />
            </Link>
          </motion.div>
        </motion.div>

        {/* True bento grid */}
        <motion.div
          variants={prefersReducedMotion ? noAnimation : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]"
        >
          {/* Umzug — spans 2 rows on lg */}
          {services.filter(s => s.size === 'large').map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                className={`group relative ${i === 0 ? 'lg:row-span-2 lg:col-span-1' : ''} ${service.accent} border border-white/80 rounded-3xl p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(153,53,86,0.12)] cursor-pointer`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-white transition-colors shadow-sm">
                    <Icon size={22} className="text-rosa-600" />
                  </div>
                  <h3 className="text-gray-900 font-display text-xl mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
                <Link
                  href={service.href}
                  className="mt-6 inline-flex items-center gap-2 text-rosa-600 text-sm font-medium group-hover:gap-3 transition-all duration-200 min-h-[44px]"
                >
                  Mehr erfahren <ArrowRight size={15} />
                </Link>
              </motion.div>
            )
          })}

          {/* Reinigung + Entsorgung */}
          {services.filter(s => s.size === 'small').map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                className={`group relative ${service.accent} border border-white/80 rounded-3xl p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(153,53,86,0.12)] cursor-pointer`}
              >
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-white/70 backdrop-blur-sm flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
                      <Icon size={20} className="text-rosa-600" />
                    </div>
                    {service.badge && (
                      <span className="bg-rosa-600 text-white rounded-full px-3 py-1 text-xs font-medium">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-gray-900 font-display text-lg mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
                <Link
                  href={service.href}
                  className="mt-4 inline-flex items-center gap-2 text-rosa-600 text-sm font-medium group-hover:gap-3 transition-all duration-200 min-h-[44px]"
                >
                  Anfragen <ArrowRight size={14} />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Mobile CTA */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-rosa-600 font-medium hover:gap-3 transition-all duration-200 min-h-[44px]"
          >
            Alle Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
