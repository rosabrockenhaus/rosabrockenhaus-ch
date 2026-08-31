/* ─── Logo variants ───────────────────────────────────────────────────────────
 *
 * StampLogo  — the primary brand mark: pink block + stacked wordmark
 *              Uses Black Ops One (--font-stamp) loaded in layout.tsx
 *
 * RosaIcon   — legacy SVG house icon (kept for OG image / fallback)
 * Logo       — legacy inline text logo (kept for OG image route)
 *
 * ──────────────────────────────────────────────────────────────────────────── */

const STAMP_PINK = '#FF3DC8'

type StampSize = 'xs' | 'sm' | 'md' | 'lg'

const stampSizes: Record<StampSize, { text: string; px: string; py: string }> = {
  xs: { text: 'text-[11px]', px: 'px-[6px]', py: 'py-[5px]' },
  sm: { text: 'text-[15px]', px: 'px-[8px]', py: 'py-[6px]' },
  md: { text: 'text-[20px]', px: 'px-[11px]', py: 'py-[9px]' },
  lg: { text: 'text-[30px]', px: 'px-[16px]', py: 'py-[13px]' },
}

export function StampLogo({ size = 'md', className }: { size?: StampSize; className?: string }) {
  const { text, px, py } = stampSizes[size]
  return (
    <span
      className={`inline-block ${px} ${py} select-none shrink-0 ${className ?? ''}`}
      style={{ backgroundColor: STAMP_PINK }}
      role="img"
      aria-label="Rosa Brockenhaus"
    >
      <span
        className={`block ${text} text-black leading-[1.08] tracking-tight`}
        style={{ fontFamily: 'var(--font-stamp, sans-serif)', fontWeight: 400 }}
        aria-hidden="true"
      >
        <span className="block">ROSA</span>
        <span className="block">BROCKEN</span>
        <span className="block">HAUS</span>
      </span>
    </span>
  )
}

/* ─── Legacy components (OG image, etc.) ──────────────────────────────────── */

export function RosaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 2L30 14H27V30H5V14H2L16 2Z" fill="currentColor" />
      <path
        d="M12 30V23C12 20.79 13.79 19 16 19C18.21 19 20 20.79 20 23V30H12Z"
        fill="white"
      />
    </svg>
  )
}

type Variant = 'default' | 'dark' | 'light'
type Size = 'sm' | 'md' | 'lg'

const iconSizes: Record<Size, string> = { sm: 'w-7 h-7', md: 'w-8 h-8', lg: 'w-10 h-10' }
const textSizes: Record<Size, string> = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' }
const colors: Record<Variant, { icon: string; primary: string; secondary: string }> = {
  default: { icon: 'text-rosa-600', primary: 'text-rosa-600', secondary: 'text-gray-800' },
  dark:    { icon: 'text-rosa-400', primary: 'text-rosa-400', secondary: 'text-white' },
  light:   { icon: 'text-white',    primary: 'text-white',    secondary: 'text-white/80' },
}

export default function Logo({
  variant = 'default',
  size = 'md',
  className,
}: {
  variant?: Variant
  size?: Size
  className?: string
}) {
  const c = colors[variant]
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <RosaIcon className={`${iconSizes[size]} ${c.icon} shrink-0`} />
      <span className={`${textSizes[size]} font-medium leading-none`}>
        <span className={`font-display ${c.primary}`}>Rosa</span>
        <span className={c.secondary}> Brockenhaus</span>
      </span>
    </span>
  )
}
