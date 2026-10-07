import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages renamed: keep old URLs (bookmarks, search results, shared links) working.
  redirects() {
    return [
      { source: '/shop', destination: '/brockenhaus', permanent: true },
      { source: '/verein/werkstaetten', destination: '/verein/werkstaette', permanent: true },
    ]
  },
};

export default nextConfig;
