import { motion } from 'framer-motion'
import type { MemoryItem } from '../types'
import { useAppStore } from '../store/useAppStore'

interface Props {
  item: MemoryItem
  index: number
  isHovered: boolean
  isDimmed: boolean
  onHover: (id: string | null) => void
  hidden: boolean
}

export default function GridCard({ item, index, isHovered, isDimmed, onHover, hidden }: Props) {
  const openDetail = useAppStore((s) => s.openDetail)

  return (
    <motion.div
      {...(hidden ? {} : { layoutId: `card-${item.id}` })}
      initial={{ opacity: 0 }}
      animate={{
        opacity: hidden ? 0 : 1,
        scale: isHovered ? 1.02 : 1,
        zIndex: isHovered ? 10 : 1,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.25, 1, 0.5, 1],
      }}
      style={{
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: '3px',
        breakInside: 'avoid',
        pointerEvents: hidden ? 'none' : 'auto',
        boxShadow: isHovered
          ? '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,168,154,0.15)'
          : 'none',
        transition: 'box-shadow 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      onClick={() => openDetail(item.id)}
      onMouseEnter={() => { if (!hidden) onHover(item.id) }}
      onMouseLeave={() => onHover(null)}
    >
      {/* 图片 */}
      <motion.img
        src={item.imgSrc}
        alt={item.imgAlt}
        animate={{ scale: isHovered ? 1.04 : 1 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          filter: isHovered ? 'brightness(0.82) saturate(1.05)' : 'brightness(0.68) saturate(0.85)',
          transition: 'filter 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      />

      {/* ─── 非悬停卡片的暗色遮罩（代替 CSS filter 的 dim 效果）─── */}
      <motion.div
        animate={{ opacity: isDimmed ? 0.55 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.55)',
          pointerEvents: 'none',
        }}
      />

      {/* 常驻底部渐变 — hover 时加深 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isHovered
          ? 'linear-gradient(to top, rgba(13,12,11,0.92) 0%, rgba(13,12,11,0.3) 50%, transparent 100%)'
          : 'linear-gradient(to top, rgba(13,12,11,0.78) 0%, rgba(13,12,11,0.12) 45%, transparent 100%)',
        transition: 'background 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        pointerEvents: 'none',
      }} />

      {/* ── 左上角：序号 ── */}
      <div style={{
        position: 'absolute',
        top: '14px',
        left: '16px',
        fontFamily: '"Playfair Display", serif',
        fontSize: '11px',
        fontWeight: 400,
        fontStyle: 'italic',
        letterSpacing: '0.04em',
        color: isHovered ? 'rgba(212,168,154,0.85)' : 'rgba(212,168,154,0.55)',
        transition: 'color 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      }}>
        {String(item.index).padStart(2, '0')}
      </div>

      {/* ── 右上角：日期标签 ── */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        textAlign: 'right',
      }}>
        <p style={{
          fontSize: '8px',
          fontWeight: 200,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'rgba(232,228,221,0.45)',
          margin: '0 0 2px',
        }}>
          {item.date}
        </p>
        <p style={{
          fontSize: '8px',
          fontWeight: 300,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(212,168,154,0.5)',
          margin: 0,
        }}>
          {item.category}
        </p>
      </div>

      {/* ── 底部文字 — 杂志式留白排版 ── */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px 18px 18px',
      }}>
        <h3 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(15px, 1.8vw, 22px)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: isHovered ? '#F7F4EF' : 'rgba(247,244,239,0.85)',
          lineHeight: 1.15,
          margin: '0 0 2px',
          letterSpacing: '0.01em',
          transition: 'color 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        }}>
          {item.title}
        </h3>

        <motion.p
          animate={{
            opacity: isHovered ? 1 : 0,
            marginTop: isHovered ? '6px' : '0px',
            maxHeight: isHovered ? '40px' : '0px',
          }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          style={{
            fontSize: '9px',
            fontWeight: 200,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(184,189,199,0.55)',
            overflow: 'hidden',
            margin: 0,
          }}
        >
          {item.subtitle}
        </motion.p>

        <motion.p
          animate={{
            opacity: isHovered ? 1 : 0,
            marginTop: isHovered ? '8px' : '0px',
            maxHeight: isHovered ? '60px' : '0px',
          }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 1, 0.5, 1] }}
          style={{
            fontSize: '11px',
            fontWeight: 200,
            lineHeight: 1.6,
            color: 'rgba(232,228,221,0.5)',
            letterSpacing: '0.05em',
            overflow: 'hidden',
            fontFamily: '"Noto Serif SC", serif',
            margin: 0,
          }}
        >
          {item.description}
        </motion.p>
      </div>
    </motion.div>
  )
}
