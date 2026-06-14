import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const update = () => setProgress(audio.currentTime)
    const onLoad = () => setDuration(audio.duration)
    audio.addEventListener('timeupdate', update)
    audio.addEventListener('loadedmetadata', onLoad)
    return () => {
      audio.removeEventListener('timeupdate', update)
      audio.removeEventListener('loadedmetadata', onLoad)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(!playing)
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * duration
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <>
      <audio ref={audioRef} src="/情歌.mp3" loop />

      <div style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
      }}>

        {/* 展开的播放器面板 */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              style={{
                background: 'rgba(15,17,21,0.85)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '20px 24px',
                width: '260px',
                boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
              }}
            >
              {/* 歌曲信息 */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#F5F5F5',
                  marginBottom: '4px',
                }}>
                  情歌
                </p>
                <p style={{
                  fontSize: '11px',
                  fontWeight: 300,
                  letterSpacing: '0.2em',
                  color: 'rgba(184,189,199,0.5)',
                }}>
                  梁静茹
                </p>
              </div>

              {/* 进度条 */}
              <div
                onClick={seek}
                style={{
                  width: '100%',
                  height: '2px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  marginBottom: '8px',
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${duration ? (progress / duration) * 100 : 0}%`,
                  background: 'rgba(231,216,201,0.8)',
                  borderRadius: '2px',
                  transition: 'width 0.1s linear',
                }} />
              </div>

              {/* 时间 */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}>
                <span style={{ fontSize: '10px', color: 'rgba(184,189,199,0.4)', fontWeight: 300 }}>
                  {formatTime(progress)}
                </span>
                <span style={{ fontSize: '10px', color: 'rgba(184,189,199,0.4)', fontWeight: 300 }}>
                  {formatTime(duration)}
                </span>
              </div>

              {/* 播放按钮 */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <motion.button
                  onClick={toggle}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'rgba(231,216,201,0.12)',
                    border: '1px solid rgba(231,216,201,0.2)',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#E7D8C9',
                  }}
                >
                  {playing ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1"/>
                      <rect x="14" y="4" width="4" height="16" rx="1"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 悬浮按钮 */}
        <motion.button
          onClick={() => setExpanded(!expanded)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(15,17,21,0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            color: playing ? '#E7D8C9' : 'rgba(184,189,199,0.6)',
          }}
        >
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            animate={{ rotate: playing ? 360 : 0 }}
            transition={{ duration: 3, repeat: playing ? Infinity : 0, ease: 'linear' }}
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </motion.svg>
        </motion.button>
      </div>
    </>
  )
}
