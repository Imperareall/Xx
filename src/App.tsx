import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import Nav from './components/Nav'
import DetailView from './components/DetailView'
import GridView from './sections/GridView'
import AboutSection from './sections/AboutSection'
import { useAppStore } from './store/useAppStore'

export default function App() {
  const view = useAppStore((s) => s.view)

  // 每次切换视图自动回到顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [view])

  return (
    <div className="grain" style={{ background: '#0F1115', minHeight: '100vh' }}>
      <Nav />

      <AnimatePresence mode="wait">

        {view === 'work' && (
          <motion.div
            key="memory"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <GridView />
          </motion.div>
        )}

        {view === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <AboutSection />
          </motion.div>
        )}

      </AnimatePresence>

      {/* DetailView 全局挂载，不参与视图切换 */}
      <DetailView />
    </div>
  )
}
