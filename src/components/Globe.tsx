import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { places } from '../data/places'
import type { Place } from '../data/places'

/* ── 地球纹理 URL ── */
const EARTH_TEX_URL =
  'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'

interface Props {
  onSelectPlace: (place: Place) => void
}

export default function Globe({ onSelectPlace }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)

  /* Tooltip 状态 */
  const [hoveredPlace, setHoveredPlace] = useState<Place | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  /* 用 ref 桥接 useEffect 内闭包 */
  const hoveredRef = useRef<Place | null>(null)
  const tooltipRef = useRef({ x: 0, y: 0 })
  const setHoveredRef = useCallback((p: Place | null) => {
    hoveredRef.current = p
    setHoveredPlace(p)
  }, [])
  const setTooltipRef = useCallback((pos: { x: number; y: number }) => {
    tooltipRef.current = pos
    setTooltipPos(pos)
  }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth || window.innerWidth
    const H = mount.clientHeight || 500

    /* ===================== 场景初始化 ===================== */
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000)
    camera.position.z = 2.8

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    /* ===================== 灯光 ===================== */
    scene.add(new THREE.AmbientLight(0xffffff, 0.8))
    const sun = new THREE.DirectionalLight(0x88aaff, 2.0)
    sun.position.set(5, 3, 5)
    scene.add(sun)

    /* ===================== 地球几何体 ===================== */
    const geo = new THREE.SphereGeometry(1, 64, 64)

    // ── 初始材质（纹理加载前的占位，暗色球） ──
    const mat = new THREE.MeshPhongMaterial({
      color: 0x1e2a3f,
      emissive: 0x151c30,
      emissiveIntensity: 0.5,
      shininess: 30,
      specular: 0xffffff,
    })
    const earth = new THREE.Mesh(geo, mat)
    scene.add(earth)

    /* ===================== 大气光晕（Shader） ===================== */
    const glowGeo = new THREE.SphereGeometry(1.07, 64, 64)
    const glowMat = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vNormal;
        void main() {
          float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
          float intensity = pow(fresnel, 3.5);
          gl_FragColor = vec4(0.2, 0.4, 0.75, intensity * 0.28);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
    })
    scene.add(new THREE.Mesh(glowGeo, glowMat))

    /* ===================== 经纬度 → 3D ===================== */
    const latLngToVec3 = (lat: number, lng: number, r = 1.02) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lng + 180) * (Math.PI / 180)
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      )
    }

    /* ===================== 地点标记 ===================== */
    const markerGroup = new THREE.Group()
    earth.add(markerGroup)

    const markerMeshes: { mesh: THREE.Mesh; place: Place }[] = []

    places.forEach(place => {
      const pos = latLngToVec3(place.lat, place.lng)

      // 光点
      const dotGeo = new THREE.SphereGeometry(0.01, 16, 16)
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xE7D8C9 })
      const dot = new THREE.Mesh(dotGeo, dotMat)
      dot.position.copy(pos)
      markerGroup.add(dot)
      markerMeshes.push({ mesh: dot, place })

      // 光环
      const ringGeo = new THREE.RingGeometry(0.013, 0.02, 32)
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xE7D8C9,
        transparent: true,
        opacity: 0.5,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.position.copy(pos)
      ring.lookAt(new THREE.Vector3(0, 0, 0))
      markerGroup.add(ring)
    })

    /* ===================== 纹理加载 → 暗黑地球 ===================== */
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = EARTH_TEX_URL
    img.onload = () => {
      // ── Canvas 像素处理 ──
      const cvs = document.createElement('canvas')
      cvs.width = img.width
      cvs.height = img.height
      const ctx = cvs.getContext('2d')!
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, cvs.width, cvs.height)
      const d = imageData.data

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2]

        /* 海洋检测：蓝色占比明显偏高 */
        const isOcean = b > r * 1.15 && b > g * 1.1 && b > 60

        if (isOcean) {
          // 深暗海洋
          d[i] = 6; d[i + 1] = 10; d[i + 2] = 22
        } else {
          // 陆地：冷银色微光
          const avg = (r + g + b) / 3
          const v = Math.min(255, avg * 0.55 + 72)
          d[i] = v + 12
          d[i + 1] = v + 5
          d[i + 2] = v - 2
        }
      }
      ctx.putImageData(imageData, 0, 0)

      const processed = new THREE.CanvasTexture(cvs)
      processed.colorSpace = THREE.SRGBColorSpace

      // ── 应用纹理 ──
      mat.map = processed
      mat.color.set(0x8899aa)
      mat.emissive.set(0x151c30)
      mat.emissiveIntensity = 0.45
      mat.specular.set(0xffffff)
      mat.shininess = 30
      mat.needsUpdate = true

      console.log('[Globe] earth texture processed & applied')
    }
    img.onerror = () => {
      console.warn('[Globe] texture load failed, using solid fallback')
    }

    /* ===================== 鼠标 / 触摸交互 ===================== */
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let isDragging = false
    let prevMouse = { x: 0, y: 0 }
    let dragMoved = false

    const getMouseNDC = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((clientX - rect.left) / W) * 2 - 1
      mouse.y = -((clientY - rect.top) / H) * 2 + 1
    }

    const updateCursor = (clientX: number, clientY: number) => {
      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(markerMeshes.map(m => m.mesh))
      mount.style.cursor = hits.length > 0 ? 'pointer' : isDragging ? 'grabbing' : 'grab'
      markerMeshes.forEach(m => m.mesh.scale.setScalar(1))
      if (hits.length > 0) {
        const h = hits[0].object as THREE.Mesh
        h.scale.setScalar(1.8)
        const found = markerMeshes.find(m => m.mesh === h)
        if (found && hoveredRef.current?.id !== found.place.id) {
          setHoveredRef(found.place)
        }
      } else if (hoveredRef.current !== null) {
        setHoveredRef(null)
      }

      /* Tooltip 坐标更新（节流：每 3 帧更新一次 React state） */
      const rect = mount.getBoundingClientRect()
      const tx = clientX - rect.left + 15
      const ty = clientY - rect.top + 15
      if (
        Math.abs(tooltipRef.current.x - tx) > 3 ||
        Math.abs(tooltipRef.current.y - ty) > 3
      ) {
        setTooltipRef({ x: tx, y: ty })
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      getMouseNDC(e.clientX, e.clientY)
      if (isDragging) {
        const dx = e.clientX - prevMouse.x
        const dy = e.clientY - prevMouse.y
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) dragMoved = true
        earth.rotation.y += dx * 0.005
        earth.rotation.x += dy * 0.005
        prevMouse = { x: e.clientX, y: e.clientY }
      }
      updateCursor(e.clientX, e.clientY)
    }

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      dragMoved = false
      prevMouse = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      if (!isDragging) return
      isDragging = false
      if (!dragMoved) {
        raycaster.setFromCamera(mouse, camera)
        const hits = raycaster.intersectObjects(markerMeshes.map(m => m.mesh))
        if (hits.length > 0) {
          const found = markerMeshes.find(m => m.mesh === hits[0].object)
          if (found) onSelectPlace(found.place)
        }
      }
    }

    /* 触摸 */
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true
        dragMoved = false
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const t = e.touches[0]
        const dx = t.clientX - prevMouse.x
        const dy = t.clientY - prevMouse.y
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) dragMoved = true
        earth.rotation.y += dx * 0.005
        earth.rotation.x += dy * 0.005
        prevMouse = { x: t.clientX, y: t.clientY }
      }
    }
    const onTouchEnd = () => {
      if (isDragging && !dragMoved) {
        raycaster.setFromCamera(mouse, camera)
        const hits = raycaster.intersectObjects(markerMeshes.map(m => m.mesh))
        if (hits.length > 0) {
          const found = markerMeshes.find(m => m.mesh === hits[0].object)
          if (found) onSelectPlace(found.place)
        }
      }
      isDragging = false
    }

    mount.addEventListener('mousemove', onMouseMove)
    mount.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    mount.addEventListener('touchstart', onTouchStart, { passive: true })
    mount.addEventListener('touchmove', onTouchMove, { passive: true })
    mount.addEventListener('touchend', onTouchEnd)

    /* ===================== 动画循环 ===================== */
    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      if (!isDragging) earth.rotation.y += 0.002
      renderer.render(scene, camera)
    }
    animate()

    /* ===================== resize ===================== */
    const onResize = () => {
      const w = mount.clientWidth || window.innerWidth
      const h = mount.clientHeight || 500
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    /* ===================== 清理 ===================== */
    return () => {
      cancelAnimationFrame(raf)
      mount.removeEventListener('mousemove', onMouseMove)
      mount.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      mount.removeEventListener('touchstart', onTouchStart)
      mount.removeEventListener('touchmove', onTouchMove)
      mount.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [onSelectPlace])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />

      {hoveredPlace && (
        <div
          style={{
            position: 'absolute',
            left: tooltipPos.x,
            top: tooltipPos.y,
            pointerEvents: 'none',
            background: 'rgba(15,17,21,0.88)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '6px 14px',
            borderRadius: '20px',
            color: '#F5F5F5',
            fontSize: '13px',
            fontWeight: 400,
            fontFamily: '"Playfair Display", serif',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
          }}
        >
          <span>{hoveredPlace.name}</span>
          <span style={{
            color: 'rgba(231,216,201,0.4)',
            fontSize: '10px',
            textTransform: 'uppercase',
            fontWeight: 300,
          }}>
            {hoveredPlace.nameEn}
          </span>
        </div>
      )}
    </div>
  )
}
