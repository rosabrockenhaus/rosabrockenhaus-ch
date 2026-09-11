import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Aktuell from '@/components/home/Aktuell'
import PromosSection from '@/components/home/PromosSection'
import ServicesGrid from '@/components/home/ServicesGrid'
import ShopTeaser from '@/components/home/ShopTeaser'
import { getAllBlogPosts } from '@/lib/blog'
import { homepage } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Rosa Brockenhaus Bern – Shop, Werkstätten & Services',
  description:
    'Gemeinnütziger Brockenhaus-Verein in Bern. Secondhand kaufen, abgeben und entsorgen — Umzug, Räumung & Reinigung. 50% auf alles.',
}

export default function HomePage() {
  const posts = getAllBlogPosts().slice(0, 6)

  return (
    <>
      <Hero content={homepage.hero} />
      <Aktuell posts={posts} />
      <PromosSection promos={homepage.promos} />
      <ServicesGrid />
      <ShopTeaser />
    </>
  )
}
