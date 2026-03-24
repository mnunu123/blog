// 시리즈 상세 페이지
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllSeries, getSeriesBySlug } from '@/lib/taxonomy'
import { getPostsBySeries } from '@/lib/posts'

interface Params {
  params: Promise<{ seriesId: string }>
}

export async function generateStaticParams() {
  return getAllSeries().map(s => ({ seriesId: s.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { seriesId } = await params
  const series = getSeriesBySlug(seriesId)
  if (!series) return {}
  return { title: series.name, description: series.description }
}

export default async function SeriesDetailPage({ params }: Params) {
  const { seriesId } = await params
  const series = getSeriesBySlug(seriesId)
  if (!series) notFound()

  const posts = getPostsBySeries(seriesId)

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '4rem 1.5rem 0' }}>
      {/* 시리즈 헤더 */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: series.color,
            }}
          />
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: series.color,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              fontFamily: 'var(--font-sans)',
            }}
          >
            시리즈
          </span>
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.2rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: '0.75rem',
          }}
        >
          {series.name}
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          {series.description}
        </p>
      </div>

      {/* 포스트 목록 */}
      {posts.length > 0 ? (
        <div>
          {posts.map((post, i) => (
            <article
              key={post.fullSlug}
              style={{
                padding: '1.5rem 0',
                borderBottom: i < posts.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.4rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                }}
              >
                <span>{post.seriesOrder}편</span>
                <span>·</span>
                <span>{post.createdAt}</span>
                <span>·</span>
                <span>{post.readingTime}분</span>
              </div>

              <Link href={`/posts/${post.seriesSlug}/${post.slug}`} style={{ textDecoration: 'none' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.35,
                    marginBottom: '0.45rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {post.title}
                </h2>
              </Link>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
                className="line-clamp-2"
              >
                {post.summary}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>이 시리즈에 아직 글이 없습니다.</p>
      )}
    </div>
  )
}
