import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'

const links = [
  {
    id: 'douyin',
    name: '抖音',
    url: 'https://v.douyin.com/S2uTOeouIhU/',
    glow: 'rgba(0,242,234,0.35)',
    iconColor: '#00f2ea',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
  },
  {
    id: 'bilibili',
    name: '哔哩哔哩',
    url: 'https://space.bilibili.com/74042208',
    glow: 'rgba(251,114,153,0.35)',
    iconColor: '#fb7299',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L8.653 4.44c.071.071.134.142.187.213h6.72c.053-.071.116-.142.187-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
      </svg>
    ),
  },
  {
    id: 'xiaohongshu',
    name: '小红书',
    url: 'https://xhslink.com/m/FjUrSDvDgA',
    glow: 'rgba(254,44,85,0.35)',
    iconColor: '#fe2c55',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M21.011 9.66h-1.867V7.887h-2.496V9.66h-1.126v1.962h1.126v3.25c0 1.81.898 2.74 2.7 2.74.548 0 1.05-.1 1.396-.23l-.332-1.896c-.166.066-.398.116-.614.116-.448 0-.664-.232-.664-.73v-3.25h1.877zM9.73 7.54c-.366 0-.714.05-1.046.133V6.09H6.188v10.574h2.496v-4.74c0-.88.532-1.362 1.196-1.362.664 0 1.046.482 1.046 1.362v4.74h2.496v-5.138c0-2.29-1.28-3.986-3.692-3.986zm5.87 1.03h-2.497v8.094h2.496z"/>
      </svg>
    ),
  },
]

export default function LinksSection() {
  return (
    <section
      id="links"
      style={{
        background: '#0F1115',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative',
      }}
    >
      {/* 背景图片层 */}
      <img
        src="/合照pic/微信图片_202606110934331.jpg"
        alt="背景"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          opacity: 0.28,
          pointerEvents: 'none',
          borderRadius: '8px',
          padding: '40px',
        }}
      />

      {/* 内容层 */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}>
        {/* 标题 */}
        <FadeIn y={20}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{
              fontSize: '10px',
              fontWeight: 300,
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: 'rgba(231,216,201,0.5)',
              marginBottom: '20px',
            }}>
              Find Us
            </p>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              color: '#F5F5F5',
              letterSpacing: '0.05em',
            }}>
              Links
            </h2>
            <div style={{
              width: '1px',
              height: '48px',
              background: 'linear-gradient(to bottom, rgba(231,216,201,0.3), transparent)',
              margin: '24px auto 0',
            }} />
          </div>
        </FadeIn>

        {/* 3D 透视链接卡片容器 */}
        <div style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          maxWidth: '480px',
        }}>
          {links.map((link, i) => (
            <FadeIn key={link.id} delay={i * 0.1} y={24}>
              <motion.a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 1 }}
                whileHover={{
                  rotateY: 0,
                  rotateX: 0,
                  skewX: 0,
                  scale: 1.12,
                  z: 40,
                  opacity: 1,
                  boxShadow: `0 0 25px ${link.glow}, 0 0 50px ${link.glow.replace('0.35', '0.15')}`,
                }}
                whileTap={{ scale: 0.98, z: 20 }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 16,
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '28px 36px',
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transform: 'rotateY(-15deg) rotateX(6deg) skewX(-3deg)',
                  transition: 'box-shadow 0.5s ease',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}>
                  {/* 图标 — 默认淡化，hover 亮起 */}
                  <motion.div
                    animate={{ opacity: 1, color: 'rgba(200,200,210,0.45)', filter: 'brightness(0.9)' }}
                    whileHover={{ opacity: 1, color: link.iconColor, filter: 'brightness(1.2)' }}
                    transition={{ type: 'spring', stiffness: 140, damping: 16 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {link.icon}
                  </motion.div>

                  <span style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '18px',
                    fontWeight: 400,
                    color: 'rgba(220,220,220,0.65)',
                    letterSpacing: '0.08em',
                    transition: 'color 0.4s ease',
                  }}>
                    {link.name}
                  </span>
                </div>

                {/* 右侧箭头 — 淡化 */}
                <motion.div
                  animate={{ x: 0, color: 'rgba(180,180,190,0.2)' }}
                  whileHover={{ x: 4, color: 'rgba(255,255,255,0.5)' }}
                  transition={{ type: 'spring', stiffness: 140, damping: 16 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.div>
              </motion.a>
            </FadeIn>
          ))}
        </div>

        {/* 底部装饰 */}
        <p style={{
          fontSize: '11px',
          fontWeight: 300,
          letterSpacing: '0.3em',
          color: 'rgba(184,189,199,0.25)',
          textTransform: 'uppercase',
          marginTop: '60px',
          textAlign: 'center',
        }}>
          AXUXX · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  )
}
