// 검색 페이지
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getAllPosts } from '@/lib/posts'
import SearchClient from '@/components/post/SearchClient'

export const metadata: Metadata = { title: '검색' }

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const posts = getAllPosts()

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '4rem 1.5rem 0' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '2rem' }}>검색</h1>
      <Suspense>
        <SearchClient posts={posts} initialQuery={q ?? ''} />
      </Suspense>
    </div>
  )
}
