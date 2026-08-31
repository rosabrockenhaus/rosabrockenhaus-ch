import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { getAllBlogPosts, getBlogPost } from '@/lib/blog'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const contentHtml = post.content
    .split('\n\n')
    .map((para) => {
      if (para.startsWith('**') && para.endsWith('**')) {
        return `<h3 class="text-gray-900 font-medium mt-6 mb-2">${para.slice(2, -2)}</h3>`
      }
      if (para.startsWith('- ')) {
        const items = para
          .split('\n')
          .map((l) => `<li>${l.slice(2)}</li>`)
          .join('')
        return `<ul class="list-disc list-inside space-y-1 text-gray-600">${items}</ul>`
      }
      if (para.startsWith('*') && para.includes('*\n')) {
        return `<h4 class="font-medium text-gray-800 mt-5 mb-1 italic">${para.replace(/\*/g, '')}</h4>`
      }
      return `<p class="text-gray-600 leading-relaxed">${para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`
    })
    .join('\n')

  return (
    <>
      <section className="pt-28 pb-12 bg-cream-50 border-b border-rosa-100">
        <div className="container-base max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rosa-600 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Zurück zum Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-rosa-50 text-rosa-700">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar size={11} />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock size={11} />
              {post.readingTime} Min.
            </span>
          </div>
          <h1 className="text-gray-900 mb-4">{post.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-base max-w-3xl">
          <div
            className="prose prose-sm max-w-none space-y-4"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-rosa-600 font-medium hover:gap-3 transition-all text-sm"
            >
              <ArrowLeft size={14} />
              Alle Beiträge
            </Link>
            <Link
              href="/kontakt"
              className="text-sm text-gray-500 hover:text-rosa-600 transition-colors"
            >
              Kontakt aufnehmen →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
