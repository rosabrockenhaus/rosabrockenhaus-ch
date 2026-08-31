'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Truck, Home, Sparkles, Recycle, PackageCheck, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { services } from '@/lib/content'
import { fadeUpVariant, staggerContainer, viewportOnce, noAnimation } from '@/lib/animations'
import ReinigungShowcase from '@/components/services/ReinigungShowcase'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Truck,
  Home,
  Sparkles,
  Recycle,
  PackageCheck,
}

const quoteSchema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen ein'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Bitte wählen Sie einen Service'),
  date: z.string().optional(),
  message: z.string().min(10, 'Bitte beschreiben Sie Ihr Anliegen (min. 10 Zeichen)'),
})
type QuoteForm = z.infer<typeof quoteSchema>

export default function ServicesPage() {
  const prefersReducedMotion = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteForm>({ resolver: zodResolver(quoteSchema) })

  const onSubmit = async (data: QuoteForm) => {
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
    reset()
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-rosa-50 border-b border-rosa-100">
        <div className="container-base">
          <motion.div
            variants={prefersReducedMotion ? noAnimation : staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.p
              variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
              className="text-rosa-600 text-sm font-medium uppercase tracking-wider mb-2"
            >
              Professionell & zuverlässig
            </motion.p>
            <motion.h1 variants={prefersReducedMotion ? noAnimation : fadeUpVariant} className="text-gray-900 mb-4">
              Unsere Services
            </motion.h1>
            <motion.p variants={prefersReducedMotion ? noAnimation : fadeUpVariant} className="text-gray-600">
              Umzug, Räumung, Reinigung, Entsorgung, Abholung – wir helfen Ihnen, Ihren Alltag zu erleichtern.
              Sozial. Nachhaltig. Zuverlässig.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Service sections */}
      {services.map((service, index) => {
        const Icon = iconMap[service.icon] ?? Truck
        const isEven = index % 2 === 0

        return (
          <section
            key={service.id}
            id={service.slug}
            className={`section-padding ${isEven ? 'bg-white' : 'bg-cream-50'}`}
          >
            <div className="container-base">
              <motion.div
                variants={prefersReducedMotion ? noAnimation : staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="grid lg:grid-cols-2 gap-12 items-start"
              >
                {/* Content */}
                <div>
                  <motion.div
                    variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
                    className="w-14 h-14 rounded-2xl bg-rosa-100 flex items-center justify-center mb-6"
                  >
                    <Icon size={26} className="text-rosa-600" />
                  </motion.div>
                  <motion.h2
                    variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
                    className="text-gray-900 mb-2"
                  >
                    {service.title}
                  </motion.h2>
                  <motion.p
                    variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
                    className="text-rosa-600 font-medium mb-5"
                  >
                    {service.subtitle}
                  </motion.p>
                  <motion.p
                    variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
                    className="text-gray-600 leading-relaxed mb-8"
                  >
                    {service.description}
                  </motion.p>

                  <motion.ul
                    variants={prefersReducedMotion ? noAnimation : staggerContainer}
                    className="space-y-2.5 mb-8"
                  >
                    {service.features.map((feature) => (
                      <motion.li
                        key={feature}
                        variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
                        className="flex items-start gap-3 text-sm text-gray-700"
                      >
                        <span className="w-5 h-5 rounded-full bg-rosa-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={12} className="text-rosa-600" />
                        </span>
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.div variants={prefersReducedMotion ? noAnimation : fadeUpVariant}>
                    <a
                      href="#anfrage"
                      className="inline-flex items-center bg-rosa-600 hover:bg-rosa-800 text-white rounded-full px-7 py-2.5 text-sm font-medium hover:scale-105 transition-transform"
                    >
                      Jetzt anfragen
                    </a>
                  </motion.div>
                </div>

                {/* Visual: before/after results for Reinigung, FAQ for the rest */}
                <motion.div variants={prefersReducedMotion ? noAnimation : fadeUpVariant} className="space-y-6">
                  {service.slug === 'reinigung' && <ReinigungShowcase />}
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                      Häufige Fragen
                    </p>
                  <Accordion multiple={false} className="space-y-2">
                    {service.faq.map((item, i) => (
                      <AccordionItem
                        key={i}
                        value={`${service.id}-${i}`}
                        className="border border-rosa-100 rounded-xl px-5 bg-white"
                      >
                        <AccordionTrigger className="text-sm font-medium text-gray-900 py-4 hover:no-underline hover:text-rosa-600">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-600 leading-relaxed pb-4">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        )
      })}

      {/* Quote form */}
      <section id="anfrage" className="section-padding bg-rosa-50">
        <div className="container-base">
          <div className="max-w-2xl mx-auto">
            <motion.div
              variants={prefersReducedMotion ? noAnimation : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mb-10 text-center"
            >
              <motion.h2
                variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
                className="text-gray-900 mb-3"
              >
                Offerte anfragen
              </motion.h2>
              <motion.p
                variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
                className="text-gray-600"
              >
                Schildern Sie uns Ihr Anliegen – wir melden uns innerhalb von 24 Stunden.
              </motion.p>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={22} className="text-green-600" />
                </div>
                <h3 className="text-gray-900 mb-2">Vielen Dank!</h3>
                <p className="text-gray-600 text-sm">
                  Ihre Anfrage ist bei uns eingegangen. Wir melden uns so schnell wie möglich.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-5 text-rosa-600 text-sm font-medium hover:underline"
                >
                  Neue Anfrage stellen
                </button>
              </motion.div>
            ) : (
              <motion.form
                variants={prefersReducedMotion ? noAnimation : fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white border border-rosa-100 rounded-2xl p-8 space-y-5"
              >
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
                      Service *
                    </label>
                    <select
                      {...register('service')}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent bg-white"
                    >
                      <option value="">Bitte wählen...</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-xs text-red-500">{errors.service.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Gewünschtes Datum
                  </label>
                  <input
                    {...register('date')}
                    type="date"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Beschreibung *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rosa-400 focus:border-transparent resize-none"
                    placeholder="Beschreiben Sie Ihr Anliegen möglichst detailliert..."
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
                    'Offerte anfordern'
                  )}
                </Button>

                <p className="text-xs text-center text-gray-400">
                  Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                </p>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
