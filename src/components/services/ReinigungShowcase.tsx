'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

function VideoCard({ src, label, tag }: { src: string; label: string; tag: 'Vorher' | 'Nachher' }) {
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

function Photo({ src, alt, tag }: { src: string; alt: string; tag: 'Vorher' | 'Nachher' }) {
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

export default function ReinigungShowcase() {
  return (
    <div className="rounded-2xl border border-rosa-100 bg-white p-5">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
        Unsere Arbeit spricht für sich
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Photo
          src="/media/rosa-brockenhaus-reinigung-kueche-raucherwohnung-vorher.jpg"
          alt="Küche einer Raucherwohnung vor der Reinigung — stark verschmutzte Oberschränke"
          tag="Vorher"
        />
        <Photo
          src="/media/rosa-brockenhaus-reinigung-kueche-nachher.jpg"
          alt="Dieselbe Küche nach professioneller Reinigung durch Rosa Brockenhaus Bern"
          tag="Nachher"
        />
        <VideoCard
          src="/media/rosa-brockenhaus-reinigung-dusche-vorher.mp4"
          label="Dusche vorher"
          tag="Vorher"
        />
        <VideoCard
          src="/media/rosa-brockenhaus-reinigung-dusche-nachher.mp4"
          label="Dusche nachher"
          tag="Nachher"
        />
      </div>
    </div>
  )
}
