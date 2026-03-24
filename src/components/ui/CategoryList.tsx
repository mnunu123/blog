// 카테고리(시리즈) 목록 — 호버 시 확장 + 코너 브래킷 인터랙션
'use client'
import React, { useState } from 'react'

export interface Category {
  id: string | number
  title: string
  subtitle?: string
  icon?: React.ReactNode
  onClick?: () => void
  featured?: boolean
}

export interface CategoryListProps {
  categories: Category[]
  className?: string
}

export const CategoryList = ({ categories, className }: CategoryListProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | number | null>(null)

  return (
    <div className={className} style={{ width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {categories.map(category => {
          const isHovered = hoveredItem === category.id
          return (
            <div
              key={category.id}
              style={{ position: 'relative' }}
              onMouseEnter={() => setHoveredItem(category.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={category.onClick}
            >
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  border: `1px solid ${isHovered ? 'var(--accent)' : 'var(--border)'}`,
                  background: isHovered
                    ? 'color-mix(in srgb, var(--accent) 6%, var(--bg-card))'
                    : 'var(--bg-card)',
                  height: isHovered ? '72px' : '52px',
                  cursor: 'pointer',
                  transition: 'height 0.3s ease, border-color 0.3s ease, background 0.3s ease',
                  boxShadow: isHovered ? '0 4px 20px color-mix(in srgb, var(--accent) 15%, transparent)' : 'none',
                }}
              >
                {/* 코너 브래킷 */}
                {isHovered && (
                  <>
                    <span style={{
                      position: 'absolute', top: 10, left: 10, width: 20, height: 20,
                    }}>
                      <span style={{ position: 'absolute', top: 0, left: 0, width: 14, height: 1.5, background: 'var(--accent)', display: 'block' }} />
                      <span style={{ position: 'absolute', top: 0, left: 0, width: 1.5, height: 14, background: 'var(--accent)', display: 'block' }} />
                    </span>
                    <span style={{
                      position: 'absolute', bottom: 10, right: 10, width: 20, height: 20,
                    }}>
                      <span style={{ position: 'absolute', bottom: 0, right: 0, width: 14, height: 1.5, background: 'var(--accent)', display: 'block' }} />
                      <span style={{ position: 'absolute', bottom: 0, right: 0, width: 1.5, height: 14, background: 'var(--accent)', display: 'block' }} />
                    </span>
                  </>
                )}

                {/* 콘텐츠 */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  padding: '0 20px',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      margin: 0,
                      fontFamily: 'var(--font-sans)',
                      fontSize: category.featured ? '1rem' : '0.9rem',
                      fontWeight: 600,
                      color: isHovered ? 'var(--accent)' : 'var(--text-primary)',
                      transition: 'color 0.3s ease',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {category.title}
                    </p>
                    {category.subtitle && (
                      <p style={{
                        margin: '2px 0 0',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.78rem',
                        color: 'var(--text-secondary)',
                        opacity: isHovered ? 1 : 0,
                        maxHeight: isHovered ? '24px' : '0',
                        overflow: 'hidden',
                        transition: 'opacity 0.25s ease, max-height 0.3s ease',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}>
                        {category.subtitle}
                      </p>
                    )}
                  </div>

                  {/* 오른쪽 아이콘 */}
                  {category.icon && (
                    <div style={{
                      marginLeft: 16,
                      flexShrink: 0,
                      color: 'var(--accent)',
                      opacity: isHovered ? 1 : 0,
                      transition: 'opacity 0.25s ease',
                    }}>
                      {category.icon}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
