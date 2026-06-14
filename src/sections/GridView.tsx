import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import type { MemoryItem } from '../types'
import { memories } from '../data/memories'
import { siteConfig } from '../data/config'

// ── DominoCard ──
interface DominoProps {
  item: MemoryItem
  index: number
  total: number
  hoveredId: string | null
  onHover: (id: string | null) => void
}

const tiltVariants = [
  { rx: -8, ry: -5 },
  { rx: -5, ry: 4 },
  { rx: 4, ry: -6 },
  { rx: -6, ry: 3 },
  { rx: 5, ry: -4 },
  { rx: -4, ry: 5 },
  { rx: -7, ry: -3 },
  { rx: 3, ry: -5 },
  { rx: -3, ry: 4 },
]

function DominoCard({ item, index, total, hoveredId, onHover }: DominoProps) {
  const [hovered, setHovered] = useState(false)
  const openDetail = useAppStore((s) => s.openDetail)
  const tilt = tiltVariants[index % tiltVariants.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: tilt.rx }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      onMouseEnter={() => { setHovered(true); onHover(item.id) }}
      onMouseLeave={() => { setHovered(false); onHover(null) }}
      onClick={() => openDetail(item.id)}
      style={{
        position: 'relative',
        width: '380px',
        flexShrink: 0,
        cursor: 'pointer',
        borderRadius: '6px',
        overflow: 'hidden',
        isolation: 'isolate',
        willChange: 'transform',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: hovered
          ? '0 40px 80px -10px rgba(0,0,0,1)'
          : '0 30px 60px -15px rgba(0,0,0,0.9)',
        opacity: hoveredId && hoveredId !== item.id ? 0.45 : 1,
        filter: hoveredId && hoveredId !== item.id
          ? 'brightness(0.35) blur(0.5px)'
          : 'brightness(1)',
        transition: 'opacity 0.3s ease, filter 0.3s ease, box-shadow 0.5s ease',
      }}
      animate={{
        y: hovered ? -60 : 0,
        scale: hovered ? 1.1 : 1,
        zIndex: hovered ? 9999 : total - index,
        filter: hoveredId && hoveredId !== item.id
          ? 'brightness(0.3)'
          : 'brightness(1)',
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 20,
      }}
    >
      <img
        src={item.imgSrc}
        alt={item.imgAlt}
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover',
          display: 'block',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          filter: hovered
            ? 'brightness(0.95) saturate(1)'
            : 'brightness(0.72) saturate(0.85)',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease',
        }}
      />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '4px',
              }}
            >
              <p style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                letterSpacing: '0.35em',
                color: '#fff',
                textTransform: 'uppercase',
              }}>
                {item.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function GridView() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const [dragX, setDragX] = useState(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [maxDrag, setMaxDrag] = useState(-500)

  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMaxDrag(-(memories.length * 190 - window.innerWidth + 350))
  }, [])

  // 原生监听确保 preventDefault 生效，阻止页面上下滚动
  useEffect(() => {
    const el = galleryRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      setDragX((prev) => {
        const next = prev - e.deltaY * 0.8
        return Math.min(0, Math.max(maxDrag, next))
      })
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [maxDrag])

  return (
    <>
      <motion.div
        key="grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* ── Hero 全屏封面 ── */}
        <div ref={heroRef} style={{ position: 'relative', minHeight: '100svh', height: 'auto', overflow: 'hidden' }}>
          <motion.div style={{ y: bgY, position: 'absolute', inset: '-10% 0', zIndex: 0 }}>
            <img
              src={siteConfig.heroImg}
              alt="hero"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center top',
                filter: 'brightness(0.45) saturate(0.8)',
                background: '#0F1115',
              }}
            />
          </motion.div>

          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to bottom, rgba(12,12,14,0.2) 0%, rgba(12,12,14,0.05) 40%, rgba(12,12,14,0.7) 100%)',
          }} />

          <motion.div
            style={{ opacity: heroOpacity, position: 'absolute', inset: 0, zIndex: 2 }}
            className="flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                textAlign: 'center',
                padding: '48px 52px',
                background: 'rgba(12,12,14,0.45)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '4px',
                maxWidth: '520px',
                width: '100%',
              }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.5em',
                  textTransform: 'uppercase',
                  color: 'rgba(200,200,210,0.5)',
                  marginBottom: '24px',
                  fontWeight: 300,
                }}
              >
                {siteConfig.subtitle}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(32px, 5vw, 60px)',
                  fontWeight: 400,
                  lineHeight: 1.15,
                  color: '#e4e4e7',
                  marginBottom: '0',
                }}
              >
                {siteConfig.title}
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                style={{
                  width: '32px',
                  height: '1px',
                  background: 'rgba(255,255,255,0.15)',
                  margin: '24px auto',
                }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1 }}
                style={{
                  fontSize: '11px',
                  fontWeight: 200,
                  letterSpacing: '0.3em',
                  color: 'rgba(180,180,190,0.4)',
                }}
              >
                Since {siteConfig.since}
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              position: 'absolute', bottom: '32px', left: '50%',
              transform: 'translateX(-50%)', zIndex: 2,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
            >
              <span style={{
                fontSize: '9px', letterSpacing: '0.4em',
                color: 'rgba(200,200,210,0.25)', textTransform: 'uppercase',
              }}>
                Scroll
              </span>
              <div style={{
                width: '1px', height: '32px',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)',
              }} />
            </motion.div>
          </motion.div>
        </div>

        {/* ── 3D 多米诺骨牌画廊 ── */}
        <div style={{
          padding: '20px 0 60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#0c0c0e',
        }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              fontSize: '24px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'rgba(200,200,210,0.5)',
              textAlign: 'center',
              marginBottom: '32px',
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
            }}
          >
            一整个宇宙  换一颗红豆
          </motion.p>

          {/* 背景暗光斑 */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              overflow: 'visible',
              pointerEvents: 'none',
            }}>
              <motion.div
                animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '-20%',
                  left: '-15%',
                  width: '700px',
                  height: '700px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
                  filter: 'blur(120px)',
                }}
              />
              <motion.div
                animate={{ x: [0, -40, 20, 0], y: [0, 30, -10, 0] }}
                transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
                style={{
                  position: 'absolute',
                  top: '20%',
                  right: '-10%',
                  width: '600px',
                  height: '600px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
                  filter: 'blur(140px)',
                }}
              />
            </div>

            {/* 右上到左下斜向排列 — 滚轮驱动 */}
            <div
              ref={galleryRef}
              style={{
                position: 'relative',
                zIndex: 1,
                perspective: '1200px',
                perspectiveOrigin: '50% 20%',
                width: '100%',
                overflow: 'visible',
                padding: '60px 0 120px',
                cursor: 'ns-resize',
                minHeight: '520px',
              }}
            >
              <motion.div
                animate={{ x: dragX }}
                transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                style={{
                  position: 'relative',
                  width: `${memories.length * 190 + 80}px`,
                  height: '460px',
                  rotateX: 22,
                  rotateY: -15,
                  rotateZ: -5,
                  transformStyle: 'preserve-3d',
                }}
              >
                {memories.map((item, i) => (
                  <div
                    key={item.id}
                    style={{
                      position: 'absolute',
                      left: `${i * 190}px`,
                      top: `${i * 20}px`,
                      zIndex: memories.length - i,
                    }}
                  >
                    <DominoCard item={item} index={i} total={memories.length} hoveredId={hoveredId} onHover={setHoveredId} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
