import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  dateISO: string
  category: string
  readingTime: number
}

const blogDir = path.join(process.cwd(), 'content', 'blog')

export function getAllBlogPosts(): BlogPost[] {
  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const { data, content } = matter(fs.readFileSync(path.join(blogDir, file), 'utf8'))
      return { slug, content: content.trim(), ...data } as BlogPost
    })
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug)
}
