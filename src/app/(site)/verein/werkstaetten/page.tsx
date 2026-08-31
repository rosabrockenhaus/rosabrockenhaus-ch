import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Werkstätten — Rosa Brockenhaus Bern',
  description: 'Fünf Werkstätten für eine zweite Chance: Textil, Elektro, Möbel, Geschirr und Velo.',
}

const workshops = [
  {
    name: 'Textilwerkstatt',
    description: 'Sortierung, Aufbereitung und Verkauf von Kleidung und Textilien.',
  },
  {
    name: 'Elektrowerkstatt',
    description: 'Prüfung, Reparatur und Instandsetzung von Elektrogeräten und HiFi-Anlagen.',
  },
  {
    name: 'Möbelwerkstatt',
    description: 'Aufbereitung, Reparatur und Restaurierung von Möbeln aller Art.',
  },
  {
    name: 'Geschirrwerkstatt',
    description: 'Kontrolle, Reinigung und Sortierung von Haushaltswaren und Geschirr.',
  },
  {
    name: 'Velowerkstatt',
    description: 'Service, Reparatur und Aufbereitung von Fahrrädern und Velozubehör.',
  },
]

export default function WerkstaettenPage() {
  return (
    <>
      <section className="pt-28 pb-12 bg-rosa-50 border-b border-rosa-100">
        <div className="container-base max-w-3xl">
          <p className="text-rosa-600 text-sm font-medium uppercase tracking-wider mb-2">Verein</p>
          <h1 className="text-gray-900 mb-4">Unsere Werkstätten</h1>
          <p className="text-gray-600">
            In fünf Werkstätten geben wir Gegenständen eine zweite Chance — und Menschen die Möglichkeit,
            neue Fähigkeiten zu entwickeln und in den Arbeitsmarkt zurückzufinden.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-base max-w-3xl">
          <div className="grid sm:grid-cols-2 gap-5">
            {workshops.map((ws) => (
              <div
                key={ws.name}
                className="bg-rosa-50 border border-rosa-100 rounded-2xl p-6"
              >
                <h3 className="text-gray-900 font-medium mb-2">{ws.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{ws.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
