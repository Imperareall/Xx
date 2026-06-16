export default function Watermark() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 50,
      pointerEvents: 'none',
      userSelect: 'none',
    }}>
      <p style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '11px',
        fontWeight: 400,
        fontStyle: 'italic',
        letterSpacing: '0.25em',
        color: 'rgba(255,255,255,0.12)',
        whiteSpace: 'nowrap',
      }}>
        axuxx & imperare
      </p>
    </div>
  )
}
