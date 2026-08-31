import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AnnouncementBanner from '@/components/home/AnnouncementBanner'
import { BannerProvider } from '@/contexts/BannerContext'

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <BannerProvider>
      <AnnouncementBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </BannerProvider>
  )
}
