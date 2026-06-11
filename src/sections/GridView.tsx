import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import GridCard from '../components/GridCard'
import { memories } from '../data/memories'
import { siteConfig } from '../data/config'
import { useAppStore } from '../store/useAppStore'

export default function GridView() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)

  const detailState = useAppStore((s) => s.detailState)
  const activeId = useAppStore((s) => s.activeId)

  // Reset hover state when detail opens or closes
  useEffect(() => {
    if (detailState !== 'closed') {
      setHoveredCardId(null)
    }
  }, [detailState])

  return (
    <>
      <motion.div
        key="grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: detailState !== 'closed' ? 0.3 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: detailState !== 'closed' ? 'none' : 'auto' }}
      >
        {/* ── Hero 全屏封面 ── */}
        <div
          ref={heroRef}
          style={{ position: 'relative', height: '100svh', overflow: 'hidden' }}
        >
          <motion.div style={{ y: bgY, position: 'absolute', inset: '-10% 0', zIndex: 0 }}>
            <img
              src={siteConfig.heroImg}
              alt="hero"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.48) saturate(0.85)',
              }}
            />
          </motion.div>

          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to bottom, rgba(13,12,11,0.2) 0%, rgba(13,12,11,0.05) 40%, rgba(13,12,11,0.7) 100%)',
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
                background: 'rgba(13,12,11,0.45)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(232,228,221,0.08)',
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
                  color: '#D4A89A',
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
                  color: '#F7F4EF',
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
                  background: 'rgba(212,168,154,0.5)',
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
                  color: 'rgba(232,228,221,0.4)',
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
                color: 'rgba(232,228,221,0.3)', textTransform: 'uppercase',
              }}>
                Scroll
              </span>
              <div style={{
                width: '1px', height: '32px',
                background: 'linear-gradient(to bottom, rgba(212,168,154,0.5), transparent)',
              }} />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Masonry 图片墙 ── */}
        <div id="grid" style={{ padding: '40px 12px 80px', maxWidth: '1440px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '20px', paddingLeft: '4px' }}
          >
            <p style={{
              fontSize: '10px', letterSpacing: '0.45em',
              textTransform: 'uppercase', color: '#D4A89A', fontWeight: 300,
            }}>
              {memories.length} Chapters
            </p>
          </motion.div>

          <div className="masonry-grid" style={{ columns: 3, columnGap: '5px' }}>
            {memories.map((item, i) => {
              const isHidden = detailState !== 'closed' && item.id === activeId
              const isCardHovered = hoveredCardId === item.id
              const isCardDimmed = hoveredCardId !== null && hoveredCardId !== item.id

              return (
                <div key={item.id} style={{ marginBottom: '5px', breakInside: 'avoid' }}>
                  <GridCard
                    item={item}
                    index={i}
                    isHovered={isCardHovered}
                    isDimmed={isCardDimmed}
                    onHover={setHoveredCardId}
                    hidden={isHidden}
                  />
                </div>
              )
            })}
          </div>

          <style>{`
            @media (max-width: 900px)  { .masonry-grid { columns: 2 !important; } }
            @media (max-width: 560px)  { .masonry-grid { columns: 1 !important; } }
          `}</style>
        </div>
      </motion.div>

    </>
  )
}
