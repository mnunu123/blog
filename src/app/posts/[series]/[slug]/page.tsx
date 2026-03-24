// 포스트 상세 페이지 — Nat Eliason 스타일: 동적 OG 헤더 이미지 + 세리프 본문
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPost, getPostsBySeries } from '@/lib/posts'
import { getSeriesById } from '@/lib/taxonomy'
import SeriesNav from '@/components/post/SeriesNav'
import Callout from '@/components/mdx/Callout'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

interface Params {
  params: Promise<{ series: string; slug: string }>
}

const components = { Callout }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ series: p.seriesSlug, slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { series, slug } = await params
  const post = getPost(series, slug)
  if (!post) return {}
  const seriesInfo = getSeriesById(post.series)

  const ogUrl = `/api/og?title=${encodeURIComponent(post.title)}&series=${encodeURIComponent(seriesInfo?.name ?? '')}&color=${encodeURIComponent(seriesInfo?.color ?? '#6366f1')}&tags=${encodeURIComponent(post.tags.join(','))}`

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
  }
}

export default async function PostPage({ params }: Params) {
  const { series: seriesSlug, slug } = await params
  const post = getPost(seriesSlug, slug)
  if (!post) notFound()

  const seriesInfo = getSeriesById(post.series)
  const seriesPosts = getPostsBySeries(seriesSlug)

  return (
    <div>
      {/* 본문 컨테이너 */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '4rem 1.5rem 0',
        }}
      >
        {/* 시리즈 배지 */}
        {seriesInfo && (
          <Link
            href={`/series/${seriesInfo.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: seriesInfo.color,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              fontFamily: 'var(--font-sans)',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: seriesInfo.color,
                flexShrink: 0,
              }}
            />
            {seriesInfo.name} {seriesPosts.length > 1 && `· ${post.seriesOrder}/${seriesPosts.length}편`}
          </Link>
        )}

        {/* 제목 */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}
        >
          {post.title}
        </h1>

        {/* 요약 */}
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            marginBottom: '1.25rem',
          }}
        >
          {post.summary}
        </p>

        {/* 메타 */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-sans)',
            marginBottom: '0.75rem',
          }}
        >
          <span>{post.createdAt}</span>
          <span>·</span>
          <span>{post.readingTime}분 읽기</span>
          {post.githubUrl && (
            <>
              <span>·</span>
              <a
                href={post.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)', textDecoration: 'none' }}
              >
                GitHub ↗
              </a>
            </>
          )}
        </div>

        {/* 태그 */}
        {post.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2.5rem' }}>
            {post.tags.map(tag => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                style={{
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-secondary)',
                  background: 'var(--border)',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                }}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '2.5rem' }} />

        {/* MDX 본문 */}
        <div className="prose">
          <MDXRemote
            source={post.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypePrettyCode, {
                    theme: 'github-dark',
                    keepBackground: true,
                  }],
                ],
              },
            }}
          />
        </div>

        {/* 시리즈 네비게이션 */}
        {seriesPosts.length > 1 && (
          <SeriesNav current={post} posts={seriesPosts} />
        )}
      </div>
    </div>
  )
}
