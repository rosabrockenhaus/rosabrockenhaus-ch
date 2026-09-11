'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { GraduationCap, CreditCard, Gift, ChevronDown } from 'lucide-react'
import type { Promo } from '@/lib/content'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GraduationCap,
  CreditCard,
  Gift,
}

export default function PromosSection({ promos }: { promos: Promo[] }) {
  const [open, setOpen] = useState<string | null>(null)
  const reduced = useReducedMotion()

  return (
    <section className="bg-rosa-50 border-y border-rosa-100" aria-label="Aktionen & Treuevorteile">
      <div className="container-base py-5">
        <div className="grid sm:grid-cols-3 gap-3">
          {promos.map(({ eyebrow, summary, details, icon }) => {
            const Icon = iconMap[icon] ?? Gift
            const isOpen = open === eyebrow
            return (
              <button
                key={eyebrow}
                onClick={() => setOpen(isOpen ? null : eyebrow)}
                aria-expanded={isOpen}
                className="text-left bg-white rounded-2xl px-5 py-4 border border-rosa-100 hover:border-rosa-300 transition-colors cursor-pointer w-full min-h-[44px]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rosa-100 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-rosa-600" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs text-rosa-600 font-medium uppercase tracking-wide mb-0.5">
                        {eyebrow}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">{summary}</p>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    aria-hidden
                    className={`text-rosa-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      key="details"
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
                      className="overflow-hidden mt-3 space-y-1.5"
                    >
                      {details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-rosa-400 shrink-0 mt-1.5" aria-hidden />
                          {d}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
