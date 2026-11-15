import ServicesPageClient from '@/components/services/ServicesPageClient'
import { getServices } from '@/lib/content'

export default async function ServicesPage() {
  return <ServicesPageClient services={await getServices()} />
}
