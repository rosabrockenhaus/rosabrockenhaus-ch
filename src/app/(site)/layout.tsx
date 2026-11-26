import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AnnouncementBanner from '@/components/home/AnnouncementBanner'
import { BannerProvider } from '@/contexts/BannerContext'
import { getBanner } from '@/lib/content'
import { getAllBlogPosts, todayInBern } from '@/lib/blog'

// Pages are static, but the banner schedule and "Aktuell" blog posts depend on today's date.
// Regenerating at most once an hour lets them appear and expire on their own, without a deploy.
export const revalidate = 3600

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const banner = await getBanner()
  const today = todayInBern()
  // Without an explicit end, a dated discount ends with its day.
  const lastDay = banner.endDate || banner.discountDate
  const showBanner =
    banner.enabled &&
    (!banner.startDate || banner.startDate <= today) &&
    (!lastDay || today <= lastDay)
  // "Samstag, 12. Dezember" as the banner title
  const discountDateLabel = banner.discountDate
    ? new Intl.DateTimeFormat('de-CH', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(
        new Date(`${banner.discountDate}T00:00:00Z`)
      )
    : undefined
  // Only link to a post that is still listed (not deleted, not an expired Aktuell post).
  const postHref =
    banner.post && getAllBlogPosts().some((p) => p.slug === banner.post)
      ? `/blog/${banner.post}`
      : undefined

  return (
    <BannerProvider initialVisible={showBanner}>
      {showBanner && (
        <AnnouncementBanner
          discount={banner.discount}
          discountDate={discountDateLabel}
          message={banner.message}
          href={postHref}
        />
      )}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </BannerProvider>
  )
}
