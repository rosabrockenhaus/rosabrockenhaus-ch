'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Download, FileText, Check, Loader2, Scale } from 'lucide-react'

const years = [
  { year: '2025', docs: ['Jahresbericht', 'Jahresrechnung', 'Protokoll GV'] },
  { year: '2024', docs: ['Jahresbericht', 'Jahresrechnung', 'Protokoll GV'] },
  { year: '2023', docs: ['Jahresbericht', 'Jahresrechnung', 'Protokoll GV'] },
  { year: '2022', docs: ['Jahresbericht', 'Jahresrechnung', 'Protokoll GV'] },
]

const memberSchema = z.object({
  name: z.string().min(2, 'Name erforderlich'),
  email: z.string().email('Gültige E-Mail erforderlich'),
  type: z.enum(['einzelperson', 'firma']),
  message: z.string().optional(),
})
type MemberForm = z.infer<typeof memberSchema>

export default function TransparenzPage() {
  const [memberSubmitted, setMemberSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MemberForm>({
    resolver: zodResolver(memberSchema),
    defaultValues: { type: 'einzelperson' },
  })

  const onSubmit = async (data: MemberForm) => {
    await new Promise((r) => setTimeout(r, 1000))
    setMemberSubmitted(true)
    reset()
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-rosa-50 border-b border-rosa-100">
        <div className="container-base max-w-3xl">
          <p className="text-rosa-600 text-sm font-medium uppercase tracking-wider mb-2">
            Offenheit & Vertrauen
          </p>
          <h1 className="text-gray-900 mb-4">Transparenz</h1>
          <div className="flex items-start gap-3 bg-white border border-rosa-100 rounded-xl p-4 text-sm text-gray-600">
            <Scale size={16} className="text-rosa-400 shrink-0 mt-0.5" />
            <p>
              Als Verein nach Art. 69 ZGB sind wir zur Offenlegung unserer Vereinstätigkeit
              verpflichtet. Alle Jahresberichte, Jahresrechnungen und GV-Protokolle stehen zum
              Download bereit.
            </p>
          </div>
        </div>
      </section>

      {/* Dokumente */}
      <section className="section-padding bg-white">
        <div className="container-base max-w-3xl">
          <h2 className="text-gray-900 mb-8">Vereinsdokumente</h2>
          <Accordion defaultValue={['2025']} className="space-y-3">
            {years.map((y) => (
              <AccordionItem
                key={y.year}
                value={y.year}
                className="border border-rosa-100 rounded-2xl px-6 bg-white"
              >
                <AccordionTrigger className="text-lg font-medium text-gray-900 py-5 hover:no-underline hover:text-rosa-600">
                  Geschäftsjahr {y.year}
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="space-y-2.5">
                    {y.docs.map((doc) => (
                      <a
                        key={doc}
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-rosa-200 hover:bg-rosa-50 transition-all group"
                      >
                        <div className="w-8 h-8 bg-rosa-100 rounded-lg flex items-center justify-center group-hover:bg-rosa-200 transition-colors shrink-0">
                          <Download size={14} className="text-rosa-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {doc} {y.year}
                          </p>
                          <p className="text-xs text-gray-400">PDF · Wird bereitgestellt</p>
                        </div>
                        <span className="text-xs text-gray-400 group-hover:text-rosa-600 transition-colors">
                          Herunterladen
                        </span>
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Mitgliedschaft */}
      <section id="mitglied" className="section-padding bg-rosa-50">
        <div className="container-base max-w-3xl">
          <div className="mb-8">
            <h2 className="text-gray-900 mb-3">Mitglied werden</h2>
            <p className="text-gray-600">
              Als Vereinsmitglied unterstützen Sie unsere Arbeit direkt und haben Stimmrecht an
              der Generalversammlung.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { title: 'Einzelperson', price: 'CHF 100.–/Jahr', desc: 'Persönliche Mitgliedschaft mit Stimmrecht.' },
              { title: 'Firma / Organisation', price: 'CHF 250.–/Jahr', desc: 'Unterstützungsmitgliedschaft für Unternehmen.' },
            ].map((opt) => (
              <div
                key={opt.title}
                className="bg-white border border-rosa-100 rounded-2xl p-5"
              >
                <p className="font-medium text-gray-900 mb-1">{opt.title}</p>
                <p className="text-rosa-600 text-lg font-medium mb-2">{opt.price}</p>
                <p className="text-sm text-gray-500">{opt.desc}</p>
              </div>
            ))}
          </div>

          {memberSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={22} className="text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Danke für Ihr Interesse!</h3>
              <p className="text-gray-600 text-sm">
                Wir melden uns mit weiteren Informationen zur Mitgliedschaft.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white border border-rosa-100 rounded-2xl p-7 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rosa-400"
                    placeholder="Ihr Name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">E-Mail *</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rosa-400"
                    placeholder="ihre@email.ch"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mitgliedschaftstyp *
                </label>
                <select
                  {...register('type')}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rosa-400 bg-white"
                >
                  <option value="einzelperson">Einzelperson – CHF 100.–/Jahr</option>
                  <option value="firma">Firma – CHF 250.–/Jahr</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mitteilung</label>
                <textarea
                  {...register('message')}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rosa-400 resize-none"
                  placeholder="Optionale Mitteilung..."
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-rosa-600 hover:bg-rosa-800 text-white rounded-full py-6 font-medium"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Wird gesendet...
                  </span>
                ) : (
                  'Mitgliedschaft beantragen'
                )}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Spenden */}
      <section id="spenden" className="section-padding bg-white">
        <div className="container-base max-w-3xl">
          <h2 className="text-gray-900 mb-4">Spenden</h2>
          <p className="text-gray-600 mb-8">
            Jede Spende fliesst direkt in die Beschäftigung und Integration von Menschen in Bern.
            Als gemeinnütziger Verein sind wir von der Steuerpflicht befreit – Spenden sind
            steuerabzugsfähig.
          </p>
          <div className="bg-rosa-50 border border-rosa-100 rounded-2xl p-7 space-y-4">
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-rosa-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-700">Kontoverbindung</p>
                <p className="text-gray-900">
                  IBAN: <strong>CH36 0079 0042 4848 2986 8</strong>
                </p>
                <p className="text-gray-600 text-sm">Berner Kantonalbank</p>
              </div>
            </div>
            <div className="border-t border-rosa-200 pt-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Begünstigter</p>
              <p className="text-gray-900">Rosa Brockenhaus Hilfswerkverein</p>
              <p className="text-gray-600 text-sm">Wankdorffeldstrasse 96, 3014 Bern</p>
            </div>
            <div className="border-t border-rosa-200 pt-4">
              <div className="w-32 h-32 bg-white border border-rosa-200 rounded-xl flex items-center justify-center mx-auto">
                <div className="text-center">
                  <p className="text-4xl" aria-hidden>📱</p>
                  <p className="text-xs text-gray-400 mt-1">QR-Code</p>
                  <p className="text-xs text-gray-400">folgt</p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm text-gray-500">
            Für eine Spendenbestätigung schreiben Sie uns an{' '}
            <a href="mailto:mail@rosabrockenhaus.ch" className="text-rosa-600 hover:underline">
              mail@rosabrockenhaus.ch
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
