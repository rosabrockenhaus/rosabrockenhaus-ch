'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { fadeUpVariant, staggerContainer, viewportOnce, noAnimation } from '@/lib/animations'
import { Download, FileText, ArrowRight, ShieldCheck, Heart } from 'lucide-react'

const years = [
  {
    year: '2025',
    docs: [
      { label: 'Jahresbericht 2025', type: 'PDF' },
      { label: 'Jahresrechnung 2025', type: 'PDF' },
      { label: 'Protokoll GV 2025', type: 'PDF' },
    ],
  },
  {
    year: '2024',
    docs: [
      { label: 'Jahresbericht 2024', type: 'PDF' },
      { label: 'Jahresrechnung 2024', type: 'PDF' },
      { label: 'Protokoll GV 2024', type: 'PDF' },
    ],
  },
  {
    year: '2023',
    docs: [
      { label: 'Jahresbericht 2023', type: 'PDF' },
      { label: 'Jahresrechnung 2023', type: 'PDF' },
      { label: 'Protokoll GV 2023', type: 'PDF' },
    ],
  },
]

export default function TransparenzTeaser() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="section-padding bg-white">
      <div className="container-base">
        {/* Header */}
        <motion.div
          variants={prefersReducedMotion ? noAnimation : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12"
        >
          <motion.p variants={prefersReducedMotion ? noAnimation : fadeUpVariant} className="label-eyebrow mb-3">
            Offenheit & Vertrauen
          </motion.p>
          <motion.div
            variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
            className="flex items-end justify-between gap-4 flex-wrap"
          >
            <h2 className="text-gray-900 font-display">Transparenz</h2>
            <Link
              href="/verein/transparenz"
              className="hidden sm:inline-flex items-center gap-2 text-rosa-600 text-sm font-medium hover:gap-3 transition-all duration-200 min-h-[44px]"
            >
              Vollständige Seite <ArrowRight size={15} />
            </Link>
          </motion.div>
          <motion.p
            variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
            className="text-gray-500 mt-3 max-w-xl"
          >
            Als gemeinnütziger Verein publizieren wir Jahresberichte, Rechnungen und GV-Protokolle.
          </motion.p>
        </motion.div>

        {/* Year cards */}
        <motion.div
          variants={prefersReducedMotion ? noAnimation : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {years.map((y, i) => (
            <motion.div
              key={y.year}
              variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
              className={`rounded-2xl p-6 border ${i === 0 ? 'bg-rosa-50 border-rosa-200' : 'bg-cream-50 border-cream-200'}`}
            >
              <p className="font-display text-2xl font-medium text-gray-900 mb-4">{y.year}</p>
              <div className="space-y-2.5">
                {y.docs.map((doc) => (
                  <a
                    key={doc.label}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-rosa-600 transition-colors group min-h-[40px]"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-rosa-50 transition-colors">
                      <Download size={12} className="text-rosa-500" />
                    </div>
                    <span className="flex-1 leading-tight">{doc.label}</span>
                    <span className="text-xs text-gray-400 font-mono">{doc.type}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Membership + Donation cards */}
        <motion.div
          variants={prefersReducedMotion ? noAnimation : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
        >
          {/* Mitglied */}
          <motion.div
            variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
            className="rounded-2xl p-7 flex flex-col gap-4 border border-rosa-100"
            style={{ background: 'linear-gradient(135deg, #FBEAF0, #FAF8F5)' }}
          >
            <div className="w-10 h-10 rounded-xl bg-rosa-100 flex items-center justify-center">
              <ShieldCheck size={18} className="text-rosa-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">Mitglied werden</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Werden Sie Teil der Rosa Brockenhaus-Familie und unterstützen Sie unsere Mission.
              </p>
            </div>
            <div className="space-y-2">
              {['CHF 100.–/Jahr (Einzelperson)', 'CHF 250.–/Jahr (Firma)'].map((o) => (
                <div key={o} className="flex items-center gap-2 text-sm text-gray-700">
                  <FileText size={12} className="text-rosa-400 shrink-0" />
                  <span>{o}</span>
                </div>
              ))}
            </div>
            <Link
              href="/verein/transparenz#mitglied"
              className="mt-auto inline-flex items-center gap-2 text-rosa-600 text-sm font-medium hover:gap-3 transition-all duration-200 min-h-[44px]"
            >
              Jetzt Mitglied werden <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Spenden */}
          <motion.div
            variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
            className="rounded-2xl p-7 flex flex-col gap-4 border border-cream-200 bg-cream-50"
          >
            <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center">
              <Heart size={18} className="text-rosa-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">Spenden</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Jede Spende fliesst direkt in die Beschäftigung und Integration von Menschen.
              </p>
            </div>
            <div className="space-y-2">
              {['IBAN: CH36 0079 0042 4848 2986 8', 'Berner Kantonalbank'].map((o) => (
                <div key={o} className="flex items-center gap-2 text-sm text-gray-700 font-mono text-xs">
                  <FileText size={12} className="text-rosa-400 shrink-0" />
                  <span>{o}</span>
                </div>
              ))}
            </div>
            <Link
              href="/verein/transparenz#spenden"
              className="mt-auto inline-flex items-center gap-2 text-rosa-600 text-sm font-medium hover:gap-3 transition-all duration-200 min-h-[44px]"
            >
              Mehr Infos <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
