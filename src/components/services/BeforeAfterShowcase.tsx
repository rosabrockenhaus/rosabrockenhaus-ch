'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import type { Service } from '@/lib/content'

// Before/after photos and videos of a service, managed in Keystatic
// (Services → Vorher / Nachher). Shown two per row; hidden when the list is empty.

type Tag = 'Vorher' | 'Nachher'

function VideoCard({ src, label, tag }: { src: string; label: string; tag: Tag }) {
  const [playing, setPlaying] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-[4/3] group">
      <video
        ref={ref}
        src={src}
        className="w-full h-full object-cover"
        playsInline
        controls={playing}
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <button
          onClick={() => {
            ref.current?.play()
            setPlaying(true)
          }}
          aria-label={`Video abspielen: ${label}`}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer"
        >
          <span className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
            <Play size={16} className="text-rosa-600 ml-0.5" fill="currentColor" />
          </span>
        </button>
      )}
      <span
        className={`absolute top-2.5 left-2.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
          tag === 'Vorher' ? 'bg-gray-900/80 text-white' : 'bg-green-600 text-white'
        }`}
      >
        {tag}
      </span>
    </div>
  )
}

function Photo({ src, alt, tag }: { src: string; alt: string; tag: Tag }) {
  return (
    <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
      <Image src={src} alt={alt} fill className="object-cover" sizes="200px" />
      <span
        className={`absolute top-2.5 left-2.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
          tag === 'Vorher' ? 'bg-gray-900/80 text-white' : 'bg-green-600 text-white'
        }`}
      >
        {tag}
      </span>
    </div>
  )
}

export default function BeforeAfterShowcase({ showcase }: { showcase: Service['showcase'] }) {
  if (showcase.items.length === 0) return null

  return (
    <div className="rounded-2xl border border-rosa-100 bg-white p-5">
      {showcase.title && (
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">{showcase.title}</p>
      )}
      <div className="grid grid-cols-2 gap-3">
        {showcase.items.map((item, i) => {
          const tag: Tag = item.tag === 'nachher' ? 'Nachher' : 'Vorher'
          return item.media.discriminant === 'video' ? (
            <VideoCard key={i} src={item.media.value.file} label={item.media.value.label} tag={tag} />
          ) : (
            <Photo key={i} src={item.media.value.image} alt={item.media.value.alt} tag={tag} />
          )
        })}
      </div>
    </div>
  )
}
