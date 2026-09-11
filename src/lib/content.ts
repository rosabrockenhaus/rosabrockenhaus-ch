import bannerData from '../../content/banner.json'
import homepageData from '../../content/homepage.json'
import teamData from '../../content/team.json'
import hoursData from '../../content/hours.json'
import categoriesData from '../../content/categories.json'
import servicesData from '../../content/services.json'

export type Banner = {
  enabled: boolean
  discount: string
  message: string
  ctaLabel: string
  ctaHref: string
}

export const banner: Banner = bannerData

export type HeroContent = {
  headlineHighlight: string
  headlineRest: string
  subcopy: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  contactPhone: string
  contactEmail: string
}

export type Promo = {
  icon: string
  eyebrow: string
  summary: string
  details: string[]
}

export type Homepage = {
  hero: HeroContent
  promos: Promo[]
}

export const homepage: Homepage = homepageData

export type TeamMember = {
  name: string
  role: string
  photo: string
}

export const team: TeamMember[] = (teamData as { members: TeamMember[] }).members

export type ShopHours = {
  label: string
  note: string
  hours: { days: string; time: string }[]
}

export const shopHours: ShopHours = hoursData

export type ShopCategory = {
  id: string
  name: string
  description: string
  image: string | null
  alt: string
  examples: string[]
  featured?: boolean
}

export const shopCategories: ShopCategory[] = (categoriesData as { categories: ShopCategory[] }).categories

export const featuredCategories = shopCategories.filter((c) => c.featured)

export type Service = {
  id: string
  slug: string
  title: string
  subtitle: string
  icon: string
  description: string
  features: string[]
  faq: { question: string; answer: string }[]
}

export const services: Service[] = (servicesData as { services: Service[] }).services
