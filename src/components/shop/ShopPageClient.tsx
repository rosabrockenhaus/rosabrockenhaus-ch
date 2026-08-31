'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Clock, Tag } from 'lucide-react'
import { staggerContainer, fadeUpVariant, viewportOnce, noAnimation } from '@/lib/animations'
import { shopCategories } from '@/lib/content'
import CategoryCard from '@/components/shop/CategoryCard'

export default function ShopPageClient() {
  const reduced = useReducedMotion()

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-cream-50 border-b border-rosa-100">
        <div className="container-base">
          <motion.div
            variants={reduced ? noAnimation : staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={reduced ? noAnimation : fadeUpVariant}
              className="text-rosa-600 text-sm font-medium uppercase tracking-wider mb-2"
            >
              Secondhand Bern
            </motion.p>
            <motion.h1
              variants={reduced ? noAnimation : fadeUpVariant}
              className="text-gray-900 mb-4"
            >
              Unser Sortiment
            </motion.h1>
            <motion.p
              variants={reduced ? noAnimation : fadeUpVariant}
              className="text-gray-600 max-w-xl"
            >
              Täglich neue Fundstücke — Möbel, Kleidung, Bücher, Elektronik und vieles mehr.
              Das Sortiment wechselt laufend: Kommen Sie vorbei und lassen Sie sich überraschen.
            </motion.p>

            {/* Info chips */}
            <motion.div
              variants={reduced ? noAnimation : fadeUpVariant}
              className="flex flex-wrap gap-3 mt-6"
            >
              {[
                { icon: Tag, text: '50% auf alles' },
                { icon: Clock, text: 'Mo–Fr 12–18 · Sa 10–17' },
                { icon: MapPin, text: 'Wankdorffeldstrasse 96, Bern' },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2 bg-white border border-rosa-100 rounded-full px-4 py-1.5 text-sm text-gray-600"
                >
                  <Icon size={13} className="text-rosa-500 shrink-0" aria-hidden />
                  {text}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories grid */}
      <section className="section-padding bg-white">
        <div className="container-base">
          <motion.div
            variants={reduced ? noAnimation : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {shopCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <div className="mt-16 bg-rosa-50 border border-rosa-100 rounded-2xl p-8 text-center">
            <h3 className="text-gray-900 mb-2">Nicht fündig geworden?</h3>
            <p className="text-gray-600 text-sm mb-5 max-w-md mx-auto">
              Unser Sortiment wechselt täglich. Kommen Sie vorbei oder schreiben Sie uns —
              wir informieren Sie gerne bei neuen Lieferungen.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-rosa-600 hover:bg-rosa-800 text-white rounded-full px-6 py-2.5 text-sm font-medium transition-colors min-h-[44px]"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
