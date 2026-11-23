'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUpVariant, noAnimation } from '@/lib/animations'
import type { ShopCategory } from '@/lib/content'

export default function CategoryCard({ category }: { category: ShopCategory }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      variants={reduced ? noAnimation : fadeUpVariant}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Photo or gradient fallback */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-rosa-100 to-rosa-50">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.alt}
            fill
            className="object-cover"
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
        <p className="text-sm text-gray-500 leading-relaxed flex-1 whitespace-pre-line">{category.description}</p>
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
      </div>
    </motion.div>
  )
}
