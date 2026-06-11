import { create } from 'zustand'
import type { AppStore } from '../types'
import { memories } from '../data/memories'

export const useAppStore = create<AppStore>((set, get) => ({
  view: 'work',
  setView: (v) => set({ view: v }),
  activeId: null,
  detailState: 'closed',
  openDetail: (id) => set({ activeId: id, detailState: 'open' }),
  closeDetail: () => set({ activeId: null, detailState: 'closed' }),
  goToItem: (id) => {
    // 仅在 detail 已打开时使用，只改 activeId 不碰 detailState
    const { detailState } = get()
    if (detailState !== 'closed') {
      set({ activeId: id })
    }
  },
  toggleZoom: () =>
    set((s) => ({ detailState: s.detailState === 'open' ? 'zoomed' : 'open' })),
  goNext: () => {
    const { activeId, detailState } = get()
    if (!activeId || detailState === 'closed') return
    const idx = memories.findIndex((m) => m.id === activeId)
    set({ activeId: memories[(idx + 1) % memories.length].id })
  },
  goPrev: () => {
    const { activeId, detailState } = get()
    if (!activeId || detailState === 'closed') return
    const idx = memories.findIndex((m) => m.id === activeId)
    set({ activeId: memories[(idx - 1 + memories.length) % memories.length].id })
  },
}))
