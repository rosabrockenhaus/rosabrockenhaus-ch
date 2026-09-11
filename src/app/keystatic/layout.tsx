import { notFound } from 'next/navigation'
import KeystaticApp from './keystatic'
import { isGithubStorageConfigured } from '../../../keystatic.config'

export default function Layout() {
  // In production, 'local' storage means no auth at all — hide the admin UI entirely until the
  // GitHub App credentials are actually set (see keystatic.config.ts). Local dev always allows it.
  if (process.env.NODE_ENV === 'production' && !isGithubStorageConfigured) {
    notFound()
  }

  return <KeystaticApp />
}
