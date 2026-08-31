import type { Variants, Transition } from 'framer-motion'

const easeOut: Transition = { duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }
const easeOutSlow: Transition = { duration: 0.7, ease: [0.0, 0.0, 0.2, 1.0] }

export const noAnimation: Variants = { hidden: {}, visible: {} }

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: easeOut },
}

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: easeOut },
}

export const slideRightVariant: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: easeOutSlow },
}

export const slideLeftVariant: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: easeOutSlow },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

export const viewportOnce = { once: true, margin: '-50px' as const }
