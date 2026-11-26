import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Aktuell from '@/components/home/Aktuell'
import PromosSection from '@/components/home/PromosSection'
import ServicesGrid from '@/components/home/ServicesGrid'
import ShopTeaser from '@/components/home/ShopTeaser'
import { getAllBlogPosts } from '@/lib/blog'
import { getHomepage, getServices, getFeaturedCategories } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Rosa Brockenhaus Bern – Brockenhaus, Werkstätte & Services',
  description:
    'Gemeinnütziger Brockenhaus-Verein in Bern. Secondhand kaufen, abgeben und entsorgen — Umzug, Räumung & Reinigung.',
}

export default async function HomePage() {
  const posts = getAllBlogPosts().slice(0, 6)
  const [homepage, services, featuredCategories] = await Promise.all([
    getHomepage(),
    getServices(),
    getFeaturedCategories(),
  ])

  return (
    <>
      <Hero content={homepage.hero} />
      <PromosSection promos={homepage.promos} />
      <Aktuell posts={posts} />
      <ServicesGrid services={services} />
      <ShopTeaser categories={featuredCategories} />
    </>
  )
}
