'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { fadeUpVariant, staggerContainer, viewportOnce, noAnimation } from '@/lib/animations'
import { featuredCategories } from '@/lib/content'
import CategoryCard from '@/components/shop/CategoryCard'

export default function ShopTeaser() {
  const reduced = useReducedMotion()

  return (
    <section className="section-padding bg-white">
      <div className="container-base">
        {/* Header */}
        <motion.div
          variants={reduced ? noAnimation : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex items-end justify-between gap-4 mb-10 flex-wrap"
        >
          <div>
            <motion.p variants={reduced ? noAnimation : fadeUpVariant} className="label-eyebrow mb-3">
              Unser Sortiment
            </motion.p>
            <motion.h2 variants={reduced ? noAnimation : fadeUpVariant} className="text-gray-900 font-display">
              Was Sie bei uns finden
            </motion.h2>
          </div>
          <motion.div variants={reduced ? noAnimation : fadeUpVariant}>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-rosa-600 text-sm font-medium hover:gap-3 transition-all duration-200 min-h-[44px]"
            >
              Alle Abteilungen <ArrowRight size={15} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Category grid */}
        <motion.div
          variants={reduced ? noAnimation : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={reduced ? noAnimation : fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 text-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2.5 bg-rosa-600 hover:bg-rosa-800 text-white rounded-full px-8 py-3.5 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group min-h-[48px]"
          >
            Alle Abteilungen entdecken
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
