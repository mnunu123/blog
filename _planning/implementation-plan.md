# Implementation Plan
> 기술 블로그 구현 계획 — 작성일: 2026-03-23

---

## 기술 스택

| 항목 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | Next.js 14 (App Router) | SSG 지원, MDX 처리, 파일 기반 라우팅 |
| 콘텐츠 | MDX + gray-matter | Markdown + React 컴포넌트, frontmatter 파싱 |
| MDX 처리 | next-mdx-remote | 빌드 타임 렌더링, remark/rehype 플러그인 지원 |
| 스타일 | Tailwind CSS | 유틸리티 클래스, 다크모드 간단 |
| 코드 하이라이트 | rehype-pretty-code + Shiki | 정확한 언어별 하이라이팅 |
| 목차 | rehype-slug + remark-toc | 자동 앵커 링크 |
| 타입스크립트 | TypeScript 5 | 타입 안전성 |
| 배포 | Vercel 또는 GitHub Pages | 정적 빌드 배포 |

---

## 프로젝트 구조

```
blog/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 홈 (최신 포스트 목록)
│   ├── posts/
│   │   └── [series]/
│   │       └── [slug]/
│   │           └── page.tsx     # 포스트 상세
│   ├── series/
│   │   ├── page.tsx              # 시리즈 목록
│   │   └── [seriesId]/
│   │       └── page.tsx         # 시리즈 상세 (포스트 목록)
│   ├── tags/
│   │   └── [tag]/
│   │       └── page.tsx         # 태그별 포스트
│   └── search/
│       └── page.tsx              # 검색 (클라이언트 사이드)
├── content/
│   └── posts/
│       ├── wildfire-cctv/
│       │   └── architecture-overview.mdx
│       ├── ai-agent/
│       │   └── landing-page-generator-overview.mdx
│       └── shorts-pipeline/
│           └── auto-rank-douyin-collection.mdx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx           # 검색, 방문자수, 카테고리, 태그
│   │   └── Footer.tsx
│   ├── post/
│   │   ├── PostCard.tsx          # 목록에서 쓰는 카드
│   │   ├── PostHeader.tsx        # 상세 페이지 헤더 (썸네일, 제목, 메타)
│   │   ├── PostBody.tsx          # MDX 렌더링
│   │   ├── SeriesNav.tsx         # 이전/다음 포스트 (시리즈 내)
│   │   ├── TOC.tsx               # 목차
│   │   └── RelatedPosts.tsx      # 관련 글
│   └── mdx/
│       ├── Callout.tsx           # 강조 박스
│       ├── CodeBlock.tsx         # 파일명 표시 코드 블록
│       └── ProjectCard.tsx       # 프로젝트 메타 카드
├── lib/
│   ├── posts.ts                  # MDX 파일 읽기/파싱
│   ├── taxonomy.ts               # content-taxonomy.json 로드
│   └── og-image.ts               # 동적 OG 이미지 생성
├── public/
│   └── thumbnails/               # 프로젝트별 썸네일
├── content-taxonomy.json
└── next.config.js
```

---

## 페이지별 기능 명세

### 홈 (`/`)
- 최신 포스트 6~9개 카드 그리드
- 시리즈 목록 섹션 (색상 배지 포함)
- 우측 사이드바: 검색, 방문자수, 카테고리, 태그 클라우드
- featured: true 포스트 상단 노출

### 포스트 상세 (`/posts/{series}/{slug}`)
- 상단: 대표 썸네일 (1200×630, 없으면 자동 생성)
- 제목, 날짜, 시리즈 배지, 태그, 읽기 시간
- 좌측: 목차 (TOC) — sticky
- 본문: MDX 렌더링 (코드 하이라이팅, Callout, 이미지)
- 하단: 시리즈 이전/다음 네비게이션 (SeriesNav)
- 하단: 관련 포스트 3개

### 시리즈 상세 (`/series/{seriesId}`)
- 시리즈 설명, 색상 헤더
- 시리즈 내 포스트 목록 (순서대로)

### 태그 (`/tags/{tag}`)
- 해당 태그의 포스트 목록

### 검색 (`/search`)
- 클라이언트 사이드 필터 (제목 + 요약 + 태그 기반)
- 빌드 타임에 검색 인덱스 생성

---

## 구현 순서

### Phase 1 — 기반 구조 (현재)
1. `npx create-next-app@latest` 초기화
2. 디렉토리 구조 생성
3. MDX 파이프라인 설정 (next-mdx-remote, rehype-pretty-code)
4. `lib/posts.ts` — frontmatter 파싱, 포스트 목록 조회 함수
5. `lib/taxonomy.ts` — 시리즈/카테고리 데이터 로드

### Phase 2 — 레이아웃 및 컴포넌트
6. Header, Sidebar, Footer 레이아웃
7. PostCard 컴포넌트 (홈 목록용)
8. TOC 컴포넌트
9. SeriesNav 컴포넌트
10. MDX 커스텀 컴포넌트 (Callout, CodeBlock)

### Phase 3 — 페이지 라우팅
11. 홈 페이지
12. 포스트 상세 페이지
13. 시리즈 목록/상세 페이지
14. 태그 페이지
15. 검색 페이지

### Phase 4 — 디자인 완성
16. Tailwind 스타일링 (티스토리 스타일 현대적 재해석)
17. 다크모드 지원
18. 반응형 레이아웃
19. 동적 OG 이미지 (썸네일 없는 경우)

### Phase 5 — 콘텐츠 이관
20. 샘플 포스트 3개 → content/posts/ 이동
21. 나머지 프로젝트 포스트 순차 작성

---

## 동적 OG 썸네일 생성 규칙

썸네일 파일이 없을 때 `/api/og?slug=...` 라우트로 자동 생성:
- 배경색: 시리즈 color
- 상단: 시리즈 이름
- 중앙: 포스트 제목 (큰 폰트)
- 하단: 태그 목록, 날짜
- Next.js `ImageResponse` API 활용

---

## 방문자 수

실제 방문자 집계는 외부 서비스 사용:
- **옵션 A**: Vercel Analytics (무료, 간단)
- **옵션 B**: Google Analytics 4
- 사이드바 표시는 정적 숫자가 아닌 실제 API 연결 필요
- Phase 4에서 결정

---

## 배포 전략

```
로컬 MDX 편집
  → git push
  → Vercel 자동 빌드 (SSG)
  → 배포 완료
```

커스텀 도메인 설정은 배포 후 진행.
