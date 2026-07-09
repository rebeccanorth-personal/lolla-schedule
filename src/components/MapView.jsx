import { useState, useRef } from 'react'

const MIN_W = 420
const MAX_W = 1400
const STEP  = 220

export default function MapView() {
  const [width, setWidth] = useState(700)
  const containerRef = useRef(null)

  function zoomIn()  { setWidth(w => Math.min(w + STEP, MAX_W)) }
  function zoomOut() { setWidth(w => Math.max(w - STEP, MIN_W)) }

  // Pinch-to-zoom via touch events
  const lastDist = useRef(null)
  const lastWidth = useRef(width)

  function onTouchStart(e) {
    if (e.touches.length === 2) lastDist.current = null
    lastWidth.current = width
  }

  function onTouchMove(e) {
    if (e.touches.length !== 2) return
    e.preventDefault()
    const dx = e.touches[0].clientX - e.touches[1].clientX
    const dy = e.touches[0].clientY - e.touches[1].clientY
    const dist = Math.hypot(dx, dy)
    if (lastDist.current !== null) {
      const ratio = dist / lastDist.current
      setWidth(w => Math.min(Math.max(Math.round(w * ratio), MIN_W), MAX_W))
    }
    lastDist.current = dist
  }

  function onTouchEnd() { lastDist.current = null }

  return (
    <div
      ref={containerRef}
      style={{ height: '100%', overflow: 'auto' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Zoom controls — sticky so they stay visible while scrolling the map */}
      <div className="map-toolbar" style={{
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 14px',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(8,1,15,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        width: '100vw',
        boxSizing: 'border-box',
      }}>
        <span style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', flex: 1 }}>
          Grant Park · Festival Map
        </span>
        <button onClick={zoomOut} className="map-zoom-btn" disabled={width <= MIN_W}>−</button>
        <button onClick={zoomIn}  className="map-zoom-btn" disabled={width >= MAX_W}>+</button>
      </div>

      <img
        src="/map.jpg"
        alt="Lollapalooza festival map"
        style={{ display: 'block', width, maxWidth: 'none' }}
        draggable={false}
      />
    </div>
  )
}
