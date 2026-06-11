import { MetadataRoute } from 'next'
import { PROJECTS } from "@/data/portfolio";

// Replace this with your actual production domain
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://portfolio.vijayaraghavan.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = PROJECTS.map((p) => ({
    url: `${BASE_URL}/work/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    ...projectEntries,
  ]
}
