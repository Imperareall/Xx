import { useEffect, useRef } from 'react'

// ── 类型 ──
interface Star {
  x: number; y: number
  r: number
  baseAlpha: number
  phase: number
  speed: number
  hue: number          // < 60 暖金，>= 180 冷蓝白
  cross: boolean
  crossLen: number
}

interface Meteor {
  x: number; y: number
  vx: number; vy: number
  life: number
  maxLife: number
  trail: { x: number; y: number }[]
  headR: number
}

// ── 参数 ──
const STAR_DENSITY_DIV = 1600   // 星星密度
const METEOR_MIN_GAP = 2        // 流星最短间隔 (秒)
const METEOR_MAX_GAP = 4        // 流星最长间隔 (秒)
const METEOR_ANGLE_MIN = Math.PI / 4      // 45°
const METEOR_ANGLE_MAX = Math.PI / 3      // 60°

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const meteorsRef = useRef<Meteor[]>([])
  const timerRef = useRef(0)
  const dimsRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let prevT = performance.now()

    /* ========= 初始化 / resize ========= */
    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      dimsRef.current = { w, h }
      canvas!.width = w
      canvas!.height = h

      // 生成星星池
      const count = Math.floor((w * h) / STAR_DENSITY_DIV)
      const arr: Star[] = []
      for (let i = 0; i < count; i++) {
        const r = Math.random() * 1.6 + 0.2
        arr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          baseAlpha: Math.random() * 0.3 + 0.2,   // 闪烁基准 0.2–0.5
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.04 + 0.008,
          hue: Math.random() < 0.35 ? 38 + Math.random() * 22 : 215 + Math.random() * 30,
          cross: Math.random() < 0.10,
          crossLen: r * (Math.random() * 7 + 2),
        })
      }
      starsRef.current = arr
      meteorsRef.current = []
    }

    /* ========= 生成流星 ========= */
    function spawnMeteor() {
      const { w, h } = dimsRef.current
      if (w === 0 || h === 0) return

      // 起点在画面左上 1/4 区域
      const x = Math.random() * w * 0.5
      const y = Math.random() * h * 0.15
      // 角度：45°–60° 固定左上→右下
      const angle = METEOR_ANGLE_MIN + Math.random() * (METEOR_ANGLE_MAX - METEOR_ANGLE_MIN)
      // 速度较快（px/frame 基准）
      const speed = Math.random() * 7 + 8

      meteorsRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.random() * 0.45 + 0.25,
        maxLife: 0,
        trail: [],
        headR: Math.random() * 0.6 + 0.35,
      })
    }

    /* ========= 绘制单颗星 ========= */
    function drawStar(s: Star, alpha: number) {
      const c = ctx!
      const glowR = s.r * 3.5

      // 径向光晕
      const g = c.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR)
      if (s.hue < 60) {
        g.addColorStop(0,    `rgba(255,242,220,${alpha})`)
        g.addColorStop(0.22, `rgba(255,220,180,${alpha * 0.6})`)
        g.addColorStop(0.5,  `rgba(255,200,150,${alpha * 0.12})`)
        g.addColorStop(1,     'rgba(255,200,150,0)')
      } else {
        g.addColorStop(0,    `rgba(225,238,255,${alpha})`)
        g.addColorStop(0.22, `rgba(205,222,255,${alpha * 0.6})`)
        g.addColorStop(0.5,  `rgba(185,200,245,${alpha * 0.12})`)
        g.addColorStop(1,     'rgba(185,200,245,0)')
      }
      c.fillStyle = g
      c.beginPath()
      c.arc(s.x, s.y, glowR, 0, Math.PI * 2)
      c.fill()

      // 亮核
      c.fillStyle = `rgba(255,255,255,${alpha * 0.85})`
      c.beginPath()
      c.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      c.fill()

      // 十字芒星
      if (s.cross && alpha > 0.35) {
        const len = s.crossLen * alpha
        const gap = s.r * 2.5
        c.strokeStyle = `rgba(255,255,255,${alpha * 0.35})`
        c.lineWidth = 0.25
        c.beginPath()
        c.moveTo(s.x - len, s.y); c.lineTo(s.x - gap, s.y)
        c.moveTo(s.x + gap, s.y); c.lineTo(s.x + len, s.y)
        c.moveTo(s.x, s.y - len); c.lineTo(s.x, s.y - gap)
        c.moveTo(s.x, s.y + gap); c.lineTo(s.x, s.y + len)
        c.stroke()
      }
    }

    /* ========= 绘制流星 ========= */
    function drawMeteor(m: Meteor) {
      const c = ctx!
      const lifeRatio = m.maxLife ? m.life / m.maxLife : 1
      // 新出现时亮度爬升，快消失时急速衰减
      const alpha = Math.min(1, lifeRatio * 2.8)

      // ── 拖尾（从旧到新：暗→亮） ──
      if (m.trail.length > 1) {
        const trailLen = m.trail.length
        // 构建渐变路径
        for (let i = 1; i < trailLen; i++) {
          const segAlpha = (i / trailLen) * alpha * 0.7
          const t0 = m.trail[i - 1]
          const t1 = m.trail[i]
          c.strokeStyle = `rgba(255,255,250,${segAlpha})`
          c.lineWidth = m.headR * 2.5 * (i / trailLen)
          c.lineCap = 'round'
          c.beginPath()
          c.moveTo(t0.x, t0.y)
          c.lineTo(t1.x, t1.y)
          c.stroke()
        }

        // 整体细亮线叠在拖尾上
        c.strokeStyle = `rgba(255,255,255,${alpha * 0.9})`
        c.lineWidth = m.headR * 1.2
        c.lineCap = 'round'
        c.beginPath()
        c.moveTo(m.trail[0].x, m.trail[0].y)
        for (let i = 1; i < trailLen; i++) c.lineTo(m.trail[i].x, m.trail[i].y)
        c.stroke()
      }

      // ── 头部光晕 ──
      const gr = m.headR * 6
      const headG = c.createRadialGradient(m.x, m.y, 0, m.x, m.y, gr)
      headG.addColorStop(0,    `rgba(255,255,255,${alpha})`)
      headG.addColorStop(0.12, `rgba(255,255,255,${alpha * 0.5})`)
      headG.addColorStop(0.4,  `rgba(200,220,255,${alpha * 0.1})`)
      headG.addColorStop(1,     'rgba(200,220,255,0)')
      c.fillStyle = headG
      c.beginPath()
      c.arc(m.x, m.y, gr, 0, Math.PI * 2)
      c.fill()

      // 头部亮点
      c.fillStyle = `rgba(255,255,255,${alpha})`
      c.beginPath()
      c.arc(m.x, m.y, m.headR, 0, Math.PI * 2)
      c.fill()
    }

    /* ========= 主循环 ========= */
    function loop(now: number) {
      const dt = Math.min((now - prevT) / 1000, 0.1)
      prevT = now
      const { w, h } = dimsRef.current

      // 铺满暗色背景（黑底）
      ctx!.fillStyle = '#0c0c0e'
      ctx!.fillRect(0, 0, w, h)

      // ── 星星闪烁 ──
      for (const s of starsRef.current) {
        s.phase += s.speed * dt * 60
        // 三条错频正弦波叠出自然不规则闪烁，峰值范围 → opacity 0.2–0.8
        const t1 = Math.sin(s.phase) * 0.5 + 0.5
        const t2 = Math.sin(s.phase * 1.73 + 1.2) * 0.5 + 0.5
        const t3 = Math.sin(s.phase * 0.41 + 2.3) * 0.5 + 0.5
        const flicker = t1 * 0.45 + t2 * 0.3 + t3 * 0.25
        // 映射 baseAlpha(0.2–0.5) + flicker → 总范围 0.2–0.8
        const alpha = Math.min(0.8, Math.max(0.2, s.baseAlpha + flicker * 0.3))
        drawStar(s, alpha)
      }

      // ── 流星计时 ──
      timerRef.current -= dt
      if (timerRef.current <= 0) {
        // 每次生成 1–2 颗
        const count = Math.random() < 0.35 ? 2 : 1
        for (let i = 0; i < count; i++) {
          spawnMeteor()
        }
        timerRef.current = METEOR_MIN_GAP + Math.random() * (METEOR_MAX_GAP - METEOR_MIN_GAP)
      }

      // ── 流星更新 & 绘制 ──
      const mArr = meteorsRef.current
      for (let i = mArr.length - 1; i >= 0; i--) {
        const m = mArr[i]
        m.life -= dt
        if (m.life <= 0) { mArr.splice(i, 1); continue }
        if (!m.maxLife) m.maxLife = m.life

        // 记录轨迹点
        m.trail.push({ x: m.x, y: m.y })
        if (m.trail.length > 40) m.trail.shift()

        m.x += m.vx * dt * 60
        m.y += m.vy * dt * 60

        // 完全移出画面则移除
        if (m.x > w + 100 || m.y > h + 100 || m.x < -100) {
          mArr.splice(i, 1)
          continue
        }
        drawMeteor(m)
      }

      raf = requestAnimationFrame(loop)
    }

    /* ========= 启动 & 清理 ========= */
    resize()
    timerRef.current = 1.2 + Math.random() * 3
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
