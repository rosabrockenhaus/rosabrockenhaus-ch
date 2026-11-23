import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import Markdoc, { type Config } from '@markdoc/markdoc'
import { Clock, ArrowLeft, CalendarDays, Info } from 'lucide-react'
import { getAllBlogSlugs, getBlogPost, type AktuellPost } from '@/lib/blog'

// Post bodies are Markdoc (what Keystatic's editor writes). Links are what matter most for SEO:
// internal ones go through next/link, external ones open in a new tab.
const markdocConfig: Config = {
  nodes: { link: { ...Markdoc.nodes.link, render: 'BlogLink' } },
}

function BlogLink({ href, title, children }: { href: string; title?: string; children: React.ReactNode }) {
  if (href.startsWith('/') || href.startsWith('#')) {
    return <Link href={href} title={title}>{children}</Link>
  }
  return (
    <a href={href} title={title} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

// Styles the rendered Markdoc (the project has no typography plugin).
const articleClass = [
  'text-gray-600 leading-relaxed space-y-4',
  '[&_h2]:text-gray-900 [&_h2]:font-display [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-3',
  '[&_h3]:text-gray-900 [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-2',
  '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1',
  '[&_strong]:text-gray-900 [&_strong]:font-medium',
  '[&_a]:text-rosa-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-rosa-800',
].join(' ')

type Props = { params: Promise<{ slug: string }> }

// Expired Aktuell posts are still built, so links shared on Instagram etc. keep working.
export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

// schema.org Event for Aktuell posts: lets Google show the date right in search results.
function eventJsonLd(post: AktuellPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: post.title,
    description: post.excerpt,
    startDate: post.date,
    endDate: post.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: `https://www.rosabrockenhaus.ch/blog/${post.slug}`,
    location: {
      '@type': 'Place',
      name: 'Rosa Brockenhaus',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Wankdorffeldstrasse 96',
        postalCode: '3014',
        addressLocality: 'Bern',
        addressCountry: 'CH',
      },
    },
    organizer: { '@type': 'Organization', name: 'Rosa Brockenhaus', url: 'https://www.rosabrockenhaus.ch' },
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    // An offer that is over should not show up in Google any more; the page stays for old links.
    ...(post.kind === 'aktuell' && post.expired && { robots: { index: false, follow: true } }),
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const content = Markdoc.transform(Markdoc.parse(post.content), markdocConfig)

  const isAktuell = post.kind === 'aktuell'
  const isOver = isAktuell && post.expired

  return (
    <>
      {isAktuell && !isOver && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(post)) }}
        />
      )}
      <section className="pt-40 pb-12 bg-cream-50 border-b border-rosa-100">
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
              <Clock size={11} />
              {post.readingTime} Min.
            </span>
          </div>
          {isAktuell && (
            <p className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-rosa-600 text-white text-sm font-medium">
              <CalendarDays size={15} />
              {post.dateLabel}
              {post.time && ` · ${post.time}`}
            </p>
          )}
          <h1 className="text-gray-900 mb-4">{post.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">{post.excerpt}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-base max-w-3xl">
          {isOver && (
            <div className="mb-10 flex gap-3 p-5 rounded-2xl bg-cream-50 border border-cream-200 text-gray-700">
              <Info size={20} className="text-rosa-600 shrink-0 mt-0.5" />
              <p>
                <strong className="font-medium text-gray-900">Diese Aktion ist vorbei.</strong> Schauen
                Sie trotzdem vorbei: Im <Link href="/brockenhaus" className="text-rosa-600 underline underline-offset-2">Brockenhaus</Link>{' '}
                gibt es alle 3–4 Tage neue Ware. Aktuelle Aktionen finden Sie im{' '}
                <Link href="/blog" className="text-rosa-600 underline underline-offset-2">Blog</Link>.
              </p>
            </div>
          )}
          <article className={articleClass}>
            {Markdoc.renderers.react(content, React, { components: { BlogLink } })}
          </article>

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
