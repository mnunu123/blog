# Project Inventory
> 작성일: 2026-03-23 | 데이터 기준: 로컬 폴더(C:\Users\UESR\Desktop\claude) + GitHub(mnunu123)

---

## 데이터 소스 접근 상태

| 소스 | 상태 | 비고 |
|------|------|------|
| 로컬 폴더 `C:\Users\UESR\Desktop\claude` | ✅ 접근 가능 | 직접 파일 분석 완료 |
| GitHub `github.com/mnunu123` | ✅ 접근 가능 (공개 레포) | 11개 레포 확인 |
| Notion `305daa1f0c7a808ab36fcc9288e12026` | ❌ 접근 불가 | 비공개 페이지, 인증 필요. 내용 추정하지 않음 |

---

## 프로젝트 목록 (총 11개)

### 시리즈 A — AI 멀티에이전트 자동화

| 프로젝트 | 로컬 경로 | GitHub | 기술스택 | 상태 |
|---------|----------|--------|----------|------|
| 상세페이지 자동 생성기 | `detail-page 2/landing-page-generator` | `landing-page-generator` | Python, Gemini API, 5-Agent | ✅ 완료 |
| PPT Team Agent | `ppt_team_agent-main` | `ppt-agent` | Node.js, pptxgenjs, Playwright, Claude API | ✅ 완료 |

**시리즈 설명**: AI 에이전트 팀이 협업해 콘텐츠(상세페이지, PPT)를 자동 생성하는 프로젝트들. 동일한 멀티에이전트 아키텍처 패턴 공유.

---

### 시리즈 B — 쇼츠 영상 자동화 파이프라인

| 프로젝트 | 로컬 경로 | GitHub | 기술스택 | 상태 |
|---------|----------|--------|----------|------|
| auto-rank (수집) | `auto-rank` | `auto-rank` | Python, Playwright, yt-dlp, Google Translate | ✅ 1단계 완료 |
| youtube-video | `youtube-video/Douyin_TikTok_Download_API` | - | - | 🔍 미확인 (하위폴더만 존재) |

**시리즈 설명**: 한국어 키워드 → 도우인 검색 → 영상 수집 → (향후) 편집 → 업로드로 이어지는 자동화 파이프라인. 현재 1단계(수집) 완료.

---

### 시리즈 C — Remotion 영상 제작

| 프로젝트 | 로컬 경로 | GitHub | 기술스택 | 상태 |
|---------|----------|--------|----------|------|
| 인라인 AI 소개 영상 | `inline-ai-video` | `inline-ai-video` | TypeScript, Remotion, 13씬, 3분 | ✅ 완료 |
| Remotion 인트로 영상 | `remotion-intro-video` | `remotion-intro-video` | TypeScript, Remotion | ✅ 완료 |

**시리즈 설명**: Remotion(코드로 영상 만들기) 활용 프로젝트. 두 프로젝트 모두 동일 기술 기반으로 중복 실험 기록은 하나의 시리즈로 묶음.

---

### 시리즈 D — 쓰리봇 (빗물받이 관리 플랫폼)

| 프로젝트 | 로컬 경로 | GitHub | 기술스택 | 상태 |
|---------|----------|--------|----------|------|
| 빗물받이 현황 웹앱 | `Threebor_website` | `threebot-website` | Next.js 14, Naver Maps, Leaflet, Recharts | ✅ 완료 |
| 무게 측정 모듈 | - (GitHub only) | `threebot_weight` | Python | ✅ 완료 |

**시리즈 설명**: 빗물받이 모니터링 시스템. 프론트(지도 기반 현황판) + 센서(무게 측정)로 구성된 IoT+웹 프로젝트.

---

### 단독 프로젝트

| 프로젝트 | 로컬 경로 | GitHub | 기술스택 | 상태 |
|---------|----------|--------|----------|------|
| 산불 CCTV 협력 감지 | `popol/wildfire-cctv` | - | Python 마이크로서비스 5개, Docker, React | ✅ MVP 완료 |
| DProbot 랜딩페이지 | `DP로봇 랜딩페이지` | `dp-robot-landing` | Next.js, Tailwind | ✅ 완료 |
| AI 자동화 포트폴리오 | `portfolio` | `portfolio` | HTML, CSS, PDF | ✅ 완료 |
| 스마트 무드 조명 | - (GitHub only) | `-Smart-mood-light` | Python, Jupyter Notebook | ✅ 완료 |

---

## 중복/묶음 처리 기준

| 상황 | 처리 방법 |
|------|---------|
| inline-ai-video + remotion-intro-video | 시리즈 C로 묶음. 각각 별도 포스트이나 시리즈 네비게이션으로 연결 |
| ppt_team_agent + landing-page-generator | 시리즈 A로 묶음. 동일 멀티에이전트 패턴의 두 구현체 |
| Threebor_website + threebot_weight | 시리즈 D로 묶음. 동일 클라이언트 프로젝트의 프론트/백 |
| auto-rank README의 "확장 포인트" | 미구현 내용은 포스트에서 "다음 단계"로 명시, 별도 포스팅 불가 |

---

## 포스팅 우선순위

1. 산불 CCTV 협력 감지 시스템 — 아키텍처가 가장 복잡, 기술 블로그 대표글 적합
2. 상세페이지 자동 생성기 — 5에이전트 시스템, 독자 관심도 높음
3. auto-rank 쇼츠 파이프라인 — 도우인 접근법 등 실전 트러블슈팅 많음
4. 인라인 AI 영상 (Remotion) — 코드로 영상 만들기 주제
5. 쓰리봇 웹앱 — IoT+웹 결합, 지도 연동
6. PPT Team Agent — Claude 서브에이전트 활용
7. DProbot 랜딩페이지
8. 스마트 무드 조명
9. AI 포트폴리오 제작기

---

## 접근 불가 데이터

- **Notion** (`305daa1f0c7a808ab36fcc9288e12026`): 비공개. 공유 링크 활성화 후 재분석 필요. 현재 포스트 초안 생성 시 노션 내용은 포함하지 않음.
- **youtube-video/Douyin_TikTok_Download_API**: 하위 폴더 이름만 확인됨. 별도 README 없어 포스트 생성 보류.
