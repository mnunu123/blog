# Post Schema
> 모든 포스트는 MDX 파일로 저장. 경로: `content/posts/{series-slug}/{post-slug}.mdx`

---

## Frontmatter 필드

```yaml
---
# === 필수 ===
title: "포스트 제목"
slug: "post-slug"                    # URL에 사용 (kebab-case, 영문)
series: "series-id"                  # content-taxonomy.json의 series.id
seriesOrder: 1                       # 시리즈 내 순서 (1부터 시작)
category: "project"                  # project | troubleshooting | retrospective | experiment | devlog
createdAt: "2026-03-23"             # YYYY-MM-DD
summary: "한 줄 요약 (140자 이내)"

# === 권장 ===
updatedAt: "2026-03-23"             # 수정일 (없으면 createdAt과 동일)
tags: ["Python", "Docker", "LLM"]   # content-taxonomy.json의 tags에서 선택
thumbnail: "/thumbnails/wildfire-cctv/architecture-overview.png"
                                    # 없으면 시리즈 색상 기반 자동 생성
githubUrl: "https://github.com/mnunu123/repo-name"
projectStatus: "completed"          # completed | in-progress | archived

# === 선택 ===
relatedPosts: ["other-post-slug"]   # 관련 포스트 슬러그 배열
featured: false                     # true면 홈 피처드 섹션 노출
readingTime: 8                      # 분 단위 예상 읽기 시간 (자동 계산 가능)
---
```

---

## 본문 구조 (표준 템플릿)

```mdx
## 한 줄 요약
> 이 프로젝트/실험이 무엇인지 한 문장으로.

---

## 문제
무엇이 필요했는가? 어떤 한계/불편함이 있었는가?

## 접근
어떤 방식으로 해결하려 했는가? 다른 선택지는 뭐가 있었고 왜 이 방법을 택했는가?

## 구현
실제로 어떻게 만들었는가? 핵심 코드, 구조 다이어그램, 스크린샷.

```코드블록 예시
# 코드는 언어 명시
python
def main():
    pass
```

## 시행착오
막혔던 부분, 삽질 기록, 예상과 달랐던 것들.

## 결과
최종 산출물. 수치, 스크린샷, 데모 링크.

## 다음 단계
남은 과제, 개선 아이디어, 후속 포스트 예고.

---

_시리즈: [시리즈 이름](/series/series-slug) · 이전: [이전 글] · 다음: [다음 글]_
```

---

## 파일 경로 규칙

```
content/
  posts/
    wildfire-cctv/
      architecture-overview.mdx
      microservices-deep-dive.mdx
    ai-agent/
      landing-page-generator-overview.mdx
      ppt-team-agent-overview.mdx
    shorts-pipeline/
      auto-rank-douyin-collection.mdx
    remotion/
      inline-ai-video-production.mdx
    ...
public/
  thumbnails/
    wildfire-cctv/
      architecture-overview.png     # 1200×630px PNG
    ai-agent/
      landing-page-generator-overview.png
    default.png                     # fallback 썸네일
```

---

## 썸네일 규칙 상세

| 규칙 | 내용 |
|------|------|
| 파일명 | `{post-slug}.png` (kebab-case, 영문) |
| 경로 | `/public/thumbnails/{series-slug}/{post-slug}.png` |
| 크기 | 1200 × 630px (Open Graph 표준) |
| 포맷 | PNG 권장, JPEG 허용 |
| 없을 때 | 시리즈 color + 포스트 title 텍스트를 Canvas API로 동적 생성 |
| 직접 넣을 때 | 스크린샷, 아키텍처 다이어그램, 결과물 캡처 권장 |

---

## MDX 지원 컴포넌트

| 컴포넌트 | 용도 |
|---------|------|
| `<Callout type="info|warning|tip">` | 강조 박스 |
| `<CodeBlock lang="python" filename="main.py">` | 파일명 표시 코드 블록 |
| `<Image src="..." caption="...">` | 캡션 있는 이미지 |
| `<SeriesNav>` | 시리즈 내 이전/다음 포스트 네비게이션 |
| `<ProjectCard github="..." status="...">` | 프로젝트 메타 카드 |
| `<TOC>` | 목차 (자동 생성) |
