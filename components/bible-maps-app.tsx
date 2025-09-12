"use client"

import { useState, useRef, useEffect, FC } from "react"
import {
  Search,
  Star,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react"

interface IconProps {
  className?: string
}

/* --- Simple icons (SVG or images) --- */
const ScrollIcon: FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10" />
    <path d="M9 7h6" />
    <path d="M9 11h6" />
  </svg>
)

/* --- Mock data type & sample maps --- */
type MapData = {
  id: string
  title: string
  image: string
  category: string
}

const mockMaps: MapData[] = [
  { id: "1", title: "Map of Exodus", image: "/maps/exodus.png", category: "Old Testament" },
  { id: "2", title: "Paul’s Journeys", image: "/maps/paul.png", category: "New Testament" },
  { id: "3", title: "Kingdoms of Israel", image: "/maps/israel.png", category: "Old Testament" },
]

const categories = ["Old Testament", "New Testament"]

/* ----------------- Component ----------------- */

const BibleMapsApp: FC = () => {
  /* navigation & data */
  const [screen, setScreen] = useState<"home" | "category" | "mapViewer">("home")
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [activeMapIndex, setActiveMapIndex] = useState<number>(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")

  const mapsForCategory = (cat: string | null) =>
    mockMaps.filter((m) => !cat || m.category === cat)

  /* map viewer state */
  const [mapScale, setMapScale] = useState(1)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 }) // in px relative to center
  const [isPanning, setIsPanning] = useState(false)
  const [lastPanPoint, setLastPanPoint] = useState<{ x: number; y: number } | null>(null)
  const [showControls, setShowControls] = useState(true)

  /* refs */
  const imgRef = useRef<HTMLImageElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  /* pinch tracking */
  const lastDistanceRef = useRef<number | null>(null)
  const lastScaleRef = useRef<number>(1)

  /* double-tap */
  const lastTapRef = useRef<number>(0)

  /* helpers */
  const activeMap = () => {
    const list = mapsForCategory(currentCategory)
    return list[activeMapIndex] || null
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  /* reset transform */
  const resetTransform = () => {
    setMapScale(1)
    setMapPosition({ x: 0, y: 0 })
    lastScaleRef.current = 1
  }

  /* clamp helpers */
  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

  /* calculate fit-to-container scale (so we can double-tap to toggle) */
  const calculateFitScale = () => {
    const img = imgRef.current
    const container = containerRef.current
    if (!img || !container || !img.naturalWidth || !img.naturalHeight) return 1
    const cw = container.clientWidth
    const ch = container.clientHeight
    const scaleX = cw / img.naturalWidth
    const scaleY = ch / img.naturalHeight
    return Math.min(scaleX, scaleY, 1)
  }

  /* update constraints when scale or image loads */
  useEffect(() => {
    const fit = calculateFitScale()
    // if scale is smaller than fit, snap to fit
    // keep current if zoomed intentionally
    if (mapScale < fit) {
      setMapScale(fit)
      lastScaleRef.current = fit
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMapIndex])

  /* ---------- Touch handlers for pinch/zoom/pan/swipe ---------- */

  const onTouchStart = (e: React.TouchEvent) => {
    setShowControls(true)

    if (e.touches.length === 1) {
      // start a pan
      const t = e.touches[0]
      setLastPanPoint({ x: t.clientX, y: t.clientY })
      setIsPanning(true)
    } else if (e.touches.length === 2) {
      // start pinch
      const d = distanceBetween(e.touches[0], e.touches[1])
      lastDistanceRef.current = d
      lastScaleRef.current = mapScale
    }
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isPanning && lastPanPoint) {
      // pan
      const t = e.touches[0]
      const dx = t.clientX - lastPanPoint.x
      const dy = t.clientY - lastPanPoint.y
      setLastPanPoint({ x: t.clientX, y: t.clientY })

      // translate scaled movement so panning is natural
      setMapPosition((prev) => {
        const next = { x: prev.x + dx, y: prev.y + dy }
        return next
      })
    } else if (e.touches.length === 2) {
      // pinch
      const d = distanceBetween(e.touches[0], e.touches[1])
      const lastD = lastDistanceRef.current ?? d
      if (lastD === 0) return
      const scaleFactor = d / lastD
      const newScale = clamp(lastScaleRef.current * scaleFactor, 0.5, 5)
      setMapScale(newScale)
    }

    // prevent browser default zoom on pinch
    e.preventDefault()
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    // clear pinch/pan state
    if (e.touches.length < 2) lastDistanceRef.current = null
    setIsPanning(false)
    setLastPanPoint(null)
    lastScaleRef.current = mapScale

    // if not zoomed (scale <= fitScale) consider horizontal swipe to change map
    const fit = calculateFitScale()
    if (mapScale <= fit) {
      // detect swipe gestures from changedTouches or velocity - simple approach: track last gesture positions via changedTouches
      // fallback: use touchend's changedTouches to try to infer horizontal swipe
      const changed = e.changedTouches
      if (changed && changed.length > 0) {
        // approximate: if horizontal movement large enough (>=60 px) change map
        // we need a stored start position; using lastPanPoint is null here — instead, store swipeStartRef
      }
    }

    // hide controls after short delay
    setTimeout(() => setShowControls(false), 2500)
  }

  /* We'll implement swipe using pointer/mouse (drag) as well for desktop; implement simple swipe detection using pointer down/up */

  const swipeStartRef = useRef<{ x: number; y: number } | null>(null)
  const onPointerDown = (e: React.PointerEvent) => {
    // remember pointer start for swipe detection (only when not zoomed)
    swipeStartRef.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const start = swipeStartRef.current
    swipeStartRef.current = null
    if (!start) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    const absX = Math.abs(dx)
    const absY = Math.abs(dy)
    const fit = calculateFitScale()
    if (mapScale <= fit && absX > 60 && absX > absY) {
      // horizontal swipe detected
      if (dx < 0) goToNextMap()
      else goToPrevMap()
    }
  }

  const distanceBetween = (a: Touch | { clientX: number; clientY: number }, b: Touch | { clientX: number; clientY: number }) => {
    const dx = a.clientX - b.clientX
    const dy = a.clientY - b.clientY
    return Math.hypot(dx, dy)
  }

  /* double-tap to toggle between fit scale and 1.5x (or 1) */
  const onDoubleTapOrClick = (clientX?: number, clientY?: number) => {
    const now = Date.now()
    const dt = now - lastTapRef.current
    lastTapRef.current = now
    const fit = calculateFitScale()
    if (dt < 300) {
      // double-tap
      if (Math.abs(mapScale - fit) < 0.05) {
        // zoom in to 2x (clamp to 3)
        const zoomTo = clamp(fit * 2, fit, 4)
        setMapScale(zoomTo)
        lastScaleRef.current = zoomTo
      } else {
        // reset to fit
        setMapScale(fit)
        setMapPosition({ x: 0, y: 0 })
        lastScaleRef.current = fit
      }
    } else {
      // single tap - show controls briefly
      setShowControls(true)
      setTimeout(() => setShowControls(false), 2000)
    }
  }

  /* pan via mouse for desktop usage */
  const mouseDownRef = useRef<boolean>(false)
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null)
  const onMouseDown = (e: React.MouseEvent) => {
    mouseDownRef.current = true
    lastMouseRef.current = { x: e.clientX, y: e.clientY }
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!mouseDownRef.current || !lastMouseRef.current) return
    const dx = e.clientX - lastMouseRef.current.x
    const dy = e.clientY - lastMouseRef.current.y
    lastMouseRef.current = { x: e.clientX, y: e.clientY }
    setMapPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }))
  }
  const onMouseUp = () => {
    mouseDownRef.current = false
    lastMouseRef.current = null
  }

  /* navigation helpers */
  const goToNextMap = () => {
    const list = mapsForCategory(currentCategory)
    if (activeMapIndex < list.length - 1) {
      setActiveMapIndex((i) => i + 1)
      resetTransform()
    }
  }
  const goToPrevMap = () => {
    if (activeMapIndex > 0) {
      setActiveMapIndex((i) => i - 1)
      resetTransform()
    }
  }

  /* keyboard arrow navigation (optional) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (screen !== "mapViewer") return
      if (e.key === "ArrowLeft") goToPrevMap()
      if (e.key === "ArrowRight") goToNextMap()
      if (e.key === "Escape") setScreen("category")
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, activeMapIndex, currentCategory])

  /* renderers */
  // Home
  if (screen === "home") {
    return (
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">📖 Bible Maps</h1>
        <div>
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCurrentCategory(cat)
                  setActiveMapIndex(0)
                  setScreen("category")
                }}
                className="w-full p-3 bg-gray-100 rounded text-left hover:bg-gray-200"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Favorites ⭐</h2>
          {favorites.size === 0 ? (
            <p className="text-gray-500 text-sm">No favorites yet</p>
          ) : (
            <ul className="list-disc list-inside">
              {Array.from(favorites).map((id) => {
                const fav = mockMaps.find((m) => m.id === id)
                return fav ? (
                  <li key={id} className="cursor-pointer" onClick={() => { setCurrentCategory(fav.category); setActiveMapIndex(mockMaps.findIndex(m=>m.id===id)); setScreen("mapViewer") }}>
                    {fav.title}
                  </li>
                ) : null
              })}
            </ul>
          )}
        </div>
      </div>
    )
  }

  // Category
  if (screen === "category") {
    const list = mapsForCategory(currentCategory)
    const filtered = list.filter((m) => m.title.toLowerCase().includes(searchQuery.toLowerCase()))
    return (
      <div className="p-4 space-y-4">
        <button className="flex items-center text-blue-600" onClick={() => setScreen("home")}>
          <ChevronLeft className="w-5 h-5 mr-1" /> Back
        </button>

        <h1 className="text-xl font-bold">{currentCategory}</h1>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search maps..."
          className="w-full p-2 border rounded"
        />

        <div className="grid grid-cols-2 gap-4 mt-3">
          {filtered.map((m, idx) => (
            <div
              key={m.id}
              onClick={() => { setActiveMapIndex(mockMaps.findIndex(mm => mm.id === m.id)); setScreen("mapViewer") }}
              className="relative border rounded p-2 cursor-pointer hover:bg-gray-50"
            >
              <img src={m.image} alt={m.title} className="w-full h-24 object-cover rounded" />
              <p className="mt-1 text-sm font-medium">{m.title}</p>
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavorite(m.id) }}
                className="absolute top-2 right-2"
              >
                <Star className={`w-5 h-5 ${favorites.has(m.id) ? "text-yellow-500" : "text-gray-400"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Map Viewer
  if (screen === "mapViewer") {
    const map = activeMap()
    if (!map) return null

    return (
      <div className="fixed inset-0 bg-white flex flex-col" ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        // desktop mouse pan handlers
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {/* header */}
        <div className="flex items-center p-2 bg-gray-100 border-b">
          <button onClick={() => setScreen("category")} className="p-2 hover:bg-gray-200 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="flex-1 text-center font-semibold">{map.title}</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => toggleFavorite(map.id)} className="p-2">
              <Star className={`w-5 h-5 ${favorites.has(map.id) ? "text-yellow-500" : "text-gray-400"}`} />
            </button>
            <button onClick={goToPrevMap} className="p-2"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={goToNextMap} className="p-2"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>

        {/* viewer area */}
        <div
          className="flex-1 bg-black flex items-center justify-center overflow-hidden touch-none"
          onTouchStart={(e) => onTouchStart(e)}
          onTouchMove={(e) => onTouchMove(e)}
          onTouchEnd={(e) => onTouchEnd(e)}
          onClick={() => onDoubleTapOrClick()}
          style={{ position: "relative" }}
        >
          <img
            ref={imgRef}
            src={map.image}
            alt={map.title}
            draggable={false}
            style={{
              transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapScale})`,
              transition: isPanning ? "none" : "transform 120ms ease-out",
              maxWidth: "none",
              maxHeight: "none",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              touchAction: "none",
              userSelect: "none",
            }}
            className="select-none"
            onLoad={() => {
              const fit = calculateFitScale()
              setMapScale(fit)
              lastScaleRef.current = fit
              setMapPosition({ x: 0, y: 0 })
            }}
          />
        </div>

        {/* small controls overlay (auto hide) */}
        {showControls && (
          <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-auto">
            <button className="bg-white p-2 rounded shadow" onClick={() => { setMapScale((s) => clamp(s * 1.2, 0.5, 5)); lastScaleRef.current = mapScale }}>
              +
            </button>
            <button className="bg-white p-2 rounded shadow" onClick={() => { setMapScale((s) => clamp(s / 1.2, 0.5, 5)); lastScaleRef.current = mapScale }}>
              -
            </button>
            <button className="bg-white p-2 rounded shadow" onClick={() => resetTransform()}>Reset</button>
          </div>
        )}
      </div>
    )
  }

  return null
}

export default BibleMapsApp
