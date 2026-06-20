import { motion } from 'framer-motion'

const links = [
  {
    id: 'douyin',
    username: '@虚虚小心',
    url: 'https://v.douyin.com/ELgCfekqHQo/',
    rotateX: 5,
    rotateY: -3,
    logo: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.8" width="38" height="38" style={{ opacity: 0.6 }}>
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
  },
  {
    id: 'bilibili',
    username: '@虚虚小心',
    url: 'https://space.bilibili.com/74042208',
    rotateX: 2,
    rotateY: 2,
    logo: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.8" width="38" height="38" style={{ opacity: 0.6 }}>
        <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L8.653 4.44c.071.071.134.142.187.213h6.72c.053-.071.116-.142.187-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
      </svg>
    ),
  },
  {
    id: 'xiaohongshu',
    username: '@虚虚小心',
    url: 'https://xhslink.com/m/FjUrSDvDgA',
    rotateX: -2,
    rotateY: -2,
    logo: (
      <span style={{
        fontSize: '26px',
        fontWeight: 900,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(255,255,255,0.6)',
        letterSpacing: '-1px',
        fontFamily: 'sans-serif',
        lineHeight: 1,
      }}>
        小红书
      </span>
    ),
  },
  {
    id: 'taobao',
    username: '@竹桃叙',
    url: 'https://m.tb.cn/h.RnkxyfKUYFHdQKm',
    rotateX: -5,
    rotateY: 3,
    logo: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{
          fontSize: '24px',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.6)',
          fontFamily: 'sans-serif',
          lineHeight: 1,
        }}>淘宝</span>
        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          color: 'transparent',
          WebkitTextStroke: '0.5px rgba(255,255,255,0.5)',
          letterSpacing: '0.15em',
          fontFamily: 'sans-serif',
        }}>Taobao</span>
      </div>
    ),
  },
]

export default function LinksSection() {
  return (
    <section
      id="links"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 背景图 */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="/合照pic/微信图片_202606110934333.jpg"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.75) saturate(0.85)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(10,10,11,0.15)',
        }} />
      </div>

      {/* 内容 */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <p style={{
            fontSize: '10px',
            fontWeight: 300,
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: 'rgba(231,216,201,0.3)',
            marginBottom: '12px',
          }}>
            Find Us
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(36px, 6vw, 52px)',
            fontWeight: 400,
            color: 'rgba(245,245,245,0.85)',
            letterSpacing: '0.05em',
            marginBottom: '16px',
          }}>
            Links
          </h2>
          <div style={{
            width: '1px',
            height: '36px',
            background: 'linear-gradient(to bottom, rgba(231,216,201,0.3), transparent)',
            margin: '0 auto',
          }} />
        </motion.div>

        {/* 链接列表 */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          {links.map((link, i) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                x: 6,
                transition: { type: 'spring', stiffness: 200, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                padding: '22px 0',
                borderBottom: 'none',
                textDecoration: 'none',
                cursor: 'pointer',
                transform: `perspective(600px) rotateX(${link.rotateX}deg) rotateY(${link.rotateY}deg)`,
              }}
            >
              {/* 品牌logo */}
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                {link.logo}
              </div>

              {/* 用户名 */}
              <span style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '18px',
                fontWeight: 400,
                color: 'rgba(245,245,245,0.55)',
                letterSpacing: '0.18em',
                display: 'inline-block',
              }}>
                {link.username}
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
