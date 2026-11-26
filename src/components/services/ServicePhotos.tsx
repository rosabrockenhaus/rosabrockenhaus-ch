import Image from 'next/image'
import type { Service } from '@/lib/content'

// Optional photos per service, managed in Keystatic (Services → Fotos).
// 1 photo: full width. Several: two columns; with an odd count the first one spans both.
export default function ServicePhotos({ photos }: { photos: Service['photos'] }) {
  if (photos.length === 0) return null

  return (
    <div className={photos.length === 1 ? '' : 'grid grid-cols-2 gap-3'}>
      {photos.map((photo, i) => {
        const wide = photos.length === 1 || (photos.length % 2 === 1 && i === 0)
        return (
          <div
            key={photo.image}
            className={`relative overflow-hidden rounded-2xl bg-rosa-50 ${wide ? 'col-span-2 aspect-[4/3]' : 'aspect-square'}`}
          >
            <Image
              src={photo.image}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes={wide ? '(max-width: 1024px) 100vw, 560px' : '(max-width: 1024px) 50vw, 280px'}
            />
          </div>
        )
      })}
    </div>
  )
}
