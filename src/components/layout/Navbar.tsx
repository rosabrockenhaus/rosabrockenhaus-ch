'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, ChevronDown } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { StampLogo } from '@/components/ui/Logo'

function WordmarkLogo() {
  return (
    <span className="flex flex-col" aria-label="Rosa Brockenhaus — Gemeinnütziger Verein, Bern">
      <span
        className="text-rosa-600 leading-none tracking-tight"
        style={{ fontFamily: 'var(--font-stamp, sans-serif)', fontSize: '1.25rem' }}
      >
        ROSA BROCKENHAUS
      </span>
      <span className="text-[10px] text-gray-400 font-sans tracking-wide leading-none mt-1">
        Gemeinnütziger Verein
      </span>
    </span>
  )
}
import { useBanner } from '@/contexts/BannerContext'

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  {
    href: '/verein',
    label: 'Verein',
    children: [
      { href: '/verein', label: 'Über uns' },
      { href: '/verein/werkstaetten', label: 'Werkstätten' },
      { href: '/verein/angebot', label: 'Angebot' },
    ],
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [vereinOpen, setVereinOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { visible: bannerVisible } = useBanner()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.0, 0.0, 0.2, 1.0] }}
      style={{ top: bannerVisible ? '48px' : '0px' }}
      className={cn(
        'fixed left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-rosa-100 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-base">
        <div className="flex items-center justify-between py-3">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center min-h-[44px] focus-visible:outline-2 focus-visible:outline-rosa-600"
            aria-label="Rosa Brockenhaus — Startseite"
          >
            <WordmarkLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Hauptnavigation">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setVereinOpen(true)}
                  onMouseLeave={() => setVereinOpen(false)}
                >
                  <button
                    aria-haspopup="true"
                    aria-expanded={vereinOpen}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px]',
                      isActive(link.href)
                        ? 'text-rosa-600 bg-rosa-50'
                        : 'text-gray-600 hover:text-rosa-600 hover:bg-gray-50'
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn('transition-transform duration-200', vereinOpen && 'rotate-180')}
                    />
                  </button>
                  <AnimatePresence>
                    {vereinOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.14, ease: [0.0, 0.0, 0.2, 1.0] }}
                        className="absolute top-full left-0 mt-1 w-48 bg-white border border-rosa-100 rounded-xl shadow-xl overflow-hidden"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-rosa-50 hover:text-rosa-700 transition-colors min-h-[44px] flex items-center"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] flex items-center',
                    isActive(link.href)
                      ? 'text-rosa-600 bg-rosa-50'
                      : 'text-gray-600 hover:text-rosa-600 hover:bg-gray-50'
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-rosa-50 rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            )}
          </nav>

          {/* Right side: CTA + contact + mobile */}
          <div className="flex items-center gap-2">
            <Link
              href="/kontakt"
              className="hidden sm:inline-flex items-center text-sm text-gray-600 hover:text-rosa-600 font-medium px-3 py-2 transition-colors min-h-[44px]"
            >
              Kontakt
            </Link>
            <Link
              href="/services"
              className="hidden sm:inline-flex items-center bg-rosa-600 hover:bg-rosa-800 text-white rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:shadow-md min-h-[44px]"
            >
              Offerte anfragen
            </Link>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger className="lg:hidden p-2.5 rounded-lg text-gray-700 hover:text-rosa-600 hover:bg-gray-50 transition-colors bg-transparent border-0 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center">
                <Menu size={20} />
                <span className="sr-only">Menü öffnen</span>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <WordmarkLogo />
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-1">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'px-3 py-3 text-sm rounded-lg transition-colors min-h-[48px] flex items-center',
                      pathname === '/'
                        ? 'text-rosa-600 bg-rosa-50 font-medium'
                        : 'text-gray-700 hover:text-rosa-600 hover:bg-rosa-50'
                    )}
                  >
                    Home
                  </Link>
                  {navLinks.map((link) =>
                    link.children ? (
                      <div key={link.href}>
                        <p className="px-3 pt-4 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          {link.label}
                        </p>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-5 py-2.5 text-sm text-gray-600 hover:text-rosa-600 hover:bg-rosa-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'px-3 py-3 text-sm rounded-lg transition-colors min-h-[48px] flex items-center',
                          isActive(link.href)
                            ? 'text-rosa-600 bg-rosa-50 font-medium'
                            : 'text-gray-700 hover:text-rosa-600 hover:bg-rosa-50'
                        )}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                  <div className="mt-6 flex flex-col gap-2 px-3">
                    <Link
                      href="/kontakt"
                      onClick={() => setMobileOpen(false)}
                      className="w-full flex items-center justify-center text-rosa-700 border-2 border-rosa-200 hover:bg-rosa-50 rounded-full py-3 text-sm font-medium transition-colors min-h-[48px]"
                    >
                      Kontakt
                    </Link>
                    <Link
                      href="/services"
                      onClick={() => setMobileOpen(false)}
                      className="w-full flex items-center justify-center bg-rosa-600 hover:bg-rosa-800 text-white rounded-full py-3 text-sm font-medium transition-colors min-h-[48px]"
                    >
                      Offerte anfragen
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
