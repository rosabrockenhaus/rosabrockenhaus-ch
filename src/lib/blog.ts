import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Two kinds of posts (chosen in Keystatic under "Art des Beitrags"):
//  - ratgeber: evergreen info about the shop ("Neue Ware alle 3–4 Tage"), no date, ordered by hand;
//  - aktuell: a dated offer or event ("50% am 12.12."), listed first while it is upcoming,
//    dropped from all lists once its last day has passed (the page itself stays, marked as over).
// Pages using this are revalidated hourly (see (site)/layout.tsx), so expiry needs no redeploy.

type PostBase = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  readingTime: number
}

export type RatgeberPost = PostBase & { kind: 'ratgeber'; order: number }
export type AktuellPost = PostBase & {
  kind: 'aktuell'
  /** First day, YYYY-MM-DD */
  date: string
  /** Last day, YYYY-MM-DD (same as `date` for one-day events) */
  endDate: string
  /** Free text, e.g. "10–17 Uhr" */
  time: string
  /** Ready to display, e.g. "Sa., 12. Dezember 2026" (computed on the server for client cards) */
  dateLabel: string
  /** Last day has passed (Swiss time) */
  expired: boolean
}
export type BlogPost = RatgeberPost | AktuellPost

const blogDir = path.join(process.cwd(), 'content', 'blog')

/** Today's date in Bern as YYYY-MM-DD (servers run in UTC). */
export function todayInBern(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zurich' }).format(new Date())
}

// YAML turns unquoted 2026-12-12 into a Date; normalise back to the string Keystatic wrote.
function isoDay(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return typeof value === 'string' ? value : ''
}

function parsePost(file: string, today: string): BlogPost {
  const slug = file.replace(/\.md$/, '')
  const { data, content } = matter(fs.readFileSync(path.join(blogDir, file), 'utf8'))
  const base: PostBase = {
    slug,
    title: String(data.title ?? ''),
    excerpt: String(data.excerpt ?? ''),
    content: content.trim(),
    category: String(data.category ?? ''),
    readingTime: Number(data.readingTime ?? 1),
  }
  const kind = data.kind as { discriminant?: string; value?: Record<string, unknown> } | undefined

  if (kind?.discriminant === 'aktuell') {
    const date = isoDay(kind.value?.date)
    const endDate = isoDay(kind.value?.endDate) || date
    return {
      ...base,
      kind: 'aktuell',
      date,
      endDate,
      time: String(kind.value?.time ?? ''),
      dateLabel: date ? formatDayRange(date, endDate) : '',
      expired: endDate !== '' && endDate < today,
    }
  }
  return { ...base, kind: 'ratgeber', order: Number(kind?.value?.order ?? 10) }
}

function readPosts(): BlogPost[] {
  const today = todayInBern()
  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => parsePost(file, today))
}

/** Posts to list: upcoming Aktuell first (soonest first), then Ratgeber by hand-picked order. */
export function getAllBlogPosts(): BlogPost[] {
  const posts = readPosts()
  const aktuell = posts
    .filter((p): p is AktuellPost => p.kind === 'aktuell' && !p.expired)
    .sort((a, b) => a.date.localeCompare(b.date))
  const ratgeber = posts
    .filter((p): p is RatgeberPost => p.kind === 'ratgeber')
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'de'))
  return [...aktuell, ...ratgeber]
}

/** Any post including expired ones, so old shared links still open (with a "vorbei" notice). */
export function getBlogPost(slug: string): BlogPost | undefined {
  return readPosts().find((post) => post.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return readPosts().map((post) => post.slug)
}

const dayFormat = new Intl.DateTimeFormat('de-CH', {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

/** "Sa., 12. Dezember 2026", or a range for multi-day events */
function formatDayRange(start: string, end: string): string {
  const from = new Date(`${start}T00:00:00Z`)
  if (end === start) return dayFormat.format(from)
  return dayFormat.formatRange(from, new Date(`${end}T00:00:00Z`))
}
