import type { Metadata } from 'next'
import { vereinWerkstaetten } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Werkstätten — Rosa Brockenhaus Bern',
  description: 'Fünf Werkstätten für eine zweite Chance: Textil, Elektro, Möbel, Geschirr und Velo.',
}

export default function WerkstaettenPage() {
  const { title, intro, workshops } = vereinWerkstaetten

  return (
    <>
      <section className="pt-28 pb-12 bg-rosa-50 border-b border-rosa-100">
        <div className="container-base max-w-3xl">
          <p className="text-rosa-600 text-sm font-medium uppercase tracking-wider mb-2">Verein</p>
          <h1 className="text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600">{intro}</p>
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
