import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/posts"

const baseUrl = "https://www.karagateway.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const insightUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    priority: 0.8,
  }))

  return [
    { url: baseUrl,                          lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/contact`,             lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/about`,               lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/services`,            lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/sectors`,             lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/model`,               lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/careers`,             lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/careers/apply`,       lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/partner`,             lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/insights`,            lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`,      lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/cookie-policy`,       lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), priority: 0.8 },
    ...insightUrls,
  ]
}
