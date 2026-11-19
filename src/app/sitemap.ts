import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE = 'https://haxsen.github.io'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/hxquant`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/hxslst`, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
