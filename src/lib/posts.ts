// MDX 파일 읽기, frontmatter 파싱, 포스트 목록 조회 유틸리티
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export interface PostMeta {
  title: string
  slug: string
  series: string
  seriesOrder: number
  category: string
  createdAt: string
  updatedAt?: string
  summary: string
  tags: string[]
  thumbnail?: string
  githubUrl?: string
  projectStatus?: string
  relatedPosts?: string[]
  featured?: boolean
  readingTime: number
  seriesSlug: string
  fullSlug: string // "{seriesSlug}/{slug}"
}

export interface Post extends PostMeta {
  content: string
}

function parsePost(seriesSlug: string, filename: string): PostMeta {
  const slug = filename.replace(/\.mdx?$/, '')
  const fullPath = path.join(POSTS_DIR, seriesSlug, filename)
  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    title: data.title ?? '',
    slug: data.slug ?? slug,
    series: data.series ?? seriesSlug,
    seriesOrder: data.seriesOrder ?? 0,
    category: data.category ?? 'project',
    createdAt: data.createdAt ?? '',
    updatedAt: data.updatedAt,
    summary: data.summary ?? '',
    tags: data.tags ?? [],
    thumbnail: data.thumbnail,
    githubUrl: data.githubUrl,
    projectStatus: data.projectStatus,
    relatedPosts: data.relatedPosts,
    featured: data.featured ?? false,
    readingTime: data.readingTime ?? Math.ceil(rt.minutes),
    seriesSlug,
    fullSlug: `${seriesSlug}/${data.slug ?? slug}`,
  }
}

// 전체 포스트 목록 (날짜 오름차순)
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  const seriesDirs = fs.readdirSync(POSTS_DIR)
  const posts: PostMeta[] = []

  for (const seriesSlug of seriesDirs) {
    const seriesPath = path.join(POSTS_DIR, seriesSlug)
    if (!fs.statSync(seriesPath).isDirectory()) continue
    const files = fs.readdirSync(seriesPath).filter(f => /\.mdx?$/.test(f))
    for (const file of files) {
      try {
        posts.push(parsePost(seriesSlug, file))
      } catch {
        // 파싱 실패한 파일 스킵
      }
    }
  }

  return posts.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
}

// 시리즈 내 포스트 (seriesOrder 오름차순)
export function getPostsBySeries(seriesSlug: string): PostMeta[] {
  return getAllPosts()
    .filter(p => p.seriesSlug === seriesSlug)
    .sort((a, b) => a.seriesOrder - b.seriesOrder)
}

// 포스트 단건 (content 포함)
export function getPost(seriesSlug: string, slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, seriesSlug, `${slug}.mdx`)
  const fallback = path.join(POSTS_DIR, seriesSlug, `${slug}.md`)
  const fullPath = fs.existsSync(filePath) ? filePath : fs.existsSync(fallback) ? fallback : null
  if (!fullPath) return null

  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    title: data.title ?? '',
    slug: data.slug ?? slug,
    series: data.series ?? seriesSlug,
    seriesOrder: data.seriesOrder ?? 0,
    category: data.category ?? 'project',
    createdAt: data.createdAt ?? '',
    updatedAt: data.updatedAt,
    summary: data.summary ?? '',
    tags: data.tags ?? [],
    thumbnail: data.thumbnail,
    githubUrl: data.githubUrl,
    projectStatus: data.projectStatus,
    relatedPosts: data.relatedPosts,
    featured: data.featured ?? false,
    readingTime: data.readingTime ?? Math.ceil(rt.minutes),
    seriesSlug,
    fullSlug: `${seriesSlug}/${data.slug ?? slug}`,
    content,
  }
}

// 피처드 포스트
export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter(p => p.featured)
}

// 태그 목록
export function getAllTags(): string[] {
  const all = getAllPosts().flatMap(p => p.tags)
  return [...new Set(all)].sort()
}
