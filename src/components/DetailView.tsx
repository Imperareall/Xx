import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { memories } from '../data/memories'

export default function DetailView() {
  const activeId = useAppStore((s) => s.activeId)
  const detailState = useAppStore((s) => s.detailState)
  const close = useAppStore((s) => s.closeDetail)
  const next = useAppStore((s) => s.goNext)
  const prev = useAppStore((s) => s.goPrev)
  const jumpTo = useAppStore((s) => s.goToItem)

  const idx = memories.findIndex((m) => m.id === activeId)
  const current = idx >= 0 ? memories[idx] : null
  const isOpen = detailState !== 'closed' && current !== null

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') next()
    else if (e.key === 'ArrowLeft') prev()
    else if (e.key === 'Escape') close()
  }, [next, prev, close])

  const handleWheel = useCallback((e: WheelEvent) => {
    if (detailState === 'closed') return
    e.preventDefault()
    if (e.deltaY > 0 || e.deltaX > 0) { next() } else { prev() }
  }, [detailState, next, prev])

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onKey])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const blockClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="detail-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 22 }}
          onClick={blockClick}
          onMouseDown={blockClick}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(10,10,11,0.4)',
            backdropFilter: 'blur(48px)',
            WebkitBackdropFilter: 'blur(48px)',
            display: 'flex',
            flexDirection: 'column',
            userSelect: 'none',
          }}
        >
          {/* ── 主图 ── */}
          <div style={{ flex: 1, position: 'relative', overflow: 'auto' }}>
            <motion.img
              key={activeId}
              src={current!.imgSrc}
              alt={current!.imgAlt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'brightness(0.72) saturate(0.9)',
                position: 'absolute',
                inset: 0,
              }}
            />

            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(10,10,11,0.94) 0%, rgba(10,10,11,0.15) 45%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* 文字叠层 */}
            <div style={{
              position: 'absolute',
              bottom: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              width: '100%',
              padding: '0 40px',
              pointerEvents: 'none',
            }}>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(24px, 3.5vw, 44px)',
                fontWeight: 400, color: '#F5F5F5',
                letterSpacing: '0.03em', lineHeight: 1.15, marginBottom: '48px',
              }}>
                {current!.title}
              </h2>
              <p style={{
                fontSize: '14px',
                fontWeight: 300,
                color: 'rgba(212,212,216,0.65)',
                maxWidth: '440px',
                margin: '0 auto',
                lineHeight: 2.6,
                letterSpacing: '0.12em',
                whiteSpace: 'pre-line',
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
              }}>
                {current!.description}
              </p>
            </div>

            {/* 左/右切换热区 */}
            <button onClick={(e) => { e.stopPropagation(); prev() }} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '18%', minWidth: '60px', cursor: 'pointer', zIndex: 5, background: 'transparent', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} aria-label="Previous">
              <ChevronLeft size={22} color="rgba(245,245,245,0.25)" strokeWidth={1} style={{ marginLeft: '12px' }} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next() }} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '18%', minWidth: '60px', cursor: 'pointer', zIndex: 5, background: 'transparent', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} aria-label="Next">
              <ChevronRight size={22} color="rgba(245,245,245,0.25)" strokeWidth={1} style={{ marginRight: '12px' }} />
            </button>

            {/* 关闭按钮 */}
            <button onClick={(e) => { e.stopPropagation(); close() }} style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(10,10,11,0.6)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(245,245,245,0.5)', padding: 0 }} aria-label="Close">
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* ── 底部栏 ── */}
          <div style={{
            height: '68px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 28px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(10,10,11,0.35)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '140px' }}>
              <span style={{ fontSize: '12px', fontWeight: 300, letterSpacing: '0.3em', color: '#F5F5F5', fontVariantNumeric: 'tabular-nums', fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div style={{ width: '72px', height: '1px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px', position: 'relative' }}>
                <motion.div
                  key={`bar-${activeId}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${((idx + 1) / memories.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 100, damping: 18 }}
                  style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: 'rgba(200,212,227,0.7)', borderRadius: '1px' }}
                />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.3em', color: 'rgba(245,245,245,0.25)', fontVariantNumeric: 'tabular-nums' }}>
                {String(memories.length).padStart(2, '0')}
              </span>
            </div>

            {/* 缩略图流 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto', scrollbarWidth: 'none', maxWidth: 'calc(100vw - 360px)' }}>
              {memories.map((m, i) => {
                const active = i === idx
                const near = Math.abs(i - idx) <= 2
                if (!active && !near && i !== 0 && i !== memories.length - 1) {
                  return <div key={`dot-${m.id}`} style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', flexShrink: 0, margin: '0 3px' }} />
                }
                return (
                  <button key={m.id} onClick={(e) => { e.stopPropagation(); jumpTo(m.id) }} style={{ width: '32px', height: '22px', borderRadius: '2px', overflow: 'hidden', flexShrink: 0, padding: 0, cursor: 'pointer', background: 'transparent', border: active ? '1.5px solid rgba(200,212,227,0.8)' : '1px solid transparent', opacity: active ? 1 : 0.4 }} aria-label={`Go to ${m.title}`}>
                    <img src={m.imgSrc} alt={m.imgAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: active ? 'brightness(0.85)' : 'brightness(0.4)' }} />
                  </button>
                )
              })}
            </div>
            <div style={{ minWidth: '40px' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
