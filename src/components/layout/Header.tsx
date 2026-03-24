// 블로그 헤더 — Nat Eliason 스타일: 심플 텍스트 로고 + 우측 네비
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

const NAV = [
  { label: '글', href: '/' },
  { label: '시리즈', href: '/series' },
  { label: '타임라인', href: '/timeline' },
  { label: '태그', href: '/tags' },
  { label: '검색', href: '/search' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header
      style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: '1.2rem',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          mnunu.dev
        </Link>

        <nav style={{ display: 'flex', gap: '1.75rem' }}>
          {NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: pathname === href ? 600 : 400,
                color: pathname === href ? 'var(--text-primary)' : 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* 스크롤 진행 바 — 헤더 하단에 고정 */}
      <ScrollProgress
        className="fixed h-[3px]"
        style={{ background: 'var(--accent)' } as React.CSSProperties}
      />
    </header>
  )
}
