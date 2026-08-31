'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { Product } from '@/data/products'
import { fadeUpVariant, noAnimation } from '@/lib/animations'
import { ArrowRight } from 'lucide-react'

const categoryEmoji: Record<string, string> = {
  Möbel: '🪑',
  Elektronik: '🎹',
  Leuchten: '💡',
  Geschirr: '🍽️',
  Stühle: '🪑',
  Tische: '🪑',
  Sofas: '🛋️',
  Küche: '🫙',
  Bücher: '📚',
  Deko: '🏺',
}

const categoryBg: Record<string, string> = {
  Möbel: 'from-cream-100 to-cream-200',
  Elektronik: 'from-blue-50 to-slate-100',
  Leuchten: 'from-amber-50 to-yellow-100',
  Geschirr: 'from-rose-50 to-pink-100',
}

export default function ProductCard({ product }: { product: Product }) {
  const prefersReducedMotion = useReducedMotion()
  const bg = categoryBg[product.category] ?? 'from-cream-50 to-cream-100'

  return (
    <motion.div
      variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_8px_32px_rgba(153,53,86,0.1)] transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className={`relative aspect-square bg-gradient-to-br ${bg} overflow-hidden flex items-center justify-center`}>
        <span
          className="text-5xl group-hover:scale-110 transition-transform duration-500"
          aria-hidden
        >
          {categoryEmoji[product.category] ?? '📦'}
        </span>
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="bg-rosa-600 text-white rounded-full text-xs font-medium px-2.5 py-1">
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">{product.category}</p>
        <h3 className="text-sm font-medium text-gray-900 leading-snug mb-2 flex-1 line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-rosa-600 font-semibold">CHF {product.price}.–</span>
          <button className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-rosa-600 font-medium transition-colors group-hover:text-rosa-600 min-h-[44px]">
            Anfragen <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
