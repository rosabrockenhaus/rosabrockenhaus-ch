'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUpVariant, noAnimation } from '@/lib/animations'
import type { ShopCategory } from '@/lib/content'

export default function CategoryCard({ category }: { category: ShopCategory }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      variants={reduced ? noAnimation : fadeUpVariant}
      whileHover={reduced ? undefined : { y: -4 }}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_8px_32px_rgba(153,53,86,0.1)] transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Photo or gradient fallback */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-rosa-100 to-rosa-50">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-rosa-300 text-sm font-medium">Foto folgt</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <h3 className="absolute bottom-3 left-4 right-4 text-white font-display font-medium text-base leading-snug drop-shadow">
          {category.name}
        </h3>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-sm text-gray-500 leading-relaxed flex-1">{category.description}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {category.examples.map((ex) => (
            <li
              key={ex}
              className="text-xs bg-rosa-50 text-rosa-700 rounded-full px-2.5 py-1 font-medium"
            >
              {ex}
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">Im Laden entdecken</span>
          <ArrowRight
            size={14}
            className="text-rosa-400 group-hover:text-rosa-600 group-hover:translate-x-1 transition-all duration-200"
            aria-hidden
          />
        </div>
      </div>
    </motion.div>
  )
}
