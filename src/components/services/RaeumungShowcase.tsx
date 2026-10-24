import { Photo } from '@/components/services/ReinigungShowcase'

export default function RaeumungShowcase() {
  return (
    <div className="rounded-2xl border border-rosa-100 bg-white p-5">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
        Kein Fall ist zu gross
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Photo
          src="/media/rosa-brockenhaus-bern-raeumung-zimmer-vorher.jpg"
          alt="Vollgestelltes Zimmer vor der Räumung durch Rosa Brockenhaus Bern"
          tag="Vorher"
        />
        <Photo
          src="/media/rosa-brockenhaus-bern-raeumung-wohnzimmer-vorher.jpg"
          alt="Wohnzimmer voller Möbel, Kartons und Hausrat vor der Wohnungsräumung in Bern"
          tag="Vorher"
        />
      </div>
    </div>
  )
}
