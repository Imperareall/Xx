export type GridSize = 'large' | 'medium' | 'tall'
export type AppView = 'work' | 'about' | 'links' | 'icon' | 'globe'
export type DetailState = 'closed' | 'open' | 'zoomed'

export interface MemoryItem {
  id: string
  index: number
  title: string
  subtitle: string
  date: string
  category: string
  description: string
  imgSrc: string
  imgAlt: string
  videoSrc?: string
  videoPoster?: string
  size: GridSize
}

export interface AboutData {
  name: string
  tagline: string
  bio: string[]
  experiences: { year: string; title: string; desc: string }[]
  honors: string[]
}

export interface SiteConfig {
  title: string
  subtitle: string
  coupleNames?: string
  since: string
  heroImg: string
}

export interface AppStore {
  view: AppView
  setView: (v: AppView) => void
  activeId: string | null
  detailState: DetailState
  openDetail: (id: string) => void
  closeDetail: () => void
  goToItem: (id: string) => void
  toggleZoom: () => void
  goNext: () => void
  goPrev: () => void
}
