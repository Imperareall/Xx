import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Props {
  images: string[]
  currentIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function ImageLightbox({ images, currentIndex, onClose, onNavigate }: Props) {
  const isOpen = currentIndex !== null

  const goPrev = useCallback(() => {
    if (currentIndex === null) return
    onNavigate((currentIndex - 1 + images.length) % images.length)
  }, [currentIndex, images.length, onNavigate])

  const goNext = useCallback(() => {
    if (currentIndex === null) return
    onNavigate((currentIndex + 1) % images.length)
  }, [currentIndex, images.length, onNavigate])

  // ESC 关闭 + 方向键切换
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose, goNext, goPrev])

  // 滚轮切换
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isOpen) return
      e.preventDefault()
      if (e.deltaY > 0) goNext()
      else goPrev()
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isOpen, goNext, goPrev])

  // 锁定滚动
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && currentIndex !== null && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
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
            cursor: 'zoom-out',
          }}
        >
          {/* 关闭按钮 */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
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

          {/* 进度指示 */}
          <div style={{
            position: 'absolute',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            {images.map((_, i) => (
              <div
                key={i}
                onClick={(e) => { e.stopPropagation(); onNavigate(i) }}
                style={{
                  width: i === currentIndex ? '24px' : '6px',
                  height: '2px',
                  borderRadius: '2px',
                  background: i === currentIndex
                    ? 'rgba(231,216,201,0.8)'
                    : 'rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* ESC 提示 */}
          <div style={{
            position: 'absolute',
            bottom: '28px',
            right: '32px',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.2)',
            textTransform: 'uppercase',
          }}>
            ESC to close
          </div>

          {/* 图片 */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
              src={images[currentIndex]}
              alt=""
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '88vw',
                maxHeight: '88vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 32px 100px rgba(0,0,0,0.8)',
                cursor: 'default',
              }}
            />
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
