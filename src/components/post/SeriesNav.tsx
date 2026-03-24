// 시리즈 내 이전/다음 포스트 네비게이션
import Link from 'next/link'
import { PostMeta } from '@/lib/posts'
import { getSeriesById } from '@/lib/taxonomy'

interface Props {
  current: PostMeta
  posts: PostMeta[]
}

export default function SeriesNav({ current, posts }: Props) {
  const series = getSeriesById(current.series)
  const idx = posts.findIndex(p => p.slug === current.slug)
  const prev = idx > 0 ? posts[idx - 1] : null
  const next = idx < posts.length - 1 ? posts[idx + 1] : null

  return (
    <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
      {series && (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            marginBottom: '1rem',
          }}
        >
          시리즈:{' '}
          <Link href={`/series/${series.slug}`} style={{ color: series.color, textDecoration: 'none' }}>
            {series.name}
          </Link>
          {' '}· {current.seriesOrder}/{posts.length}편
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {prev ? (
          <Link
            href={`/posts/${prev.seriesSlug}/${prev.slug}`}
            style={{
              display: 'block',
              padding: '1rem 1.25rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              textDecoration: 'none',
              background: 'var(--bg-card)',
            }}
          >
            <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>← 이전</span>
            <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.4 }} className="line-clamp-2">{prev.title}</span>
          </Link>
        ) : <div />}

        {next ? (
          <Link
            href={`/posts/${next.seriesSlug}/${next.slug}`}
            style={{
              display: 'block',
              padding: '1rem 1.25rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              textDecoration: 'none',
              background: 'var(--bg-card)',
              textAlign: 'right',
            }}
          >
            <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>다음 →</span>
            <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.4 }} className="line-clamp-2">{next.title}</span>
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
