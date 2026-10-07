import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** `tel:` link for a displayed phone number, e.g. "+41 31 991 77 00" or "031 991 77 00" → "tel:+41319917700". */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '').replace(/^0/, '+41')}`
}
