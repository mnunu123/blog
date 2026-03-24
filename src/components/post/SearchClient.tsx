// 클라이언트 사이드 검색 필터
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

interface Props {
  posts: PostMeta[]
  initialQuery: string
}

export default function SearchClient({ posts, initialQuery }: Props) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)

  const results = query.trim()
    ? posts.filter(p => {
        const q = query.toLowerCase()
        return (
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        )
      })
    : []

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="제목, 요약, 태그 검색..."
            autoFocus
            style={{
              flex: 1,
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '0.65rem 1rem',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-sans)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.65rem 1.4rem',
              background: 'var(--text-primary)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            검색
          </button>
        </div>
      </form>

      {query && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          &ldquo;{query}&rdquo; — {results.length}개
        </p>
      )}

      <div>
        {results.map((post, i) => (
          <article
            key={post.fullSlug}
            style={{
              padding: '1.25rem 0',
              borderBottom: i < results.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <Link href={`/posts/${post.seriesSlug}/${post.slug}`} style={{ textDecoration: 'none' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem', lineHeight: 1.35 }}>
                {post.title}
              </h2>
            </Link>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }} className="line-clamp-2">
              {post.summary}
            </p>
          </article>
        ))}
      </div>

      {query && results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</p>
          <p>&ldquo;{query}&rdquo;에 대한 결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
