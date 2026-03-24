// 동적 OG 썸네일 이미지 생성 — 시리즈 색상 + 제목 + 태그 기반
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') ?? 'mnunu.dev'
  const series = searchParams.get('series') ?? ''
  const color = searchParams.get('color') ?? '#6366f1'
  const tags = searchParams.get('tags') ?? ''

  // 색상에서 밝기 계산 (어두우면 흰 텍스트, 밝으면 검정)
  const hex = color.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  const textColor = brightness > 128 ? '#1a1a1a' : '#ffffff'
  const subTextColor = brightness > 128 ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.75)'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '64px',
          background: `linear-gradient(135deg, ${color}ee 0%, ${color} 60%, ${color}cc 100%)`,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* 배경 패턴 */}
        <div
          style={{
            position: 'absolute',
            top: 0, right: 0, bottom: 0, left: 0,
            backgroundImage: `radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          }}
        />

        {/* 블로그 이름 */}
        <div
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: subTextColor,
            marginBottom: '20px',
            letterSpacing: '0.05em',
          }}
        >
          mnunu.dev
        </div>

        {/* 시리즈 이름 */}
        {series && (
          <div
            style={{
              fontSize: '16px',
              fontWeight: 500,
              color: subTextColor,
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {series}
          </div>
        )}

        {/* 제목 */}
        <div
          style={{
            fontSize: title.length > 40 ? '42px' : '52px',
            fontWeight: 800,
            color: textColor,
            lineHeight: 1.2,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* 태그 */}
        {tags && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {tags.split(',').slice(0, 4).map((tag, i) => (
              <div
                key={i}
                style={{
                  fontSize: '14px',
                  color: subTextColor,
                  background: 'rgba(255,255,255,0.15)',
                  padding: '4px 12px',
                  borderRadius: '99px',
                  border: `1px solid rgba(255,255,255,0.25)`,
                }}
              >
                {tag.trim()}
              </div>
            ))}
          </div>
        )}
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
