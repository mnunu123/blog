// 홈 페이지 — Nat Eliason 스타일: 프로필 2단 인트로 + 텍스트 포스트 목록
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'
import { getAllSeries } from '@/lib/taxonomy'
import MagneticDock from '@/components/MagneticDock'
import SeriesCategoryList from '@/components/SeriesCategoryList'

export default function HomePage() {
  const posts = getAllPosts()
  const series = getAllSeries()

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '4rem 1.5rem 0' }}>

      {/* ── 인트로: 텍스트 왼쪽 + 프로필 사진 오른쪽 ── */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '3rem',
          alignItems: 'flex-start',
          marginBottom: '4.5rem',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
            }}
          >
            안녕하세요, 박세준입니다.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '0.9rem',
            }}
          >
            AI 에이전트, 웹 개발, 영상 자동화, IoT를 직접 만들며 기록합니다.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '0.9rem',
            }}
          >
            Claude, Python, Next.js를 주로 씁니다. 만들고 부수고 배운 것들을 이 블로그에 정리합니다.
          </p>

          <MagneticDock />
        </div>

        {/* 프로필 사진 */}
        <div style={{ flexShrink: 0 }}>
          <Image
            src="/profile.jpg"
            alt="박세준 프로필 사진"
            width={200}
            height={200}
            style={{
              borderRadius: '12px',
              objectFit: 'cover',
              display: 'block',
            }}
            priority
          />
        </div>
      </section>

      {/* ── 시리즈 목록 ── */}
      <section style={{ marginBottom: '3rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.75rem',
          }}
        >
          시리즈
        </p>
        <SeriesCategoryList series={series} />
      </section>

      {/* ── 포스트 목록 ── */}
      <section>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0',
          }}
        >
          전체 글 ({posts.length})
        </p>

        <div>
          {posts.map((post, i) => {
            const s = series.find(s => s.id === post.series)
            return (
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
                    gap: '0.6rem',
                    marginBottom: '0.45rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {s && (
                    <Link
                      href={`/series/${s.slug}`}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: s.color,
                        textDecoration: 'none',
                        fontFamily: 'var(--font-sans)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {s.name}
                    </Link>
                  )}
                  <span style={{ color: 'var(--border)' }}>·</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                    {post.createdAt}
                  </span>
                  <span style={{ color: 'var(--border)' }}>·</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                    {post.readingTime}분
                  </span>
                </div>

                <Link href={`/posts/${post.seriesSlug}/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.35,
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {post.title}
                  </h2>
                </Link>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem',
                  }}
                  className="line-clamp-2"
                >
                  {post.summary}
                </p>

                {post.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {post.tags.slice(0, 4).map(tag => (
                      <Link
                        key={tag}
                        href={`/tags/${encodeURIComponent(tag)}`}
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-sans)',
                          color: 'var(--text-muted)',
                          background: 'var(--border)',
                          padding: '0.15rem 0.6rem',
                          borderRadius: '4px',
                          textDecoration: 'none',
                        }}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
