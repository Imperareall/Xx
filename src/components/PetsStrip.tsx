import { useState } from 'react'
import { motion } from 'framer-motion'
import ImageLightbox from './ImageLightbox'

const petImages = [
  '/pets/微信图片_20251113192911.jpg',
  '/pets/微信图片_20251113192913.jpg',
  '/pets/微信图片_20251113193410.jpg',
  '/pets/微信图片_20260525201200.jpg',
  '/pets/微信图片_20260527155223.jpg',
  '/pets/微信图片_20260527155242.jpg',
  '/pets/微信图片_20260527155351.jpg',
  '/pets/微信图片_20260527155405.jpg',
  '/pets/微信图片_20260527155427.jpg',
  '/pets/微信图片_20260527155429.jpg',
  '/pets/微信图片_20260527155519.jpg',
  '/pets/微信图片_20260612145551.jpg',
  '/pets/锦鲤.webp',
]

const doubled = [...petImages, ...petImages]

export default function PetsStrip() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <ImageLightbox
        images={petImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />

      <div style={{ width: '100%', padding: '20px 0', overflow: 'hidden' }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px',
            background: 'linear-gradient(to right, #0F1115, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px',
            background: 'linear-gradient(to left, #0F1115, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />

          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: '12px', width: 'max-content', paddingLeft: '12px' }}
          >
            {doubled.map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                onClick={() => setLightboxIndex(i % petImages.length)}
                style={{
                  flexShrink: 0,
                  width: '220px',
                  height: '220px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  cursor: 'zoom-in',
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.85) saturate(0.88)',
                    display: 'block',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  )
}
