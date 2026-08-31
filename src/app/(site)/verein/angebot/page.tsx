import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Angebot — Rosa Brockenhaus Bern',
  description: 'Arbeits- und Praktikumsplätze für Menschen in Reintegration, nach Burnout, mit Behinderung oder in beruflicher Neuorientierung.',
}

const profiles = [
  {
    title: 'Nach einem Burnout',
    description: 'Sanfter Wiedereinstieg ins Berufsleben in einem unterstützenden Umfeld — in Ihrem Tempo.',
  },
  {
    title: 'Mit körperlicher oder psychischer Behinderung',
    description: 'Angepasste Aufgaben und ein respektvoller Arbeitsplatz für Menschen mit besonderen Bedürfnissen.',
  },
  {
    title: 'In beruflicher Reintegration',
    description: 'Praktische Erfahrung sammeln und die Arbeitsfähigkeit nach einer Auszeit wiederherstellen.',
  },
  {
    title: 'Migrantinnen und Migranten',
    description: 'Lokale Berufserfahrung aufbauen, Sprache üben und sich in Bern einleben.',
  },
  {
    title: 'Langzeitarbeitslose',
    description: 'Den Weg zurück in die Arbeitswelt finden — mit Begleitung und echten Aufgaben.',
  },
]

export default function AngebotPage() {
  return (
    <>
      <section className="pt-28 pb-12 bg-rosa-50 border-b border-rosa-100">
        <div className="container-base max-w-3xl">
          <p className="text-rosa-600 text-sm font-medium uppercase tracking-wider mb-2">Verein</p>
          <h1 className="text-gray-900 mb-4">Für wen wir da sind</h1>
          <p className="text-gray-600">
            Rosa Brockenhaus bietet Arbeits- und Praktikumsplätze für Menschen, die einen
            begleiteten Wiedereinstieg ins Berufsleben suchen. Wir glauben an zweite Chancen —
            für Menschen genauso wie für Gegenstände.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-base max-w-3xl">
          <div className="space-y-4">
            {profiles.map((p) => (
              <div
                key={p.title}
                className="bg-rosa-50 border border-rosa-100 rounded-2xl p-6 flex gap-4"
              >
                <span className="w-2 h-2 rounded-full bg-rosa-400 shrink-0 mt-2" aria-hidden />
                <div>
                  <h3 className="text-gray-900 font-medium mb-1.5">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white border border-rosa-200 rounded-2xl p-8 text-center">
            <h3 className="text-gray-900 mb-2">Interessiert?</h3>
            <p className="text-gray-600 text-sm mb-5 max-w-md mx-auto">
              Melden Sie sich bei uns — wir besprechen gemeinsam, wie wir Ihnen helfen können.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-rosa-600 hover:bg-rosa-800 text-white rounded-full px-6 py-2.5 text-sm font-medium transition-colors min-h-[44px]"
            >
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
