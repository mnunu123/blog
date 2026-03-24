// 포스트 목록 카드 컴포넌트 — 썸네일, 제목, 요약, 메타 표시
import Link from 'next/link'
import Image from 'next/image'
import { PostMeta } from '@/lib/posts'
import { getSeriesById } from '@/lib/taxonomy'

interface Props {
  post: PostMeta
}

export default function PostCard({ post }: Props) {
  const series = getSeriesById(post.series)
  const href = `/posts/${post.seriesSlug}/${post.slug}`

  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      {/* 썸네일 */}
      <Link href={href} className="block">
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: series?.color ?? '#6366f1' }}
            >
              <span className="text-white text-lg font-bold opacity-80 px-6 text-center leading-snug">
                {post.title}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* 내용 */}
      <div className="p-4">
        {/* 시리즈 배지 */}
        {series && (
          <Link
            href={`/series/${series.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium mb-2 hover:opacity-80"
            style={{ color: series.color }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: series.color }}
            />
            {series.name}
          </Link>
        )}

        {/* 제목 */}
        <Link href={href}>
          <h2 className="font-semibold text-gray-900 text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* 요약 */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.summary}</p>

        {/* 태그 */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.slice(0, 3).map(tag => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded hover:bg-gray-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* 메타 */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{post.createdAt}</span>
          <span>{post.readingTime}분 읽기</span>
        </div>
      </div>
    </article>
  )
}
