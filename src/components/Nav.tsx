import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'

const NAV_ITEMS = [
  { label: 'Memory', view: 'work' as const },
  { label: 'About',  view: 'about' as const },
  { label: 'Icon',   view: 'icon' as const },
  { label: 'Links',  view: 'links' as const },
]

export default function Nav() {
  const { view, setView } = useAppStore()
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastY = { current: 0 }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setVisible(y < lastY.current || y < 80)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: visible ? 0 : -80,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        background: scrolled ? 'rgba(15,17,21,0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        onClick={() => setView('work')}
        style={{ cursor: 'pointer' }}
      >
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '16px',
          fontWeight: 400,
          color: '#F5F5F5',
          letterSpacing: '0.1em',
          lineHeight: 1,
        }}>
          AXUXX
        </p>
      </motion.div>

      {/* 导航项 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        style={{ display: 'flex', gap: '36px', alignItems: 'center' }}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => setView(item.view)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 300,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: view === item.view
                ? '#F5F5F5'
                : 'rgba(245,245,245,0.4)',
              padding: '4px 0',
              borderBottom: view === item.view
                ? '1px solid rgba(200,212,227,0.5)'
                : '1px solid transparent',
              transition: 'color 0.3s ease, border-color 0.3s ease',
            }}
          >
            {item.label}
          </button>
        ))}
      </motion.div>
    </motion.nav>
  )
}
