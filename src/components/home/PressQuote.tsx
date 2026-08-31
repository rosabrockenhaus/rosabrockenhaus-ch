'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUpVariant, staggerContainer, viewportOnce, noAnimation } from '@/lib/animations'
import { Quote } from 'lucide-react'

const quotes = [
  {
    text: 'Das Rosa Brockenhaus gibt Menschen eine zweite Chance – und Möbeln auch. Ein Vorbild für soziale Integration in Bern.',
    source: 'SRF Mitenand',
    year: '2023',
  },
  {
    text: 'Hier finden sich Schätze, die anderswo weggeworfen würden. Und Menschen, die neue Wege gehen.',
    source: 'Berner Zeitung',
    year: '2022',
  },
  {
    text: 'Nachhaltigkeit und soziale Verantwortung Hand in Hand – das Rosa Brockenhaus macht es vor.',
    source: 'Bund.ch',
    year: '2024',
  },
]

export default function PressQuote() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#2d1a22' }}>
      {/* Subtle warm glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, #D4537E 0%, transparent 70%)' }} />
      </div>

      <div className="container-base relative z-10">
        {/* Header */}
        <motion.div
          variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-14"
        >
          <p className="label-eyebrow text-rosa-300 mb-3">In den Medien</p>
          <h2 className="text-white font-display">Presse</h2>
        </motion.div>

        {/* Quotes */}
        <motion.div
          variants={prefersReducedMotion ? noAnimation : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {quotes.map((quote, i) => (
            <motion.blockquote
              key={i}
              variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
              className="relative rounded-2xl p-7 flex flex-col border border-white/10"
              style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(4px)' }}
            >
              <Quote size={22} className="text-rosa-400 mb-5 opacity-80" />
              <p className="text-gray-200 text-base leading-[1.75] italic flex-1 mb-6">
                {`«${quote.text}»`}
              </p>
              <footer className="flex items-center gap-3 pt-5 border-t border-white/10">
                <div className="w-8 h-8 rounded-full bg-rosa-600/30 flex items-center justify-center shrink-0">
                  <span className="text-rosa-300 text-xs font-semibold">
                    {quote.source.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium leading-none">{quote.source}</p>
                  <p className="text-gray-500 text-xs mt-1">{quote.year}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
