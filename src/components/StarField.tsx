import { useEffect, useRef } from 'react'

// ── 类型 ──
interface Star {
  x: number; y: number
  r: number
  baseAlpha: number
  phase: number
  speed: number
  amp: number
  hue: number
  cross: boolean
  crossLen: number
}

interface ShootingStar {
  x: number; y: number
  vx: number; vy: number
  life: number
  maxLife: number
  trail: { x: number; y: number }[]
  headR: number
}

const DENSITY_DIV = 1800
const SS_MIN_GAP = 3
const SS_MAX_GAP = 11

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const ssRef = useRef<ShootingStar[]>([])
  const timerRef = useRef(0)
  const dimsRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let prevT = performance.now()

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      dimsRef.current = { w, h }
      canvas!.width = w
      canvas!.height = h

      const count = Math.floor((w * h) / DENSITY_DIV)
      const arr: Star[] = []
      for (let i = 0; i < count; i++) {
        const r = Math.random() * 1.7 + 0.25
        arr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          baseAlpha: Math.random() * 0.5 + 0.2,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.03 + 0.005,
          amp: Math.random() * 0.45 + 0.08,
          hue: Math.random() < 0.3 ? 36 + Math.random() * 24 : 210 + Math.random() * 35,
          cross: Math.random() < 0.12,
          crossLen: r * (Math.random() * 6 + 2.5),
        })
      }
      starsRef.current = arr

      // 窗口大小变化时重置底色
      ctx!.fillStyle = '#0c0c0e'
      ctx!.fillRect(0, 0, w, h)
    }

    function spawnSS() {
      const { w, h } = dimsRef.current
      const x = Math.random() * w * 0.75
      const y = Math.random() * h * 0.2
      const angle = Math.PI * 0.22 + Math.random() * 0.3
      const speed = Math.random() * 6 + 6
      ssRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.random() * 0.6 + 0.3,
        maxLife: 0,
        trail: [],
        headR: Math.random() * 0.8 + 0.3,
      })
    }

    function drawStar(s: Star, alpha: number) {
      const c = ctx!
      const glowR = s.r * 4

      const g = c.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR)
      if (s.hue < 60) {
        g.addColorStop(0, `rgba(255,242,220,${alpha})`)
        g.addColorStop(0.2, `rgba(255,220,180,${alpha * 0.65})`)
        g.addColorStop(0.5, `rgba(255,200,150,${alpha * 0.15})`)
        g.addColorStop(1, 'rgba(255,200,150,0)')
      } else {
        g.addColorStop(0, `rgba(225,235,255,${alpha})`)
        g.addColorStop(0.2, `rgba(205,220,255,${alpha * 0.65})`)
        g.addColorStop(0.5, `rgba(185,200,245,${alpha * 0.15})`)
        g.addColorStop(1, 'rgba(185,200,245,0)')
      }
      c.fillStyle = g
      c.beginPath()
      c.arc(s.x, s.y, glowR, 0, Math.PI * 2)
      c.fill()

      // 亮核
      c.fillStyle = `rgba(255,255,255,${alpha * 0.9})`
      c.beginPath()
      c.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      c.fill()

      // 十字芒星
      if (s.cross && alpha > 0.3) {
        const len = s.crossLen * alpha
        const gap = s.r * 2.2
        c.strokeStyle = `rgba(255,255,255,${alpha * 0.4})`
        c.lineWidth = 0.3
        c.beginPath()
        c.moveTo(s.x - len, s.y); c.lineTo(s.x - gap, s.y)
        c.moveTo(s.x + gap, s.y); c.lineTo(s.x + len, s.y)
        c.moveTo(s.x, s.y - len); c.lineTo(s.x, s.y - gap)
        c.moveTo(s.x, s.y + gap); c.lineTo(s.x, s.y + len)
        c.stroke()
      }
    }

    function drawSS(ss: ShootingStar) {
      const c = ctx!
      const progress = ss.maxLife ? ss.life / ss.maxLife : 1
      const headAlpha = Math.min(1, progress * 3)

      if (ss.trail.length > 1) {
        c.beginPath()
        c.moveTo(ss.trail[0].x, ss.trail[0].y)
        for (let i = 1; i < ss.trail.length; i++) c.lineTo(ss.trail[i].x, ss.trail[i].y)
        const first = ss.trail[0]
        const last = ss.trail[ss.trail.length - 1]
        const grad = c.createLinearGradient(first.x, first.y, last.x, last.y)
        grad.addColorStop(0, 'rgba(255,255,255,0)')
        grad.addColorStop(0.4, `rgba(255,255,240,${headAlpha * 0.2})`)
        grad.addColorStop(1, `rgba(255,255,255,${headAlpha * 0.8})`)
        c.strokeStyle = grad
        c.lineWidth = ss.headR * 3.5
        c.lineCap = 'round'
        c.stroke()
      }

      const gr = ss.headR * 5
      const headG = c.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, gr)
      headG.addColorStop(0, `rgba(255,255,255,${headAlpha})`)
      headG.addColorStop(0.15, `rgba(255,255,255,${headAlpha * 0.55})`)
      headG.addColorStop(1, 'rgba(255,255,255,0)')
      c.fillStyle = headG
      c.beginPath()
      c.arc(ss.x, ss.y, gr, 0, Math.PI * 2)
      c.fill()

      c.fillStyle = `rgba(255,255,255,${headAlpha})`
      c.beginPath()
      c.arc(ss.x, ss.y, ss.headR, 0, Math.PI * 2)
      c.fill()
    }

    function loop(now: number) {
      const dt = Math.min((now - prevT) / 1000, 0.1)
      prevT = now
      const { w, h } = dimsRef.current

      // 先铺满暗色背景
      ctx!.fillStyle = '#0c0c0e'
      ctx!.fillRect(0, 0, w, h)

      // 星星闪烁
      for (const s of starsRef.current) {
        s.phase += s.speed * dt * 60
        const t1 = Math.sin(s.phase) * 0.5 + 0.5
        const t2 = Math.sin(s.phase * 1.7 + 1.3) * 0.5 + 0.5
        const t3 = Math.sin(s.phase * 0.37 + 2.1) * 0.5 + 0.5
        const twinkle = t1 * 0.5 + t2 * 0.3 + t3 * 0.2
        drawStar(s, Math.min(1, s.baseAlpha + twinkle * s.amp))
      }

      // 流星计时
      timerRef.current -= dt
      if (timerRef.current <= 0) {
        spawnSS()
        timerRef.current = SS_MIN_GAP + Math.random() * (SS_MAX_GAP - SS_MIN_GAP)
      }

      // 流星更新与绘制
      const ssArr = ssRef.current
      for (let i = ssArr.length - 1; i >= 0; i--) {
        const ss = ssArr[i]
        ss.life -= dt
        if (ss.life <= 0) { ssArr.splice(i, 1); continue }
        if (!ss.maxLife) ss.maxLife = ss.life

        ss.trail.push({ x: ss.x, y: ss.y })
        if (ss.trail.length > 60) ss.trail.shift()

        ss.x += ss.vx * dt * 60
        ss.y += ss.vy * dt * 60

        if (ss.x > w + 80 || ss.y > h + 80 || ss.x < -80) {
          ssArr.splice(i, 1)
          continue
        }
        drawSS(ss)
      }

      raf = requestAnimationFrame(loop)
    }

    resize()
    timerRef.current = 1.5 + Math.random() * 4
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}
