import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

/* Inter: humanist sans-serif — body text, high readability */
const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

/* Playfair Display: elegant serif — display headings only */
const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

/* Roughneck (brand font) — logo stamp wordmark */
const roughneck = localFont({
  src: [
    { path: '../../public/fonts/rosa_brockenhaus.ttf',         weight: '400', style: 'normal' },
    { path: '../../public/fonts/rosa_brockenhaus_punktlos.ttf', weight: '300', style: 'normal' },
  ],
  variable: '--font-stamp',
  display: 'block',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rosabrockenhaus.ch'),
  title: {
    default: 'Rosa Brockenhaus Bern – Secondhand, Umzug & Räumung',
    template: '%s | Rosa Brockenhaus Bern',
  },
  description:
    'Gemeinnütziger Brockenhaus-Verein in Bern. Secondhand kaufen, abgeben und entsorgen — Umzug, Räumung & Reinigung. 50% auf alles.',
  keywords: ['Brockenhaus Bern', 'Secondhand Bern', 'Räumung Bern', 'Umzug Bern', 'Reinigung Bern', 'Broki Bern', 'Secondhand Möbel Bern'],
  openGraph: {
    siteName: 'Rosa Brockenhaus Bern',
    locale: 'de_CH',
    type: 'website',
    url: 'https://www.rosabrockenhaus.ch',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rosabrockenhaus',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'NGO'],
  name: 'Rosa Brockenhaus Hilfswerkverein',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Wankdorffeldstrasse 96',
    postalCode: '3014',
    addressLocality: 'Bern',
    addressCountry: 'CH',
  },
  telephone: '+41319917700',
  email: 'mail@rosabrockenhaus.ch',
  openingHours: ['Mo-Fr 12:00-18:00', 'Sa 10:00-17:00'],
  url: 'https://www.rosabrockenhaus.ch',
  foundingDate: '2010',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${playfair.variable} ${geistMono.variable} ${roughneck.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  )
}
