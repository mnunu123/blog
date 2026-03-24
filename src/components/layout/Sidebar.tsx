// 우측 사이드바 — 검색, 카테고리, 태그, 시리즈 목록
import Link from 'next/link'
import { getAllPosts, getAllTags } from '@/lib/posts'
import { getAllSeries, getAllCategories } from '@/lib/taxonomy'

export default function Sidebar() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const series = getAllSeries()
  const categories = getAllCategories()

  // 카테고리별 포스트 수
  const categoryCounts = categories.map(c => ({
    ...c,
    count: posts.filter(p => p.category === c.id).length,
  }))

  return (
    <aside className="space-y-8">
      {/* 검색 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">검색</h3>
        <form action="/search" method="get">
          <div className="flex gap-2">
            <input
              type="text"
              name="q"
              placeholder="포스트 검색..."
              className="flex-1 text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
            >
              검색
            </button>
          </div>
        </form>
      </div>

      {/* 시리즈 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">시리즈</h3>
        <ul className="space-y-2">
          {series.map(s => (
            <li key={s.id}>
              <Link
                href={`/series/${s.slug}`}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 group"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: s.color }}
                />
                <span className="group-hover:underline">{s.name}</span>
                <span className="ml-auto text-xs text-gray-400">{s.posts.length}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 카테고리 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">카테고리</h3>
        <ul className="space-y-1">
          {categoryCounts.map(c => (
            <li key={c.id}>
              <Link
                href={`/category/${c.slug}`}
                className="flex items-center justify-between text-sm text-gray-700 hover:text-gray-900 py-0.5"
              >
                <span>{c.name}</span>
                <span className="text-xs text-gray-400">({c.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 태그 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">태그</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
