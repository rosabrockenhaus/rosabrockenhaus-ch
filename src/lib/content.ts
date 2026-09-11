import bannerData from '../../content/banner.json'
import homepageData from '../../content/homepage.json'
import teamData from '../../content/team.json'
import hoursData from '../../content/hours.json'
import categoriesData from '../../content/categories.json'
import servicesData from '../../content/services.json'
import vereinData from '../../content/verein.json'
import vereinAngebotData from '../../content/verein-angebot.json'
import vereinWerkstaettenData from '../../content/verein-werkstaetten.json'
import vereinTransparenzData from '../../content/verein-transparenz.json'
import contactData from '../../content/contact.json'

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

export type Verein = {
  eyebrow: string
  title: string
  intro: string
  missionEyebrow: string
  missionHeading: string
  missionParagraphs: string[]
  quoteText: string
  quoteAttribution: string
  stats: { value: string; sub: string }[]
  ctaHeading: string
  ctaText: string
}

export const verein: Verein = vereinData

export type VereinAngebot = {
  title: string
  intro: string
  profiles: { title: string; description: string }[]
}

export const vereinAngebot: VereinAngebot = vereinAngebotData

export type VereinWerkstaetten = {
  title: string
  intro: string
  workshops: { name: string; description: string }[]
}

export const vereinWerkstaetten: VereinWerkstaetten = vereinWerkstaettenData

export type VereinTransparenz = {
  disclosureText: string
  years: { year: string; docs: string[] }[]
  membershipIntro: string
  membershipOptions: { title: string; price: string; description: string }[]
  donationIntro: string
  iban: string
  bankName: string
  beneficiaryName: string
  beneficiaryAddress: string
  donationConfirmationEmail: string
}

export const vereinTransparenz: VereinTransparenz = vereinTransparenzData

export type Contact = {
  phone: string
  email: string
  addressLine1: string
  addressLine2: string
  whatsappNumber: string
  mapEmbedUrl: string
  instagramUrl: string
  facebookUrl: string
  footerTagline: string
  serviceNote: string
}

export const contact: Contact = contactData
