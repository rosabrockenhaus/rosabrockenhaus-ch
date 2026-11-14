import type { Metadata } from 'next'
import ShopPageClient from '@/components/shop/ShopPageClient'
import { getShopCategories, getContact } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Brockenhaus — Rosa Brockenhaus Bern | Secondhand Möbel, Kleidung & mehr',
  description:
    'Entdecken Sie unser täglich wechselndes Sortiment: Möbel, Kleidung, Bücher, Elektronik, Velos und mehr. Alles 50% reduziert.',
}

export default async function ShopPage() {
  const [shopCategories, contact] = await Promise.all([getShopCategories(), getContact()])
  return <ShopPageClient shopCategories={shopCategories} contact={contact} />
}
