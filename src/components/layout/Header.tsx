// 블로그 헤더 — 심플 텍스트 로고 + 우측 네비 (모바일: 햄버거 메뉴)
'use client'

import { useState } from 'react'
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
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        borderBottom: open ? 'none' : '1px solid var(--border)',
        background: 'var(--bg)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="header-inner">
        <Link href="/" className="header-logo">
          mnunu.dev
        </Link>

        {/* 데스크탑 네비 */}
        <nav className="header-nav-desktop">
          {NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? 'active' : ''}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button
          className="header-hamburger"
          onClick={() => setOpen(!open)}
          aria-label="메뉴 열기"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {open && (
        <nav
          className="header-nav-mobile"
          style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}
        >
          {NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}

      {/* 스크롤 진행 바 */}
      <ScrollProgress
        className="fixed h-[3px]"
        style={{ background: 'var(--accent)' } as React.CSSProperties}
      />
    </header>
  )
}
