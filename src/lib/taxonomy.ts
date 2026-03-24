// content-taxonomy.json 로드 및 시리즈/카테고리 조회 유틸리티
import taxonomyData from '../../content-taxonomy.json'

export interface SeriesInfo {
  id: string
  name: string
  slug: string
  description: string
  color: string
  posts: string[]
}

export interface CategoryInfo {
  id: string
  name: string
  slug: string
  description: string
}

export function getAllSeries(): SeriesInfo[] {
  return taxonomyData.series as SeriesInfo[]
}

export function getSeriesById(id: string): SeriesInfo | undefined {
  return (taxonomyData.series as SeriesInfo[]).find(s => s.id === id)
}

export function getSeriesBySlug(slug: string): SeriesInfo | undefined {
  return (taxonomyData.series as SeriesInfo[]).find(s => s.slug === slug)
}

export function getAllCategories(): CategoryInfo[] {
  return taxonomyData.categories as CategoryInfo[]
}
