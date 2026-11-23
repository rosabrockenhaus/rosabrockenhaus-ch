import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages are revalidated hourly at runtime (date-based banner and Aktuell posts), so the content
  // files read from disk (Keystatic Reader, gray-matter) must ship with the server functions.
  outputFileTracingIncludes: {
    '/**': ['./content/**/*'],
  },
  // Pages renamed: keep old URLs (bookmarks, search results, shared links) working.
  redirects() {
    return [
      { source: '/shop', destination: '/brockenhaus', permanent: true },
      { source: '/verein/werkstaetten', destination: '/verein/werkstaette', permanent: true },
      // Blog cleanup (Nov 2026): renamed post + event posts that were removed.
      { source: '/blog/neue-moebellieferung', destination: '/blog/neue-ware-alle-3-4-tage', permanent: true },
      { source: '/blog/generalversammlung-2026', destination: '/verein', permanent: true },
      { source: '/blog/werkstatt-kurs-naehen', destination: '/verein/werkstaette', permanent: true },
    ]
  },
};

export default nextConfig;
