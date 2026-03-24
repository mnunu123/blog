// 홈 페이지 시리즈 목록 — CategoryList 래퍼 (서버→클라이언트 데이터 전달)
'use client'
import { useRouter } from 'next/navigation'
import { CategoryList } from '@/components/ui/CategoryList'
import type { SeriesInfo } from '@/lib/taxonomy'

interface Props {
  series: SeriesInfo[]
}

export default function SeriesCategoryList({ series }: Props) {
  const router = useRouter()

  const categories = series.map(s => ({
    id: s.id,
    title: s.name,
    subtitle: s.description,
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    onClick: () => router.push(`/series/${s.slug}`),
  }))

  return <CategoryList categories={categories} />
}
