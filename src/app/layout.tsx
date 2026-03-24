// 루트 레이아웃 — ThemeProvider + 좌측 하단 다크모드 토글
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SpotlightCursor } from '@/components/SpotlightCursor'

export const metadata: Metadata = {
  title: {
    default: 'mnunu.dev',
    template: '%s — mnunu.dev',
  },
  description: 'AI 자동화, 웹 개발, 로보틱스 프로젝트 기록',
  openGraph: {
    siteName: 'mnunu.dev',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body style={{ background: 'var(--bg)', color: 'var(--text-primary)', transition: 'background 0.2s, color 0.2s' }}>
        {/* FOUC 방지 — next/script beforeInteractive: 하이드레이션 전에 실행 */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <footer
            style={{
              borderTop: '1px solid var(--border)',
              marginTop: '6rem',
              padding: '2rem 0',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-sans)',
            }}
          >
            © 2026 mnunu.dev
          </footer>

          <SpotlightCursor />

          {/* 좌측 하단 고정 테마 토글 */}
          <div
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              left: '1.5rem',
              zIndex: 100,
            }}
          >
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
