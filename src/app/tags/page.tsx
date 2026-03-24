// 태그 목록 페이지
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, getAllTags } from '@/lib/posts'

export const metadata: Metadata = { title: '태그' }

export default function TagsPage() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const tagCounts = tags
    .map(tag => ({ tag, count: posts.filter(p => p.tags.includes(tag)).length }))
    .sort((a, b) => b.count - a.count)

  return (
    <div className="page-wrap">
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.2rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: '2.5rem',
        }}
      >
        태그
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
        {tagCounts.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.9rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              color: 'var(--text-primary)',
              textDecoration: 'none',
            }}
          >
            <span>{tag}</span>
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                background: 'var(--border)',
                padding: '0.05rem 0.45rem',
                borderRadius: '99px',
              }}
            >
              {count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
