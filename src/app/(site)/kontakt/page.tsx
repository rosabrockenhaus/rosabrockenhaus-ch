import KontaktPageClient from '@/components/kontakt/KontaktPageClient'
import { getContact, getShopHours } from '@/lib/content'

export default async function KontaktPage() {
  const [contact, shopHours] = await Promise.all([getContact(), getShopHours()])
  return <KontaktPageClient contact={contact} shopHours={shopHours} />
}
