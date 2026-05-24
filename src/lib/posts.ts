import fs from "fs"
import path from "path"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "src/content/insights")

export interface PostMeta {
  slug:    string
  title:   string
  date:    string
  excerpt: string
  tags:    string[]
  draft?:  boolean
}

export interface Post extends PostMeta {
  content: string
}

function readPostFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"))
}

export function getAllPosts(includeDrafts = false): PostMeta[] {
  return readPostFiles()
    .map((filename) => {
      const raw  = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8")
      const { data } = matter(raw)
      return {
        slug:    data.slug ?? filename.replace(/\.mdx$/, ""),
        title:   data.title   ?? "Untitled",
        date:    data.date    ?? "",
        excerpt: data.excerpt ?? "",
        tags:    Array.isArray(data.tags) ? data.tags : [],
        draft:   data.draft   ?? false,
      } as PostMeta
    })
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | null {
  const files = readPostFiles()
  const filename = files.find((f) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf-8")
    const { data } = matter(raw)
    return (data.slug ?? f.replace(/\.mdx$/, "")) === slug
  })
  if (!filename) return null

  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8")
  const { data, content } = matter(raw)
  return {
    slug:    data.slug    ?? filename.replace(/\.mdx$/, ""),
    title:   data.title   ?? "Untitled",
    date:    data.date    ?? "",
    excerpt: data.excerpt ?? "",
    tags:    Array.isArray(data.tags) ? data.tags : [],
    draft:   data.draft   ?? false,
    content,
  }
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  })
}
