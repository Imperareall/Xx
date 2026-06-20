import { useState } from 'react'
import { motion } from 'framer-motion'
import PetsStrip from '../components/PetsStrip'
import ImageLightbox from '../components/ImageLightbox'
import { foreverImgList, experienceImgList, xxImgList } from '../hooks/useImages'

function ImageStrip({
  images,
  reverse = false,
}: {
  images: string[]
  reverse?: boolean
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const autoDuration = Math.min(Math.max(images.length * 1.2, 20), 120)

  return (
    <>
      <ImageLightbox images={images} currentIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />

      <div style={{ width: '100%', overflow: 'hidden', padding: '20px 0' }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, #0F1115, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, #0F1115, transparent)', zIndex: 2, pointerEvents: 'none' }} />

          <motion.div
            animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
            transition={{ duration: autoDuration, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: '12px', width: 'max-content' }}
          >
            {[...images, ...images].map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                onClick={() => setLightboxIndex(i % images.length)}
                style={{ flexShrink: 0, width: '220px', height: '220px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', cursor: 'zoom-in' }}
              >
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) saturate(0.88)', display: 'block', pointerEvents: 'none' }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: '#0F1115',
        minHeight: '100vh',
        paddingTop: '72px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '60px',
        padding: '120px 0',
      }}
    >
      {/* 小标题 */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontSize: '10px',
          fontWeight: 300,
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'rgba(231,216,201,0.3)',
          marginBottom: '12px',
        }}>
          About Us
        </p>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 400,
          color: 'rgba(245,245,245,0.85)',
          letterSpacing: '0.05em',
        }}>
          AXUXX
        </h2>
      </div>

      {/* 第一条：Forever 向左滚动（73 → ~87s） */}
      <ImageStrip images={foreverImgList} reverse={false} />

      {/* 第二条：experiencepic 向左滚动（21 → ~25s） */}
      <ImageStrip images={experienceImgList} reverse={false} />

      {/* 第三条：xx 向右滚动（26 → ~31s） */}
      <ImageStrip images={xxImgList} reverse={true} />

      {/* 第三条：pets 向右滚动 */}
      <PetsStrip />

    </section>
  )
}
