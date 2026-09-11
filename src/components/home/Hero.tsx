'use client'

import { useReducedMotion, motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { fadeUpVariant, staggerContainer, noAnimation } from '@/lib/animations'
import { ArrowRight, Play, ExternalLink } from 'lucide-react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { HeroContent, Contact } from '@/lib/content'

export default function Hero({ content, contact }: { content: HeroContent; contact: Contact }) {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = prefersReducedMotion ? noAnimation : staggerContainer
  const itemVariants = prefersReducedMotion ? noAnimation : fadeUpVariant

  return (
    <section className="relative overflow-hidden bg-cream-50 pt-[112px]">
      {/* Warm gradient blobs — Nature Distilled */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle at 70% 30%, #FDD2E9 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle at 30% 70%, #EDE4D4 0%, transparent 70%)' }} />
      </div>

      <div className="container-base relative z-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center">

          {/* Text column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            {/* Display heading — Playfair Display */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900 mb-6"
            >
              <em className="not-italic text-rosa-600">{content.headlineHighlight}</em>{' '}
              {content.headlineRest}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg leading-[1.7] mb-10"
              style={{ maxWidth: '52ch' }}
            >
              {content.subcopy}
            </motion.p>

            {/* CTAs — min 44px height, WCAG-compliant */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href={content.primaryCtaHref}
                className="inline-flex items-center justify-center gap-2.5 bg-rosa-600 hover:bg-rosa-800 text-white rounded-full px-8 py-3.5 text-base font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group min-h-[48px]"
              >
                {content.primaryCtaLabel}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href={content.secondaryCtaHref}
                className="inline-flex items-center justify-center gap-2 border-2 border-rosa-200 text-rosa-700 hover:bg-rosa-50 hover:border-rosa-400 rounded-full px-8 py-3.5 text-base font-medium transition-all duration-200 min-h-[48px]"
              >
                {content.secondaryCtaLabel}
              </Link>
            </motion.div>

            {/* Video links — replaces the old trust-signal row */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger
                  className="group flex items-center gap-3 pr-4 rounded-full border border-rosa-200 hover:border-rosa-400 hover:bg-rosa-50 transition-all duration-200 min-h-[48px]"
                >
                  <span className="w-9 h-9 ml-1 rounded-full bg-rosa-600 text-white flex items-center justify-center shrink-0 group-hover:bg-rosa-800 transition-colors">
                    <Play size={14} className="fill-current translate-x-[1px]" />
                  </span>
                  <span className="text-sm font-medium text-gray-700">Musikvideo</span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-black">
                  <DialogTitle className="sr-only">Rosa Brockenhaus — Musikvideo</DialogTitle>
                  <video
                    controls
                    autoPlay
                    className="w-full aspect-video"
                    src="/media/rosa-brockenhaus-bern-portraitvideo.mp4"
                  />
                </DialogContent>
              </Dialog>

              <a
                href="https://www.srf.ch/play/tv/mitenand/video/saim-agca-gibt-menschen-neue-chancen?urn=urn:srf:video:b6005fcf-d250-4ae7-8475-3ae30ffc1558"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 pr-4 rounded-full border border-rosa-200 hover:border-rosa-400 hover:bg-rosa-50 transition-all duration-200 min-h-[48px]"
              >
                <span className="w-9 h-9 ml-1 rounded-full bg-rosa-600 text-white flex items-center justify-center shrink-0 group-hover:bg-rosa-800 transition-colors">
                  <Play size={14} className="fill-current translate-x-[1px]" />
                </span>
                <span className="text-sm font-medium text-gray-700 inline-flex items-center gap-1.5">
                  SRF Mitenand
                  <ExternalLink size={12} className="text-gray-400" />
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* Visual column */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.0, 0.0, 0.2, 1.0] }}
            className="relative hidden lg:flex"
          >
            {/* Logo */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] w-full bg-white flex items-center justify-center p-10 card-shadow">
              <Image
                src="/media/rosa-brockenhaus-bern-logo-with-icon.jpg"
                alt="Rosa Brockenhaus Bern"
                fill
                className="object-contain p-10"
                priority
                sizes="420px"
              />
            </div>

            {/* Contact card */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-4 border border-rosa-50 w-44">
              <p className="text-xs font-medium text-rosa-600 mb-2 uppercase tracking-wide">Kontakt</p>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, '').replace(/^0/, '+41')}`}
                className="text-sm text-gray-800 font-medium flex items-center min-h-[44px]"
              >
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="text-xs text-gray-400 flex items-center truncate min-h-[44px]"
              >
                {contact.email}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div aria-hidden className="h-12 bg-white" style={{
        clipPath: 'ellipse(55% 100% at 50% 100%)',
        marginTop: '-3rem',
      }} />
    </section>
  )
}
