import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AnnouncementBanner from '@/components/home/AnnouncementBanner'
import { BannerProvider } from '@/contexts/BannerContext'
import { banner } from '@/lib/content'

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <BannerProvider initialVisible={banner.enabled}>
      {banner.enabled && (
        <AnnouncementBanner
          discount={banner.discount}
          message={banner.message}
          ctaLabel={banner.ctaLabel}
          ctaHref={banner.ctaHref}
        />
      )}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </BannerProvider>
  )
}
