import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { socialPosts } from '../data/posts'

// 从日期提取年份
function getYear(date: string | null): string {
  if (!date) return ''
  return date.split('-')[0]
}

// 格式化日期显示
function formatDate(date: string | null): string {
  if (!date) return '未知时间'
  const [y, m, d] = date.split('-')
  return `${y} · ${m} · ${d}`
}

// 渲染正文：对话行单独处理
function renderContent(content: string) {
  const lines = content.split('\n')
  return lines.map((line, i) => {
    const isDialog = line.startsWith('"') || line.startsWith('“') || line.startsWith('"')
    const isEmpty = line.trim() === ''
    if (isEmpty) return <div key={i} style={{ height: '1.2em' }} />
    return (
      <p
        key={i}
        style={{
          fontSize: isDialog ? '15px' : '14px',
          fontWeight: 300,
          lineHeight: 2.2,
          letterSpacing: isDialog ? '0.04em' : '0.06em',
          color: isDialog
            ? 'rgba(245,245,245,0.82)'
            : 'rgba(184,189,199,0.65)',
          fontStyle: isDialog ? 'italic' : 'normal',
          fontFamily: isDialog ? '"Playfair Display", serif' : 'inherit',
          margin: 0,
        }}
      >
        {line}
      </p>
    )
  })
}

export default function AboutSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: scrollRef })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="about"
      style={{
        background: '#0F1115',
        minHeight: '100vh',
        display: 'flex',
        paddingTop: '72px',
      }}
    >
      {/* ━━━ 左侧固定栏 ━━━ */}
      <div style={{
        position: 'sticky',
        top: '72px',
        width: '320px',
        flexShrink: 0,
        height: 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 48px 48px 52px',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}>

        {/* 小标 */}
        <p style={{
          fontSize: '9px',
          fontWeight: 300,
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'rgba(231,216,201,0.45)',
          marginBottom: '32px',
        }}>
          Our Story
        </p>

        {/* 主标题 */}
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '28px',
          fontWeight: 400,
          color: '#F5F5F5',
          lineHeight: 1.3,
          letterSpacing: '0.02em',
          marginBottom: '32px',
        }}>
          AXUXX
        </h2>

        {/* 核心金句 */}
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '15px',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'rgba(231,216,201,0.75)',
          lineHeight: 2,
          letterSpacing: '0.04em',
          marginBottom: '48px',
        }}>
          我想<br />
          我这辈子<br />
          没她不行了
        </p>

        {/* 分割线 */}
        <div style={{
          width: '32px',
          height: '1px',
          background: 'rgba(231,216,201,0.25)',
          marginBottom: '32px',
        }} />

        {/* 统计信息 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'Since', value: '2021' },
            { label: 'Memories', value: `${socialPosts.length}` },
            { label: 'Together', value: '∞' },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{
                fontSize: '9px',
                fontWeight: 300,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'rgba(184,189,199,0.35)',
              }}>
                {item.label}
              </span>
              <span style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '18px',
                fontWeight: 400,
                color: 'rgba(245,245,245,0.5)',
              }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* 滚动进度线 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '51px',
          width: '1px',
          height: '120px',
          background: 'rgba(255,255,255,0.04)',
          overflow: 'hidden',
        }}>
          <motion.div
            style={{
              width: '1px',
              height: lineHeight,
              background: 'linear-gradient(to bottom, rgba(231,216,201,0.6), transparent)',
            }}
          />
        </div>

      </div>

      {/* ━━━ 右侧滚动内容 ━━━ */}
      <div
        ref={scrollRef}
        style={{ flex: 1, padding: '120px 80px 200px 100px' }}
      >
        {socialPosts.map((post, index) => {
          const year = getYear(post.date)
          const prevYear = index > 0 ? getYear(socialPosts[index - 1].date) : null
          const showYear = year && year !== prevYear

          return (
            <div key={post.id}>

              {/* 年份大字水印 */}
              {showYear && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  style={{
                    position: 'relative',
                    marginBottom: '80px',
                    marginTop: index === 0 ? '0' : '120px',
                  }}
                >
                  <span style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 'clamp(80px, 12vw, 140px)',
                    fontWeight: 400,
                    color: 'rgba(231,216,201,0.04)',
                    letterSpacing: '0.15em',
                    lineHeight: 1,
                    userSelect: 'none',
                    display: 'block',
                  }}>
                    {year}
                  </span>
                </motion.div>
              )}

              {/* 单条记忆 */}
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                style={{ marginBottom: '160px' }}
              >

                {/* 标题（如果有） */}
                {post.title && (
                  <p style={{
                    fontSize: '10px',
                    fontWeight: 300,
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: 'rgba(231,216,201,0.4)',
                    marginBottom: '24px',
                  }}>
                    {post.title}
                  </p>
                )}

                {/* 图片 */}
                <div style={{
                  overflow: 'hidden',
                  borderRadius: '4px',
                  marginBottom: '40px',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
                }}>
                  <motion.img
                    src={post.imageSrc}
                    alt={post.title || formatDate(post.date)}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      filter: 'brightness(0.88) saturate(0.85)',
                    }}
                  />
                </div>

                {/* 日期 */}
                <p style={{
                  fontSize: '9px',
                  fontWeight: 300,
                  letterSpacing: '0.45em',
                  color: 'rgba(184,189,199,0.3)',
                  marginBottom: '24px',
                  textTransform: 'uppercase',
                }}>
                  {formatDate(post.date)}
                  {post.location && ` · ${post.location}`}
                </p>

                {/* 正文 */}
                <div style={{ maxWidth: '540px' }}>
                  {renderContent(post.content)}
                </div>

              </motion.article>
            </div>
          )
        })}

        {/* 结尾 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          style={{ textAlign: 'center', paddingTop: '80px' }}
        >
          <div style={{
            width: '1px',
            height: '80px',
            background: 'linear-gradient(to bottom, rgba(231,216,201,0.3), transparent)',
            margin: '0 auto 40px',
          }} />
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '13px',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgba(231,216,201,0.3)',
            letterSpacing: '0.1em',
          }}>
            — To be continued
          </p>
        </motion.div>

      </div>
    </section>
  )
}
