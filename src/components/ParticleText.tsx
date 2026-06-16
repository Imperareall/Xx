import { useRef, useEffect, useCallback, type ReactNode } from 'react'

// ═══════════════════════════════════════════════════
// 粒子数据结构
// ═══════════════════════════════════════════════════
interface Particle {
  originX: number
  originY: number
  x: number
  y: number
  baseAlpha: number
  phase: number
  size: number
}

interface Props {
  children: ReactNode
  font: string
  className?: string
  style?: React.CSSProperties
  /** CSS gradient string, e.g. 'linear-gradient(...)'. When provided, text shows the gradient instead of being transparent. */
  gradient?: string
  /** CSS filter string for drop shadows on the gradient text */
  textFilter?: string
}

// ═══════════════════════════════════════════════════
// 全局鼠标位置
// ═══════════════════════════════════════════════════
let mouseX = -9999
let mouseY = -9999

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })
}

const STEP = 1
const MAX_DIST = 80
const REPEL_STRENGTH = 28
const SPRING = 0.06
const BREATH_SPEED = 0.002
const BREATH_AMP = 0.12

export default function ParticleText({ children, font, gradient, textFilter, className, style }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef(0)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const samplePixels = useCallback(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const textEl = container.querySelector('.pt-text') as HTMLElement
    if (!textEl) return

    const rect = textEl.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    const w = containerRect.width
    const h = containerRect.height
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'

    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)
    ctxRef.current = ctx

    const computedStyle = window.getComputedStyle(textEl)
    const fontSize = parseFloat(computedStyle.fontSize)
    const letterSpacing = computedStyle.letterSpacing
    const fontFamily = computedStyle.fontFamily || "'Playfair Display', serif"
    const fontWeight = computedStyle.fontWeight || '300'
    const fontStyle = computedStyle.fontStyle || 'normal'

    // 离屏 canvas：使用实际字体样式
    const off = document.createElement('canvas')
    off.width = w
    off.height = h
    const offCtx = off.getContext('2d')!
    offCtx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
    offCtx.fillStyle = '#ffffff'
    offCtx.textAlign = 'center'
    offCtx.textBaseline = 'middle'
    offCtx.letterSpacing = `${letterSpacing}px`

    const textX = rect.left - containerRect.left + rect.width / 2
    const textY = rect.top - containerRect.top + rect.height / 2
    offCtx.fillText(textEl.innerText, textX, textY)

    const imageData = offCtx.getImageData(0, 0, w, h)
    const particles: Particle[] = []
    const { data } = imageData

    for (let y = 0; y < h; y += STEP) {
      for (let x = 0; x < w; x += STEP) {
        const idx = (y * w + x) * 4
        const a = data[idx + 3]
        if (a > 80) {
          particles.push({
            originX: x,
            originY: y,
            x,
            y,
            baseAlpha: 0.25 + Math.random() * 0.45,
            phase: Math.random() * Math.PI * 2,
            size: 0.5 + Math.random() * 0.7,
          })
        }
      }
    }

    particlesRef.current = particles
  }, [])

  const animate = useCallback(() => {
    const ctx = ctxRef.current
    const particles = particlesRef.current
    const canvas = canvasRef.current
    if (!ctx || !canvas) {
      rafRef.current = requestAnimationFrame(animate)
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = canvas.width / dpr
    const h = canvas.height / dpr

    ctx.clearRect(0, 0, w, h)

    const container = containerRef.current
    let mx = mouseX
    let my = mouseY
    if (container) {
      const cr = container.getBoundingClientRect()
      mx = mouseX - cr.left
      my = mouseY - cr.top
    }

    const time = performance.now() * BREATH_SPEED

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      // 鼠标排斥
      const dx = p.x - mx
      const dy = p.y - my
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < MAX_DIST && dist > 0) {
        const force = (MAX_DIST - dist) / MAX_DIST
        const angle = Math.atan2(dy, dx)
        p.x += Math.cos(angle) * force * REPEL_STRENGTH
        p.y += Math.sin(angle) * force * REPEL_STRENGTH
      }

      // 回弹
      p.x += (p.originX - p.x) * SPRING
      p.y += (p.originY - p.y) * SPRING

      // 呼吸
      const breathe = p.baseAlpha + Math.sin(time + p.phase) * BREATH_AMP
      const alpha = Math.max(0.08, Math.min(1, breathe))

      // 绘制
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${alpha})`
      ctx.fill()

      // 微型光晕
      if (p.size > 0.9 && alpha > 0.4) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.1})`
        ctx.fill()
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    let cancelled = false

    const init = () => {
      if (cancelled) return
      samplePixels()
      rafRef.current = requestAnimationFrame(animate)
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(init))
    } else {
      setTimeout(init, 300)
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(rafRef.current)
    }
  }, [samplePixels, animate])

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(samplePixels, 200)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [samplePixels])

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', display: 'inline-block', ...style }}>
      <span
        className="pt-text"
        aria-hidden
        style={{
          font,
          ...(gradient
            ? {
                background: gradient,
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: textFilter,
                animation: 'diamond-shimmer 4s ease-in-out infinite',
              }
            : { color: 'transparent' }),
          userSelect: 'none',
          display: 'inline-block',
          whiteSpace: style?.whiteSpace ?? 'nowrap',
        }}
      >
        {children}
      </span>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
    </div>
  )
}
