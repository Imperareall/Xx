import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Place } from '../data/places'
import { usePlaceImages } from '../hooks/usePlaceImages'
import type { PlaceMedia } from '../hooks/usePlaceImages'

interface Props {
  place: Place
  onClose: () => void
}

export default function PlaceGallery({ place, onClose }: Props) {
  const media = usePlaceImages(place.folder)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: '#0F1115',
        overflowY: 'auto',
        padding: '80px 40px 80px',
      }}
    >
      {/* 顶部导航 */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        background: 'rgba(15,17,21,0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        zIndex: 301,
      }}>
        <div>
          <p style={{
            fontSize: '10px',
            fontWeight: 300,
            letterSpacing: '0.4em',
            color: 'rgba(231,216,201,0.5)',
            textTransform: 'uppercase',
            marginBottom: '2px',
          }}>
            {place.date}
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '20px',
            fontWeight: 400,
            color: '#F5F5F5',
            letterSpacing: '0.05em',
          }}>
            {place.name} · {place.nameEn}
          </h2>
        </div>
        <motion.button
          onClick={onClose}
          whileHover={{ rotate: 90, scale: 1.1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(245,245,245,0.6)',
          }}
        >
          <X size={16} strokeWidth={1.5} />
        </motion.button>
      </div>

      {/* 媒体瀑布流 */}
      {media.length === 0 ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60vh',
        }}>
          <p style={{
            fontSize: '12px',
            letterSpacing: '0.3em',
            color: 'rgba(184,189,199,0.3)',
            textTransform: 'uppercase',
          }}>
            暂无内容
          </p>
        </div>
      ) : (
        <div style={{
          columns: 3,
          columnGap: '8px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {media.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.03 }}
              onClick={() => setLightboxIndex(i)}
              style={{
                marginBottom: '8px',
                breakInside: 'avoid',
                cursor: 'zoom-in',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {item.type === 'image' ? (
                <motion.img
                  src={item.url}
                  alt=""
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    filter: 'brightness(0.88) saturate(0.88)',
                  }}
                />
              ) : (
                <div style={{ position: 'relative' }}>
                  <video
                    src={item.url}
                    muted
                    playsInline
                    preload="metadata"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      filter: 'brightness(0.88)',
                    }}
                  />
                  {/* 播放图标 */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.2)',
                  }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* 灯箱 */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {media[lightboxIndex].type === 'image' ? (
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                src={media[lightboxIndex].url}
                alt=""
                onClick={e => e.stopPropagation()}
                style={{
                  maxWidth: '88vw',
                  maxHeight: '88vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 32px 100px rgba(0,0,0,0.8)',
                }}
              />
            ) : (
              <motion.video
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                src={media[lightboxIndex].url}
                controls
                autoPlay
                playsInline
                onClick={e => e.stopPropagation()}
                style={{
                  maxWidth: '88vw',
                  maxHeight: '88vh',
                  borderRadius: '8px',
                  boxShadow: '0 32px 100px rgba(0,0,0,0.8)',
                }}
              />
            )}

            {/* 左箭头 */}
            <button
              onClick={e => {
                e.stopPropagation()
                setLightboxIndex(i => i !== null && i > 0 ? i - 1 : i)
              }}
              style={{
                position: 'absolute', left: '24px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50%', width: '44px', height: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(245,245,245,0.7)',
              }}
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>

            {/* 右箭头 */}
            <button
              onClick={e => {
                e.stopPropagation()
                setLightboxIndex(i => i !== null && i < media.length - 1 ? i + 1 : i)
              }}
              style={{
                position: 'absolute', right: '24px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50%', width: '44px', height: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(245,245,245,0.7)',
              }}
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>

            {/* 关闭按钮 */}
            <motion.button
              onClick={() => setLightboxIndex(null)}
              whileHover={{ rotate: 90, scale: 1.1 }}
              style={{
                position: 'absolute', top: '24px', right: '24px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50%', width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(245,245,245,0.7)',
              }}
            >
              <X size={16} strokeWidth={1.5} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
