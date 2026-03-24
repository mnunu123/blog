// 메인 페이지 하단 소셜 링크 독 — 마우스 근접 시 자기장 확대 효과
'use client'

import {
  useState,
  useRef,
  useContext,
  createContext,
  useEffect,
} from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion'

const MouseContext = createContext({ x: 0, y: 0 })

const GithubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const TwitterIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

interface DockItem {
  icon: React.ReactNode
  href: string
  label: string
}

function DockIcon({ icon, href, label }: DockItem) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mouse = useContext(MouseContext)
  const distance = useMotionValue(Infinity)

  useEffect(() => {
    if (!ref.current || mouse.x === 0) {
      distance.set(Infinity)
      return
    }
    const iconRect = ref.current.getBoundingClientRect()
    const containerRect = ref.current.parentElement!.getBoundingClientRect()
    const iconCenterX = iconRect.left + iconRect.width / 2
    const mouseXAbsolute = containerRect.left + mouse.x
    distance.set(Math.abs(mouseXAbsolute - iconCenterX))
  }, [mouse, distance])

  const scale = useTransform(distance, [0, 80], [1.4, 1.0])
  const springScale = useSpring(scale, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: 40,
        height: 40,
        scale: springScale,
        transformOrigin: 'bottom center', // 아래를 기준으로 위로 커짐
      }}
      className="dock-icon"
    >
      {icon}
    </motion.a>
  )
}

export default function MagneticDock() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const items: DockItem[] = [
    { icon: <GithubIcon />, href: 'https://github.com/mnunu123', label: 'GitHub' },
    { icon: <LinkedinIcon />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <TwitterIcon />, href: 'https://x.com', label: 'Twitter / X' },
    { icon: <MailIcon />, href: 'mailto:contact@example.com', label: 'Email' },
  ]

  return (
    <>
      <style>{`
        .dock-wrap {
          display: inline-flex;
          align-items: flex-end;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 16px;
          background: color-mix(in srgb, var(--border) 60%, transparent);
          border: 1px solid var(--border);
          height: calc(40px + 20px); /* 고정 높이 — scale 변환은 레이아웃에 영향 없음 */
          overflow: visible; /* scale된 아이콘이 잘리지 않게 */
        }
        .dock-icon {
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: var(--surface);
          color: var(--text-secondary);
          border: 1px solid var(--border);
          text-decoration: none;
          flex-shrink: 0;
          transition: color 0.15s, border-color 0.15s;
        }
        .dock-icon:hover {
          color: var(--accent);
          border-color: var(--accent);
        }
      `}</style>
      <MouseContext.Provider value={pos}>
        <div
          onMouseMove={e => {
            const { clientX, currentTarget } = e
            const { left } = currentTarget.getBoundingClientRect()
            setPos({ x: clientX - left, y: 0 })
          }}
          onMouseLeave={() => setPos({ x: 0, y: 0 })}
          className="dock-wrap"
        >
          {items.map(item => (
            <DockIcon key={item.label} {...item} />
          ))}
        </div>
      </MouseContext.Provider>
    </>
  )
}
