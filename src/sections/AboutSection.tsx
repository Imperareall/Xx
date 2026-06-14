import { useState } from 'react'
import { motion } from 'framer-motion'
import PetsStrip from '../components/PetsStrip'
import ImageLightbox from '../components/ImageLightbox'

const expImages = [
  '/experiencepic/IMG_2122.JPG',
  '/experiencepic/IMG_2123.JPG',
  '/experiencepic/IMG_2127.JPG',
  '/experiencepic/IMG_2128.JPG',
  '/experiencepic/IMG_2129.JPG',
  '/experiencepic/IMG_2130.JPG',
  '/experiencepic/IMG_2132.JPG',
  '/experiencepic/IMG_2133.JPG',
  '/experiencepic/IMG_2134.JPG',
  '/experiencepic/IMG_2136.JPG',
  '/experiencepic/IMG_2138.JPG',
  '/experiencepic/IMG_2140.JPG',
  '/experiencepic/IMG_2141.JPG',
  '/experiencepic/IMG_2143.JPG',
  '/experiencepic/IMG_2144.JPG',
  '/experiencepic/IMG_2145.JPG',
  '/experiencepic/IMG_2146.JPG',
  '/experiencepic/IMG_2147.JPG',
  '/experiencepic/IMG_2148.JPG',
  '/experiencepic/IMG_2149.JPG',
  '/experiencepic/IMG_2150.JPG',
]

const foreverImages = [
  '/Forever/6fa55e0bde344784c1d32d07ccfe5f61.JPG',
  '/Forever/b69eee6639ec2e0f768891c546ca2f56.JPG',
  '/Forever/IMG_0244.jpeg',
  '/Forever/IMG_0306.jpeg',
  '/Forever/IMG_0333.jpg',
  '/Forever/IMG_0407.jpeg',
  '/Forever/IMG_0408.jpeg',
  '/Forever/IMG_0412.jpeg',
  '/Forever/IMG_0432.JPG',
  '/Forever/IMG_0439.jpeg',
  '/Forever/IMG_0544.jpeg',
  '/Forever/IMG_0587.jpeg',
  '/Forever/IMG_0589.jpeg',
  '/Forever/IMG_0591.jpeg',
  '/Forever/IMG_0610.JPG',
  '/Forever/IMG_0660.jpeg',
  '/Forever/IMG_0667.jpeg',
  '/Forever/IMG_0669.jpeg',
  '/Forever/IMG_0685.jpeg',
  '/Forever/IMG_0698.jpg',
  '/Forever/IMG_0699.jpg',
  '/Forever/IMG_0725.jpeg',
  '/Forever/IMG_0726.jpeg',
  '/Forever/IMG_0730.jpeg',
  '/Forever/IMG_0733.jpeg',
  '/Forever/IMG_0738.JPG',
  '/Forever/IMG_0773.JPG',
  '/Forever/IMG_0795.jpeg',
  '/Forever/IMG_0828.jpeg',
  '/Forever/IMG_0829.jpeg',
  '/Forever/IMG_0850.jpeg',
  '/Forever/IMG_0867.JPG',
  '/Forever/IMG_0868.JPG',
  '/Forever/IMG_0871.JPG',
  '/Forever/IMG_0879.JPG',
  '/Forever/IMG_0880.JPG',
  '/Forever/IMG_0908.jpg',
  '/Forever/IMG_0918.jpeg',
  '/Forever/IMG_0919.jpeg',
  '/Forever/IMG_0934.jpeg',
  '/Forever/IMG_0943.JPG',
  '/Forever/IMG_0965.jpeg',
  '/Forever/IMG_0968.jpeg',
  '/Forever/IMG_0969.jpeg',
  '/Forever/IMG_0977.JPG',
  '/Forever/IMG_1066.jpeg',
  '/Forever/IMG_1464.jpeg',
  '/Forever/IMG_1497.jpeg',
  '/Forever/IMG_1500.jpeg',
  '/Forever/IMG_1556.jpeg',
  '/Forever/IMG_1558.jpeg',
  '/Forever/IMG_1560.jpeg',
  '/Forever/IMG_1566.jpeg',
  '/Forever/IMG_1655.jpeg',
  '/Forever/IMG_1684.jpeg',
  '/Forever/IMG_1846.JPG',
  '/Forever/IMG_2139.jpeg',
  '/Forever/IMG_2561.JPG',
  '/Forever/IMG_3253.jpeg',
  '/Forever/IMG_3378.JPG',
  '/Forever/IMG_3380.jpeg',
  '/Forever/IMG_3393.JPG',
  '/Forever/IMG_3395.JPG',
  '/Forever/IMG_3510.jpeg',
  '/Forever/IMG_3523.JPG',
  '/Forever/IMG_3567.jpeg',
  '/Forever/IMG_3568.jpeg',
  '/Forever/IMG_3569.jpeg',
  '/Forever/IMG_3939.JPG',
  '/Forever/IMG_4136.jpeg',
  '/Forever/IMG_4461.jpeg',
  '/Forever/IMG_4641.jpeg',
  '/Forever/IMG_4642.jpeg',
]

const xxImages = [
  '/xx/1.jpg',
  '/xx/10.JPEG',
  '/xx/11.jpg',
  '/xx/12.jpg',
  '/xx/13.PNG',
  '/xx/14.PNG',
  '/xx/15.PNG',
  '/xx/16.PNG',
  '/xx/17.PNG',
  '/xx/19.PNG',
  '/xx/2 (2).jpg',
  '/xx/2.jpg',
  '/xx/20.PNG',
  '/xx/21.PNG',
  '/xx/22.PNG',
  '/xx/23.PNG',
  '/xx/23.jpg',
  '/xx/24.PNG',
  '/xx/25.jpg',
  '/xx/3.jpg',
  '/xx/4.jpg',
  '/xx/5.jpg',
  '/xx/6.jpg',
  '/xx/7.JPG',
  '/xx/8.jpg',
  '/xx/9.jpg',
]

function ImageStrip({
  images,
  duration = 40,
  reverse = false,
}: {
  images: string[]
  duration?: number
  reverse?: boolean
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <ImageLightbox
        images={images}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />

      <div style={{ width: '100%', overflow: 'hidden', padding: '20px 0' }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px',
            background: 'linear-gradient(to right, #0F1115, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px',
            background: 'linear-gradient(to left, #0F1115, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />

          <motion.div
            animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: '12px', width: 'max-content', paddingLeft: '12px' }}
          >
            {[...images, ...images].map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                onClick={() => setLightboxIndex(i % images.length)}
                style={{
                  flexShrink: 0,
                  width: '220px',
                  height: '220px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  cursor: 'zoom-in',
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.85) saturate(0.88)',
                    display: 'block',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: '#0F1115',
        minHeight: '100vh',
        paddingTop: '72px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '60px',
        padding: '120px 0',
      }}
    >
      {/* 小标题 */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontSize: '10px',
          fontWeight: 300,
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'rgba(231,216,201,0.3)',
          marginBottom: '12px',
        }}>
          About Us
        </p>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 400,
          color: 'rgba(245,245,245,0.85)',
          letterSpacing: '0.05em',
        }}>
          AXUXX
        </h2>
      </div>

      {/* 第一条：Forever 向左滚动 */}
      <ImageStrip
        images={foreverImages}
        duration={45}
        reverse={false}
      />

      {/* 第二条：experiencepic 向左滚动 */}
      <ImageStrip
        images={expImages}
        duration={40}
        reverse={false}
      />

      {/* 第三条：xx 向右滚动 */}
      <ImageStrip
        images={xxImages}
        duration={36}
        reverse={true}
      />

      {/* 第三条：pets 向右滚动 */}
      <PetsStrip />

    </section>
  )
}
