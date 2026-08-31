import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import { getAllBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Neuigkeiten aus dem Rosa Brockenhaus Bern.',
}

const categoryColors: Record<string, string> = {
  Shop: 'bg-blue-50 text-blue-700',
  Nachhaltigkeit: 'bg-green-50 text-green-700',
  Verein: 'bg-rosa-50 text-rosa-700',
  Werkstätten: 'bg-amber-50 text-amber-700',
}

const categoryEmoji: Record<string, string> = {
  Shop: '🛋️',
  Nachhaltigkeit: '🌱',
  Verein: '🤝',
  Werkstätten: '🧵',
}

export default function BlogPage() {
  const blogPosts = getAllBlogPosts()

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-cream-50 border-b border-rosa-100">
        <div className="container-base">
          <p className="text-rosa-600 text-sm font-medium uppercase tracking-wider mb-2">
            Aktuell
          </p>
          <h1 className="text-gray-900 mb-4">Aus dem Brockenhaus</h1>
          <p className="text-gray-600 max-w-lg">
            Neuigkeiten, Berichte und Gedanken rund um das Rosa Brockenhaus, Nachhaltigkeit und
            das Leben in Bern.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-base">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-rosa-200 hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-cream-100 to-cream-200 flex items-center justify-center text-4xl">
                  {categoryEmoji[post.category] ?? '📝'}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryColors[post.category] ?? 'bg-gray-100 text-gray-600'}`}
                    >
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={11} />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-gray-900 text-base leading-snug mb-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={11} />
                      {post.readingTime} Min. Lesezeit
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-rosa-600 text-sm font-medium group-hover:underline"
                    >
                      Weiterlesen →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
