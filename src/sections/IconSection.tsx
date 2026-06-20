import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useCoupleImages } from '../hooks/useCoupleImages'
import FadeIn from '../components/FadeIn'

export default function IconSection() {
  const pairs = useCoupleImages()
  const [lightbox, setLightbox] = useState<{ a: string; b: string } | null>(null)

  return (
    <section
      id="icon"
      style={{
        background: '#0F1115',
        minHeight: '100vh',
        padding: '120px 40px 100px',
      }}
    >
      {/* 标题 */}
      <FadeIn y={24}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(24px, 4vw, 48px)',
            fontWeight: 400,
            color: '#F5F5F5',
            letterSpacing: '0.08em',
            marginBottom: '0',
          }}>
            AXUXX COUPLE ICON
          </h2>
          <div style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, rgba(231,216,201,0.3), transparent)',
            margin: '24px auto 0',
          }} />
        </div>
      </FadeIn>

      {/* 情头网格 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {pairs.map((pair, i) => (
          <FadeIn key={pair.num} delay={i * 0.04} y={32}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={() => setLightbox({ a: pair.a!, b: pair.b! })}
              style={{
                cursor: 'zoom-in',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                background: '#151922',
              }}
            >
              {/* 两张图并排 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                  <motion.img
                    src={pair.a}
                    alt={`pair ${pair.num} a`}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'brightness(0.88) saturate(0.9)',
                      transition: 'filter 0.4s ease',
                    }}
                  />
                </div>
                <div style={{ aspectRatio: '1/1', overflow: 'hidden', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
                  <motion.img
                    src={pair.b}
                    alt={`pair ${pair.num} b`}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'brightness(0.88) saturate(0.9)',
                      transition: 'filter 0.4s ease',
                    }}
                  />
                </div>
              </div>

              {/* 底部序号 */}
              <div style={{
                padding: '10px 16px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}>
                <p style={{
                  fontSize: '9px',
                  fontWeight: 300,
                  letterSpacing: '0.4em',
                  color: 'rgba(231,216,201,0.3)',
                  textTransform: 'uppercase',
                  margin: 0,
                }}>
                  No.{pair.num}
                </p>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>

      {/* 灯箱 */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              padding: '24px',
              gap: '12px',
            }}
          >
            {/* 关闭按钮 */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setLightbox(null)}
              whileHover={{ rotate: 90, scale: 1.1 }}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(245,245,245,0.7)',
                zIndex: 501,
              }}
            >
              <X size={16} strokeWidth={1.5} />
            </motion.button>

            {/* 左图 */}
            <motion.img
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              src={lightbox.a}
              alt="a"
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '42vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
              }}
            />

            {/* 中间分隔 */}
            <div style={{
              width: '1px',
              height: '60px',
              background: 'rgba(231,216,201,0.2)',
              flexShrink: 0,
            }} />

            {/* 右图 */}
            <motion.img
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              src={lightbox.b}
              alt="b"
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '42vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
