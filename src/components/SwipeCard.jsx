import { useRef, useState } from 'react'

// Swipe façon Tinder, sans dépendance : pointer events natifs.
// Droite = POUR 🔥, gauche = CONTRE ❄. Seuil 35% de la largeur, sinon retour élastique.
const THRESHOLD_RATIO = 0.35

export default function SwipeCard({ onSwipe, children }) {
  const start = useRef(null) // {x, y} — lu uniquement dans les handlers
  const [dx, setDx] = useState(0)
  const [width, setWidth] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [leaving, setLeaving] = useState(false)

  const threshold = width * THRESHOLD_RATIO
  const progress = threshold ? Math.min(1, Math.abs(dx) / threshold) : 0

  function onPointerDown(e) {
    if (leaving) return
    start.current = { x: e.clientX, y: e.clientY }
    setWidth(e.currentTarget.offsetWidth)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e) {
    if (!start.current || leaving) return
    const deltaX = e.clientX - start.current.x
    const deltaY = e.clientY - start.current.y
    // Ne capture le geste que s'il est clairement horizontal
    if (!dragging) {
      if (Math.abs(deltaX) < 8) return
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        start.current = null
        return
      }
      setDragging(true)
    }
    setDx(deltaX)
  }

  function onPointerUp() {
    if (!start.current || leaving) return
    start.current = null
    setDragging(false)
    if (Math.abs(dx) > threshold) {
      const side = dx > 0 ? 'pour' : 'contre'
      setLeaving(true)
      setDx(dx > 0 ? width * 1.4 : -width * 1.4)
      setTimeout(() => {
        onSwipe(side)
        setLeaving(false)
        setDx(0)
      }, 260)
    } else {
      setDx(0)
    }
  }

  return (
    <div className="relative flex-1 flex" style={{ touchAction: 'pan-y' }}>
      {/* Hints qui montent en opacité pendant le drag */}
      <div
        className="absolute top-8 left-6 z-10 px-3 py-1.5 rounded-xl border-2 border-cold text-cold font-black text-sm -rotate-12 pointer-events-none"
        style={{ opacity: dx < 0 ? progress : 0 }}
      >
        CONTRE ❄
      </div>
      <div
        className="absolute top-8 right-6 z-10 px-3 py-1.5 rounded-xl border-2 border-hot text-hot font-black text-sm rotate-12 pointer-events-none"
        style={{ opacity: dx > 0 ? progress : 0 }}
      >
        POUR 🔥
      </div>

      <div
        className="flex-1 flex flex-col cursor-grab active:cursor-grabbing"
        style={{
          transform: `translateX(${dx}px) rotate(${dx / 22}deg)`,
          transition: dragging ? 'none' : 'transform 0.26s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {children}
      </div>
    </div>
  )
}
