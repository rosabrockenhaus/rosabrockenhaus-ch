import type { Metadata } from 'next'
import ShopPageClient from '@/components/shop/ShopPageClient'

export const metadata: Metadata = {
  title: 'Shop — Rosa Brockenhaus Bern | Secondhand Möbel, Kleidung & mehr',
  description:
    'Entdecken Sie unser täglich wechselndes Sortiment: Möbel, Kleidung, Bücher, Elektronik, Velos und mehr. Alles 50% reduziert.',
}

export default function ShopPage() {
  return <ShopPageClient />
}
