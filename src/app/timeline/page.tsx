// 타임라인 페이지 — 프로젝트 여정 스크롤 타임라인
import type { Metadata } from 'next'
import Link from 'next/link'
import { Timeline } from '@/components/ui/Timeline'

export const metadata: Metadata = {
  title: '타임라인',
  description: '프로젝트 개발 여정 기록',
}

const data = [
  {
    title: "2026년 3월",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
          블로그를 직접 만들고, 그동안 쌓인 프로젝트들을 글로 정리하기 시작했다.
          Next.js 16 + MDX 기반으로 직접 설계했고, 다크모드·시리즈·태그 시스템을 구현했다.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { href: '/posts/threebot/backend-postgresql-docker', label: '쓰리봇 — PostgreSQL + Docker + FastAPI 백엔드 구축', tag: '백엔드' },
            { href: '/posts/threebot/geojson-rendering-architecture', label: '쓰리봇 — GeoJSON 경계 병합과 렌더링 구조 분리', tag: '지도' },
            { href: '/posts/dp-robot/dp-robot-landing-page', label: 'DP로봇 랜딩페이지 — Figma MCP + Cursor 바이브 코딩', tag: '웹' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                textDecoration: 'none',
              }}
            >
              <span style={{
                fontSize: '0.7rem', fontWeight: 600,
                color: 'var(--accent)', background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                padding: '0.2rem 0.5rem', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
              }}>
                {item.tag}
              </span>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2026년 2월",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
          쓰리봇 웹앱의 지도 시각화를 고도화했다. Leaflet에서 네이버 지도로 전환하면서
          만난 5가지 문제를 하나씩 해결하고, GeoJSON 기반 행정구역 경계 시각화를 완성했다.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { href: '/posts/threebot/naver-map-troubleshooting', label: '네이버 지도 전환 트러블슈팅 — 이벤트·드래그·좌표·재귀·API 5가지', tag: '지도' },
            { href: '/posts/threebot/web-map-visualization', label: '쓰리봇 웹앱 개발 회고 — 마커·필터·토글·디자인', tag: '프론트' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                padding: '0.85rem 1rem', borderRadius: '8px',
                border: '1px solid var(--border)', background: 'var(--bg-card)', textDecoration: 'none',
              }}
            >
              <span style={{
                fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent)',
                background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                padding: '0.2rem 0.5rem', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
              }}>
                {item.tag}
              </span>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "진행 중",
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
          InMoov 기반 면접훈련 로봇과 협업형 CCTV 산불 예측 시스템을 동시에 설계 중이다.
          두 프로젝트 모두 AI 서버와 하드웨어/센서를 분리하는 구조로 접근하고 있다.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { href: '/posts/interview-robot/inmoov-architecture-overview', label: '면접훈련 로봇 — InMoov를 AI 인터페이스 장치로 설계하기', tag: '로봇', wip: true },
            { href: '/posts/ai-agent/wildfire-claude-code-strategy', label: '협업형 CCTV 산불 예측 — Claude Code 자동 구현 전략', tag: 'AI', wip: true },
            { href: '/posts/wildfire-cctv/architecture-overview', label: '산불 CCTV 협력 감지 시스템 — 마이크로서비스 5개 협업', tag: 'CV', wip: true },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                padding: '0.85rem 1rem', borderRadius: '8px',
                border: '1px solid var(--border)', background: 'var(--bg-card)', textDecoration: 'none',
                opacity: 0.75,
              }}
            >
              <span style={{
                fontSize: '0.7rem', fontWeight: 600, color: '#10b981',
                background: 'color-mix(in srgb, #10b981 10%, transparent)',
                padding: '0.2rem 0.5rem', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
              }}>
                {item.tag}
              </span>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {item.label}
                <span style={{ marginLeft: '0.5rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  WIP
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    ),
  },
]

export default function TimelinePage() {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '4rem 1.5rem 0' }}>
      {/* 헤더 */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          marginBottom: '0.75rem',
          letterSpacing: '-0.02em',
        }}>
          개발 여정
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
        }}>
          만들고 부수면서 배운 것들을 시간순으로 기록합니다.
          스크롤하면 타임라인이 채워집니다.
        </p>
      </div>

      {/* 타임라인 */}
      <Timeline data={data} />
    </div>
  )
}
