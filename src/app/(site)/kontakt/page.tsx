'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail, Clock, Check, Loader2, MessageCircle } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'Name erforderlich'),
  email: z.string().email('Gültige E-Mail erforderlich'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Betreff erforderlich'),
  message: z.string().min(10, 'Nachricht zu kurz (min. 10 Zeichen)'),
})
type ContactForm = z.infer<typeof contactSchema>

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactForm) => {
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
    reset()
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-cream-50 border-b border-rosa-100">
        <div className="container-base">
          <p className="text-rosa-600 text-sm font-medium uppercase tracking-wider mb-2">
            Wir sind für Sie da
          </p>
          <h1 className="text-gray-900 mb-4">Kontakt</h1>
          <p className="text-gray-600 max-w-lg">
            Haben Sie Fragen, möchten einen Termin vereinbaren oder eine Offerte anfordern?
            Schreiben Sie uns – wir antworten innerhalb von 24 Stunden.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-base">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={26} className="text-green-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2">Nachricht erhalten!</h3>
                  <p className="text-gray-600 text-sm mb-5">
                    Danke für Ihre Nachricht. Wir melden uns so schnell wie möglich bei Ihnen.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-rosa-600 text-sm font-medium hover:underline"
                  >
                    Neue Nachricht schreiben
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Name *
                      </label>
                      <input
                        {...register('name')}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent"
                        placeholder="Ihr vollständiger Name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        E-Mail *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent"
                        placeholder="ihre@email.ch"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Telefon
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent"
                        placeholder="031 000 00 00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Betreff *
                      </label>
                      <input
                        {...register('subject')}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent"
                        placeholder="z.B. Offerte Umzug"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nachricht *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent resize-none"
                      placeholder="Beschreiben Sie Ihr Anliegen..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-rosa-600 hover:bg-rosa-800 text-white rounded-full py-6 font-medium disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Wird gesendet...
                      </span>
                    ) : (
                      'Nachricht senden'
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact info */}
              <div className="bg-cream-50 border border-rosa-100 rounded-2xl p-6 space-y-4">
                <h3 className="text-gray-900 mb-2">Kontaktdaten</h3>
                <div className="space-y-3 text-sm">
                  <a
                    href="tel:+41319917700"
                    className="flex items-center gap-3 text-gray-700 hover:text-rosa-600 transition-colors"
                  >
                    <Phone size={15} className="text-rosa-400 shrink-0" />
                    031 991 77 00
                  </a>
                  <a
                    href="mailto:mail@rosabrockenhaus.ch"
                    className="flex items-center gap-3 text-gray-700 hover:text-rosa-600 transition-colors"
                  >
                    <Mail size={15} className="text-rosa-400 shrink-0" />
                    mail@rosabrockenhaus.ch
                  </a>
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPin size={15} className="text-rosa-400 shrink-0 mt-0.5" />
                    <span>
                      Wankdorffeldstrasse 96
                      <br />
                      3014 Bern
                    </span>
                  </div>
                </div>
              </div>

              {/* Öffnungszeiten */}
              <div className="bg-white border border-rosa-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={15} className="text-rosa-400" />
                  <h3 className="text-gray-900 text-sm font-medium">Öffnungszeiten Shop</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { day: 'Montag–Freitag', hours: '12:00–18:00' },
                    { day: 'Samstag', hours: '10:00–17:00' },
                    { day: 'Sonntag', hours: 'geschlossen' },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between text-gray-700">
                      <span>{row.day}</span>
                      <span
                        className={row.hours === 'geschlossen' ? 'text-gray-400' : 'font-medium'}
                      >
                        {row.hours}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Services (Umzug, Räumung etc.) auf Anfrage auch ausserhalb der Öffnungszeiten.
                </p>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/41319917700"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-5 hover:bg-green-100 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                  <p className="text-xs text-gray-500">Direkte Nachricht senden</p>
                </div>
              </a>

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-rosa-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2726.4!2d7.4652!3d46.9673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDU4JzAyLjMiTiA3wrAyNycxNC43IkU!5e0!3m2!1sde!2sch!4v1"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rosa Brockenhaus Standort"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
