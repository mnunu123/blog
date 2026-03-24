// 시리즈 목록 페이지
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllSeries } from '@/lib/taxonomy'
import { getPostsBySeries } from '@/lib/posts'

export const metadata: Metadata = { title: '시리즈' }

export default function SeriesListPage() {
  const series = getAllSeries()

  return (
    <div className="page-wrap">
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.2rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '0.75rem',
          letterSpacing: '-0.02em',
        }}
      >
        시리즈
      </h1>
      <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        연관된 글들을 시리즈로 묶었습니다.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {series.map((s, i) => {
          const posts = getPostsBySeries(s.slug)
          return (
            <Link
              key={s.id}
              href={`/series/${s.slug}`}
              style={{
                display: 'block',
                padding: '1.5rem 0',
                borderBottom: i < series.length - 1 ? '1px solid var(--border)' : 'none',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: s.color,
                        flexShrink: 0,
                      }}
                    />
                    <h2
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {s.name}
                    </h2>
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {s.description}
                  </p>
                </div>
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-muted)',
                    background: 'var(--border)',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '99px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {posts.length}편
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
