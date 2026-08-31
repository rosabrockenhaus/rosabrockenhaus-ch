'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Heart, Radio, Phone, MapPin } from 'lucide-react'
import { fadeUpVariant, staggerContainer, viewportOnce, noAnimation } from '@/lib/animations'

const items = [
  { icon: Heart,  value: 'Verein', label: 'Gemeinnützig',        sublabel: 'Non-profit · Bern' },
  { icon: Radio,  value: 'SRF',    label: 'Mitenand',            sublabel: 'In den Medien' },
  { icon: Phone,  value: '031',    label: '991 77 00',           sublabel: 'Jetzt anrufen' },
  { icon: MapPin, value: 'Bern',   label: 'Wankdorffeldstr. 96', sublabel: '3014 Bern' },
]

export default function TrustBar() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="container-base">
        <motion.div
          variants={prefersReducedMotion ? noAnimation : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
                className="flex items-center gap-4 py-6 px-5 border-r border-gray-100 last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
              >
                <div className="w-10 h-10 rounded-full bg-rosa-50 flex items-center justify-center shrink-0 border border-rosa-100">
                  <Icon size={16} className="text-rosa-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 leading-tight">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.sublabel}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
