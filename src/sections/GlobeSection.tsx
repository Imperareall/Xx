import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Globe from '../components/Globe'
import PlaceGallery from '../components/PlaceGallery'
import type { Place } from '../data/places'
import FadeIn from '../components/FadeIn'

export default function GlobeSection() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

  return (
    <section
      id="globe"
      style={{
        background: 'transparent',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 标题 */}
      <FadeIn y={20}>
        <div style={{ textAlign: 'center', padding: '100px 24px 40px' }}>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 400,
            color: '#F5F5F5',
            letterSpacing: '0.08em',
          }}>
            AXUXX'S FOOTPRINTS
          </h2>
        </div>
      </FadeIn>

      {/* 地球仪 */}
      <div style={{ flex: 1, minHeight: '500px', position: 'relative' }}>
        <Globe onSelectPlace={setSelectedPlace} />
      </div>

      {/* 照片画廊 */}
      <AnimatePresence>
        {selectedPlace && (
          <PlaceGallery
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
