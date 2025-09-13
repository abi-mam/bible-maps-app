"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Star, Grid3X3, List, ChevronLeft, ChevronRight, ArrowLeft, Home } from "lucide-react"
import mockMapData from "./data/mockMapData"

// ---------------- HELPERS ----------------
const useLongPress = (callback, ms = 500) => {
  const [startLongPress, setStartLongPress] = useState(false)
  const timerRef = useRef<any>()

  useEffect(() => {
    if (startLongPress) {
      timerRef.current = setTimeout(callback, ms)
    } else {
      clearTimeout(timerRef.current)
    }
    return () => clearTimeout(timerRef.current)
  }, [callback, ms, startLongPress])

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false)
  }
}

const TitlePopup = ({ title, onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div className="bg-white rounded-lg p-6 m-4 max-w-sm">
      <p className="text-sm font-medium text-black">{title}</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Close
      </button>
    </div>
  </div>
)

// ---------------- MAIN APP ----------------
const BibleMapsApp = () => {
  const [currentScreen, setCurrentScreen] = useState("home")
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState("smallList")
  const [currentMapIndex, setCurrentMapIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [showFavorites, setShowFavorites] = useState(false)
  const [activeMap, setActiveMap] = useState<any>(null)
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false)
  const [showTitlePopup, setShowTitlePopup] = useState(false)
  const [popupTitle, setPopupTitle] = useState("")
  const [mapScale, setMapScale] = useState(1)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [showControls, setShowControls] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [lastTouchDistance, setLastTouchDistance] = useState(0)
  const [fitToPageScale, setFitToPageScale] = useState(1)
  const mapRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchRef = useRef({ startX: 0, startY: 0, lastScale: 1 })

  const handleLongPress = (title: string) => {
    setPopupTitle(title)
    setShowTitlePopup(true)
  }
  const longPressProps = useLongPress(() => handleLongPress(popupTitle))

  const toggleFavorite = (mapId: number) => {
    const newFavorites = new Set(favorites)
    newFavorites.has(mapId) ? newFavorites.delete(mapId) : newFavorites.add(mapId)
    setFavorites(newFavorites)
  }

  const openMapViewer = (category: string, mapIndex: number) => {
    setCurrentCategory(category)
    setCurrentMapIndex(mapIndex)
    setActiveMap(mockMapData[category].maps[mapIndex])
    setCurrentScreen("mapViewer")
    setMapScale(1)
    setMapPosition({ x: 0, y: 0 })
    setHasOpenedBefore(true)
  }

  const getAllMaps = () =>
    Object.entries(mockMapData).flatMap(([category, data]) =>
      data.maps.map((map: any) => ({ ...map, category }))
    )

  const getFilteredMaps = () => {
    let maps = showFavorites
      ? getAllMaps().filter((m: any) => favorites.has(m.id))
      : currentCategory
      ? mockMapData[currentCategory].maps.map((m: any) => ({ ...m, category: currentCategory }))
      : getAllMaps()
    return searchQuery
      ? maps.filter((m: any) => m.title.toLowerCase().includes(searchQuery.toLowerCase()))
      : maps
  }

  const calculateFitToPageScale = () => {
    if (!mapRef.current || !containerRef.current) return 1
    const container = containerRef.current.getBoundingClientRect()
    const img = mapRef.current
    const scaleX = container.width / img.naturalWidth
    const scaleY = container.height / img.naturalHeight
    return Math.min(scaleX, scaleY, 1)
  }

  // ---------------- SCREEN RENDERING ----------------
  const renderHome = () => (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Bible Maps</h1>
      <input
        type="text"
        placeholder="Search maps..."
        className="border p-2 w-full mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(mockMapData).map(([category, data]) => (
          <div
            key={category}
            className="p-4 border rounded cursor-pointer"
            onClick={() => {
              setCurrentCategory(category)
              setCurrentScreen("category")
            }}
          >
            <img src={data.icon} alt={category} className="w-8 h-8 mb-2" />
            <p className="font-medium">{category}</p>
            <p className="text-sm text-gray-600">{data.count} maps</p>
          </div>
        ))}
      </div>
    </div>
  )

  const renderCategory = () => (
    <div className="p-4">
      <button
        className="flex items-center mb-4 text-blue-600"
        onClick={() => setCurrentScreen("home")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </button>
      <h2 className="text-lg font-bold mb-4">{currentCategory}</h2>
      <div className="grid grid-cols-2 gap-4">
        {mockMapData[currentCategory!].maps.map((map: any, index: number) => (
          <div
            key={map.id}
            className="p-2 border rounded cursor-pointer"
            onClick={() => openMapViewer(currentCategory!, index)}
          >
            <img src={map.image} alt={map.title} className="w-full h-24 object-cover mb-2" />
            <p className="text-sm">{map.title}</p>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMapViewer = () => (
    <div className="relative w-full h-full" ref={containerRef}>
      <button
        className="absolute top-2 left-2 bg-white rounded p-2 shadow"
        onClick={() => setCurrentScreen("category")}
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
      {activeMap && (
        <img
          ref={mapRef}
          src={activeMap.image}
          alt={activeMap.title}
          className="w-full h-auto object-contain"
          style={{
            transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapScale})`,
            transformOrigin: "center"
          }}
        />
      )}
    </div>
  )

  return (
    <div className="w-full h-full">
      {currentScreen === "home" && renderHome()}
      {currentScreen === "category" && renderCategory()}
      {currentScreen === "mapViewer" && renderMapViewer()}
      {showTitlePopup && (
        <TitlePopup title={popupTitle} onClose={() => setShowTitlePopup(false)} />
      )}
    </div>
  )
}

export default BibleMapsApp
