'use client'

// Form part of autoSlugTitle (see autoSlug.tsx), in its own client module because
// keystatic.config.ts is also imported on the server (Reader, API route).
//
// It renders Keystatic's own slug form, so its behaviour is kept as is: the URL follows the title
// for new entries, stays fixed for existing ones, gets "-1", "-2"… when another post already uses
// it, and saving is blocked with a message if it is still taken. We only lock the URL input and
// hide the "regenerate" button. If Keystatic's markup ever changes, the field simply becomes
// editable again instead of breaking.
import { useEffect, useRef, type ComponentType } from 'react'

type Props<P> = P & { native: ComponentType<P> }

export default function AutoSlugInput<P extends object>({ native: Native, ...props }: Props<P>) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const lock = () => {
      // 1st input = title, 2nd = URL
      const slugInput = root.querySelectorAll('input')[1]
      if (slugInput && !slugInput.readOnly) {
        slugInput.readOnly = true
        slugInput.tabIndex = -1
        slugInput.style.cursor = 'default'
        slugInput.style.opacity = '0.7'
      }
      root.querySelectorAll<HTMLElement>('button[aria-label="regenerate"]').forEach((button) => {
        button.style.display = 'none'
      })
    }
    lock()
    const observer = new MutationObserver(lock)
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <Native {...(props as P)} />
    </div>
  )
}
