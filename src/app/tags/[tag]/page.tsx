// 태그별 포스트 목록
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, getAllTags } from '@/lib/posts'
import { getAllSeries } from '@/lib/taxonomy'

interface Params {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  return getAllTags().map(tag => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag } = await params
  return { title: `#${decodeURIComponent(tag)}` }
}

export default async function TagPage({ params }: Params) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const posts = getAllPosts().filter(p => p.tags.includes(decoded))
  const series = getAllSeries()
  if (posts.length === 0) notFound()

  return (
    <div className="page-wrap">
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>태그</p>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>
        #{decoded}
        <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-muted)', marginLeft: '0.75rem' }}>{posts.length}개</span>
      </h1>

      <div>
        {posts.map((post, i) => {
          const s = series.find(s => s.id === post.series)
          return (
            <article key={post.fullSlug} style={{ padding: '1.5rem 0', borderBottom: i < posts.length - 1 ? '1px solid var(--border)' : 'none' }}>
              {s && (
                <Link href={`/series/${s.slug}`} style={{ fontSize: '0.78rem', fontWeight: 700, color: s.color, textDecoration: 'none', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.35rem' }}>
                  {s.name}
                </Link>
              )}
              <Link href={`/posts/${post.seriesSlug}/${post.slug}`} style={{ textDecoration: 'none' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35, marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                  {post.title}
                </h2>
              </Link>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }} className="line-clamp-2">{post.summary}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
