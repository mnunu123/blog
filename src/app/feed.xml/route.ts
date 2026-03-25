// RSS 2.0 피드 — /feed.xml 엔드포인트
import { getAllPosts } from '@/lib/posts'

const SITE_URL = 'https://blog-1vld.vercel.app'
const SITE_TITLE = 'mnunu.dev'
const SITE_DESCRIPTION = '생각을 시스템으로 바꾸는 엔지니어, 박세준의 블로그'

export async function GET() {
  const posts = getAllPosts()

  const items = posts
    .slice(0, 20)
    .map(post => {
      const url = `${SITE_URL}/posts/${post.seriesSlug}/${post.slug}`
      const pubDate = new Date(post.createdAt).toUTCString()
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
      ${post.tags.map(t => `<category><![CDATA[${t}]]></category>`).join('\n      ')}
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>ko</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
