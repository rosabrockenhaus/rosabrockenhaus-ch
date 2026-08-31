'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import { fadeUpVariant, staggerContainer, viewportOnce, noAnimation } from '@/lib/animations'
import type { BlogPost } from '@/lib/blog'

export default function Aktuell({ posts }: { posts: BlogPost[] }) {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + 16 : track.clientWidth
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  if (posts.length === 0) return null

  return (
    <section className="section-padding bg-cream-50">
      <div className="container-base">
        <motion.div
          variants={reduced ? noAnimation : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div
            variants={reduced ? noAnimation : fadeUpVariant}
            className="flex items-end justify-between gap-4 mb-10 flex-wrap"
          >
            <div>
              <p className="label-eyebrow mb-3">Aktuell</p>
              <h2 className="text-gray-900 font-display">Neuigkeiten</h2>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-rosa-600 text-sm font-medium hover:gap-3 transition-all duration-200 min-h-[44px] mr-2"
              >
                Alle Beiträge <ArrowRight size={15} />
              </Link>
              <button
                type="button"
                aria-label="Zurück"
                onClick={() => scrollByCard(-1)}
                className="w-10 h-10 rounded-full border border-rosa-200 flex items-center justify-center text-rosa-600 hover:bg-rosa-50 transition-colors"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Weiter"
                onClick={() => scrollByCard(1)}
                className="w-10 h-10 rounded-full border border-rosa-200 flex items-center justify-center text-rosa-600 hover:bg-rosa-50 transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

          <motion.div
            ref={trackRef}
            variants={reduced ? noAnimation : fadeUpVariant}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: 'none' }}
          >
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                data-card
                className="group snap-start shrink-0 basis-[85%] sm:basis-[calc((100%-2rem)/3)] bg-white rounded-2xl border border-gray-100 p-6 flex flex-col hover:shadow-[0_8px_32px_rgba(198,4,111,0.08)] transition-all duration-300"
              >
                <span className="inline-flex items-center gap-1.5 text-xs text-rosa-500 font-medium mb-3">
                  <Calendar size={11} />
                  {post.date}
                </span>
                <h3 className="text-gray-900 font-medium text-base mb-2 leading-snug group-hover:text-rosa-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-rosa-600 text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
                  Lesen <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </motion.div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/blog" className="inline-flex items-center gap-2 text-rosa-600 font-medium hover:gap-3 transition-all duration-200 min-h-[44px]">
              Alle Beiträge <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
