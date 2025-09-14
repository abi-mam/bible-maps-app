"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Star, Grid3X3, List, ChevronLeft, ChevronRight, ArrowLeft, Home } from "lucide-react"
import mockMapData from "../data/mapData"

const SimpleBookIcon = ({ className }) => (
  <div className={className}>
    <img src="/open-book-icon.png" alt="Open Book" className="w-full h-full" />
  </div>
)

const useLongPress = (callback, ms = 500) => {
  const [startLongPress, setStartLongPress] = useState(false)
  const timerRef = useRef()

  useEffect(() => {
    if (startLongPress) {
      timerRef.current = setTimeout(callback, ms)
    } else {
      clearTimeout(timerRef.current)
    }

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [callback, ms, startLongPress])

  const start = () => setStartLongPress(true)
  const stop = () => setStartLongPress(false)

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  }
}

const TitlePopup = ({ title, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
    <div className="bg-white rounded-lg p-6 m-4 max-w-sm">
      <p className="text-sm font-medium text-black">{title}</p>
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Close
      </button>
    </div>
  </div>
)

// Simple Open Book Icon Component
// const SimpleBookIcon = ({ className }) => (
//   <div className={className}>
//     <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//       <path d="M2 3h6c1.1 0 2 .9 2 2v14c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V4c0-1.1.9-2 2-2z" />
//       <path d="M16 3h6c1.1 0 2 .9 2 2v15c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1V5c0-1.1.9-2 2-2z" />
//       <path d="M12 3v16" />
//     </svg>
//   </div>
// )

// Layered Squares Icon Component
const LayeredSquaresIcon = ({ className }) => (
  <div className={className}>
    <img src="/category-icon.png" alt="Category" className="w-full h-full" />
  </div>
)

// Custom Icon Components with enhanced styling from home card
const ScrollIcon = ({ className }) => (
  <div className={className}>
    <svg width="100%" height="100%" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      {/* Main scroll paper */}
      <rect x="20" y="25" width="88" height="78" fill="#4a7c59" rx="4" ry="4" />
      {/* Left wooden rod */}
      <rect x="12" y="16" width="16" height="96" fill="#2d5016" rx="8" ry="8" />
      <rect x="14" y="18" width="12" height="92" fill="#1a3009" rx="6" ry="6" />
      {/* Right wooden rod */}
      <rect x="100" y="16" width="16" height="96" fill="#2d5016" rx="8" ry="8" />
      <rect x="102" y="18" width="12" height="92" fill="#1a3009" rx="6" ry="6" />
      {/* Text lines on scroll */}
      <line x1="32" y1="40" x2="96" y2="40" stroke="#1a3009" strokeWidth="2" />
      <line x1="32" y1="50" x2="92" y2="50" stroke="#1a3009" strokeWidth="2" />
      <line x1="32" y1="60" x2="96" y2="60" stroke="#1a3009" strokeWidth="2" />
      <line x1="32" y1="70" x2="88" y2="70" stroke="#1a3009" strokeWidth="2" />
      <line x1="32" y1="80" x2="96" y2="80" stroke="#1a3009" strokeWidth="2" />
      <line x1="32" y1="90" x2="90" y2="90" stroke="#1a3009" strokeWidth="2" />
    </svg>
  </div>
)

const CrossIcon = ({ className }) => (
  <div className={className}>
    <svg width="100%" height="100%" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      {/* Vertical beam */}
      <rect x="54" y="16" width="20" height="96" fill="#4a7c59" rx="2" ry="2" />
      {/* Horizontal beam */}
      <rect x="32" y="38" width="64" height="20" fill="#4a7c59" rx="2" ry="2" />
      {/* Shadow/depth on vertical */}
      <rect x="56" y="18" width="16" height="92" fill="#2d5016" rx="1" ry="1" />
      {/* Shadow/depth on horizontal */}
      <rect x="34" y="40" width="60" height="16" fill="#2d5016" rx="1" ry="1" />
      {/* Highlight on vertical */}
      <rect x="58" y="20" width="4" height="88" fill="#6b9b7a" rx="2" ry="2" />
      {/* Highlight on horizontal */}
      <rect x="36" y="42" width="56" height="4" fill="#6b9b7a" rx="2" ry="2" />
    </svg>
  </div>
)

const BookIcon = ({ className }) => (
  <div className={className}>
    <svg width="100%" height="100%" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      {/* Left page with curved binding */}
      <path d="M16 24c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v72c0 4.4-3.6 8-8 8H24c-4.4 0-8-3.6-8-8V24z" fill="#4a7c59" />
      <path d="M20 28c0-2.2 1.8-4 4-4h28c2.2 0 4 1.8 4 4v64c0 2.2-1.8 4-4 4H24c-2.2 0-4-1.8-4-4V28z" fill="#f0f8f0" />
      {/* Right page with curved binding */}
      <path d="M64 24c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v72c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8V24z" fill="#4a7c59" />
      <path d="M68 28c0-2.2 1.8-4 4-4h28c2.2 0 4 1.8 4 4v64c0 2.2-1.8 4-4 4H72c-2.2 0-4-1.8-4-4V28z" fill="#f0f8f0" />

      {/* Curved V-shape binding in center */}
      <path
        d="M56 18 Q62 24 62 32 Q62 40 62 48 Q62 56 62 64 Q62 72 62 80 Q62 88 62 96 Q62 102 68 106"
        fill="none"
        stroke="#2d5016"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M56 18 Q62 24 62 32 Q62 40 62 48 Q62 56 62 64 Q62 72 62 80 Q62 88 62 96 Q62 102 68 106"
        fill="none"
        stroke="#1a3009"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Shadow on the curved binding */}
      <path
        d="M58 20 Q62 26 62 34 Q62 42 62 50 Q62 58 62 66 Q62 74 62 82 Q62 90 62 98 Q62 102 66 104"
        fill="none"
        stroke="#1a3009"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      />

      {/* Text lines left page */}
      <line x1="26" y1="36" x2="50" y2="36" stroke="#4a7c59" strokeWidth="1" />
      <line x1="26" y1="42" x2="48" y2="42" stroke="#4a7c59" strokeWidth="1" />
      <line x1="26" y1="48" x2="50" y2="48" stroke="#4a7c59" strokeWidth="1" />
      <line x1="26" y1="54" x2="46" y2="54" stroke="#4a7c59" strokeWidth="1" />
      <line x1="26" y1="60" x2="50" y2="60" stroke="#4a7c59" strokeWidth="1" />
      {/* Text lines right page */}
      <line x1="74" y1="36" x2="98" y2="36" stroke="#4a7c59" strokeWidth="1" />
      <line x1="74" y1="42" x2="96" y2="42" stroke="#4a7c59" strokeWidth="1" />
      <line x1="74" y1="48" x2="98" y2="48" stroke="#4a7c59" strokeWidth="1" />
      <line x1="74" y1="54" x2="94" y2="54" stroke="#4a7c59" strokeWidth="1" />
      <line x1="74" y1="60" x2="98" y2="60" stroke="#4a7c59" strokeWidth="1" />
    </svg>
  </div>
)

// Mock data structure for maps

const BibleMapsApp = () => {
  console.log("mockMapData =", mockMapData)
  const [currentScreen, setCurrentScreen] = useState("home")
  const [currentCategory, setCurrentCategory] = useState(null)
  const [viewMode, setViewMode] = useState("smallList") // 'grid', 'smallList', 'largeList'
  const [currentMapIndex, setCurrentMapIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState(new Set())
  const [showFavorites, setShowFavorites] = useState(false)
  const [activeMap, setActiveMap] = useState(null)
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false)
  const [showTitlePopup, setShowTitlePopup] = useState(false)
  const [popupTitle, setPopupTitle] = useState("")

  // Map viewer states
  const [mapScale, setMapScale] = useState(1)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [showControls, setShowControls] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [lastTouchDistance, setLastTouchDistance] = useState(0)
  const [fitToPageScale, setFitToPageScale] = useState(1)
  const mapRef = useRef(null)
  const touchRef = useRef({ startX: 0, startY: 0, lastScale: 1 })
  const containerRef = useRef(null)

  const handleLongPress = (title) => {
    setPopupTitle(title)
    setShowTitlePopup(true)
  }

  const longPressProps = useLongPress(() => handleLongPress(popupTitle))

  useEffect(() => {
    // Splash screen logic
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        if (hasOpenedBefore && activeMap) {
          setCurrentScreen("mapViewer")
        } else {
          setCurrentScreen("home")
        }
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentScreen, hasOpenedBefore, activeMap])

  const toggleFavorite = (mapId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(mapId)) {
      newFavorites.delete(mapId)
    } else {
      newFavorites.add(mapId)
    }
    setFavorites(newFavorites)
  }

  const openMapViewer = (category, mapIndex) => {
    setCurrentCategory(category)
    setCurrentMapIndex(mapIndex)
    setActiveMap(mockMapData[category].maps[mapIndex])
    setCurrentScreen("mapViewer")
    setMapScale(1)
    setMapPosition({ x: 0, y: 0 })
    setHasOpenedBefore(true)
  }

  const getAllMaps = () => {
    return Object.entries(mockMapData).flatMap(([category, data]) => data.maps.map((map) => ({ ...map, category })))
  }

  const getFilteredMaps = () => {
    let maps = showFavorites
      ? getAllMaps().filter((map) => favorites.has(map.id))
      : currentCategory
        ? mockMapData[currentCategory].maps.map((map) => ({ ...map, category: currentCategory }))
        : getAllMaps()

    if (searchQuery) {
      maps = maps.filter((map) => map.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return maps
  }

  const calculateFitToPageScale = () => {
    if (!mapRef.current || !containerRef.current) return 1

    const container = containerRef.current.getBoundingClientRect()
    const img = mapRef.current

    const scaleX = container.width / img.naturalWidth
    const scaleY = container.height / img.naturalHeight

    return Math.min(scaleX, scaleY, 1)
  }

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      touchRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        lastScale: mapScale,
      }
      setIsDragging(true)
    } else if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      )
      setLastTouchDistance(distance)
    }
    setShowControls(true)
  }

  const handleTouchMove = (e) => {
    e.preventDefault()

    if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0]
      const deltaX = touch.clientX - touchRef.current.startX
      const deltaY = touch.clientY - touchRef.current.startY

      if (mapScale <= fitToPageScale) {
        if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 30) {
          if (deltaX > 0 && currentMapIndex > 0) {
            // Right swipe - previous map
            const newIndex = currentMapIndex - 1
            setCurrentMapIndex(newIndex)
            setActiveMap(mockMapData[currentCategory].maps[newIndex])
            setMapScale(mapScale) // Keep same scale
          } else if (deltaX < 0 && currentMapIndex < mockMapData[currentCategory].maps.length - 1) {
            // Left swipe - next map
            const newIndex = currentMapIndex + 1
            setCurrentMapIndex(newIndex)
            setActiveMap(mockMapData[currentCategory].maps[newIndex])
            setMapScale(mapScale) // Keep same scale
          }
          setIsDragging(false)
        }
      } else {
        const newX = mapPosition.x + deltaX / mapScale
        const newY = mapPosition.y + deltaY / mapScale

        // Apply boundary constraints
        const container = containerRef.current?.getBoundingClientRect()
        const img = mapRef.current

        if (container && img) {
          const scaledWidth = img.naturalWidth * mapScale
          const scaledHeight = img.naturalHeight * mapScale

          let clampedX = newX
          let clampedY = newY

          // Horizontal constraints
          if (scaledWidth > container.width) {
            const maxX = (scaledWidth - container.width) / (2 * mapScale)
            clampedX = Math.max(-maxX, Math.min(maxX, newX))
          } else {
            clampedX = 0
          }

          // Vertical constraints
          if (scaledHeight > container.height) {
            const maxY = (scaledHeight - container.height) / (2 * mapScale)
            clampedY = Math.max(-maxY, Math.min(maxY, newY))
          } else {
            clampedY = 0
          }

          setMapPosition({ x: clampedX, y: clampedY })
        }

        touchRef.current.startX = touch.clientX
        touchRef.current.startY = touch.clientY
      }
    } else if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      )

      if (lastTouchDistance > 0) {
        const scaleChange = distance / lastTouchDistance
        const newScale = Math.max(0.1, Math.min(5.0, mapScale * scaleChange))
        setMapScale(newScale)
      }

      setLastTouchDistance(distance)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setLastTouchDistance(0)
  }

  const handleDoubleClick = () => {
    if (mapScale === fitToPageScale) {
      setMapScale(1)
    } else {
      setMapScale(fitToPageScale)
    }
    setMapPosition({ x: 0, y: 0 })
  }

  useEffect(() => {
    if (mapRef.current && containerRef.current) {
      const newFitScale = calculateFitToPageScale()
      setFitToPageScale(newFitScale)
      setMapScale(newFitScale)
      setMapPosition({ x: 0, y: 0 })
    }
  }, [activeMap])

  // Splash Screen
  if (currentScreen === "splash") {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <BookIcon className="w-24 h-24 text-green-800 mb-4" />
          <h1 className="text-2xl font-bold text-green-800">Bible Maps</h1>
        </div>
      </div>
    )
  }

  // Home Screen
  if (currentScreen === "home") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gray-100 px-4 py-4">
          <div className="flex items-center justify-center mb-4">
            <SimpleBookIcon className="w-6 h-6 text-green-800 mr-2" />
            <h1 className="text-lg font-bold text-green-800">Bible Maps</h1>
          </div>

          {/* Search and Favorites Row */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Search maps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              onClick={() => {
                setShowFavorites(true)
                setCurrentScreen("category")
              }}
              className="p-2 bg-gray-100 border border-gray-300 rounded-lg"
            >
              <Star className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Category Cards */}
        <div className="px-4 py-6 space-y-4 mb-16">
          {Object.entries(mockMapData).map(([category, data]) => {
            const Icon = data.icon
            return (
              <div
                key={category}
                onClick={() => {
                  setCurrentCategory(category)
                  setShowFavorites(false)
                  setCurrentScreen("category")
                }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center mb-4">
                  {Icon ? <Icon className="w-16 h-16 text-blue-600 mb-2" /> : null}
                  <h3 className="text-lg font-normal text-blue-600">{category}</h3>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm text-green-700 opacity-75">{data.maps.length} maps available</span>
                  <span className="text-sm text-green-700 opacity-75">Explore Maps →</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Dark Band Area */}
        <div className="h-32 bg-gray-800 flex flex-col items-center justify-center px-4">
          <div className="flex items-center justify-center mb-2">
            <SimpleBookIcon className="w-6 h-6 text-white mr-2" />
            <h2 className="text-sm font-bold text-white">Bible Maps</h2>
          </div>
          <p className="text-sm text-gray-300 text-center">
            Explore the lands of the Bible with detailed historical maps
          </p>
        </div>
      </div>
    )
  }

  // Category Screen
  if (currentScreen === "category") {
    const maps = getFilteredMaps()
    const displayTitle = showFavorites ? "Favorites" : currentCategory
    const Icon = showFavorites ? Star : mockMapData[currentCategory]?.icon || BookIcon

    return (
      <div className="min-h-screen bg-gray-50">
        {showTitlePopup && <TitlePopup title={popupTitle} onClose={() => setShowTitlePopup(false)} />}

        {/* Header */}
        <div className="bg-gray-100 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => setCurrentScreen("home")} className="mr-3">
              <LayeredSquaresIcon className="w-6 h-6 text-blue-600" />
            </button>
            <div>
              <div className="flex items-center">
                <Icon className="w-4 h-4 text-blue-600 mr-1" />
                <h2 className="text-lg font-bold text-black">Bible Maps</h2>
              </div>
              <p className="text-sm text-green-700 opacity-75">{maps.length} Maps</p>
            </div>
          </div>

          <div className="flex items-center bg-white rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode(viewMode === "smallList" ? "largeList" : "smallList")}
              className={`p-2 rounded ml-1 ${viewMode.includes("List") ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-4">
          {viewMode === "grid" && (
            <div className="grid grid-cols-2 gap-4">
              {maps.map((map, index) => (
                <div
                  key={map.id}
                  onClick={() => openMapViewer(map.category, index)}
                  className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={map.thumbnail || "/placeholder.svg"}
                      alt={map.title}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(map.id)
                      }}
                      className="absolute top-2 right-2"
                    >
                      <Star
                        className={`w-5 h-5 ${favorites.has(map.id) ? "text-yellow-500 fill-current" : "text-gray-400"}`}
                      />
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-black line-clamp-2">{map.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === "smallList" && (
            <div className="bg-white rounded-lg shadow-sm">
              {maps.map((map, index) => (
                <div
                  key={map.id}
                  onClick={() => openMapViewer(map.category, index)}
                  className="flex items-center p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50"
                >
                  <img
                    src={map.thumbnail || "/placeholder.svg"}
                    alt={map.title}
                    className="w-16 h-12 object-cover rounded mr-4 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black truncate">{map.title}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(map.id)
                    }}
                    className="ml-2 flex-shrink-0"
                  >
                    <Star
                      className={`w-4 h-4 ${favorites.has(map.id) ? "text-yellow-500 fill-current" : "text-gray-400"}`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {viewMode === "largeList" && (
            <div className="space-y-6">
              {/* Map Title List */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="space-y-2">
                  {maps.map((map, index) => (
                    <div key={`title-${map.id}`} className="flex">
                      <span className="text-sm text-gray-600 w-8 flex-shrink-0 text-right">{index + 1} :</span>
                      <span className="text-sm text-black truncate ml-2">{map.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Large Thumbnails - Long Tile Container */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                {maps.map((map, index) => (
                  <div key={map.id} className={index > 0 ? "mt-4" : ""}>
                    <div
                      onClick={() => openMapViewer(map.category, index)}
                      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <div className="relative">
                        <img
                          src={map.thumbnail || "/placeholder.svg"}
                          alt={map.title}
                          className="w-full h-auto object-contain"
                          style={{ maxHeight: "none" }}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(map.id)
                          }}
                          className="absolute top-2 right-2"
                        >
                          <Star
                            className={`w-4 h-4 ${favorites.has(map.id) ? "text-yellow-500 fill-current" : "text-gray-400"}`}
                          />
                        </button>
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-black truncate flex-1">{map.title}</p>
                          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full ml-2">#{index + 1}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Icons */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-50 p-4 flex justify-center space-x-8">
          <button onClick={() => setSearchQuery("")} className="p-3 bg-white rounded-full shadow-sm">
            <Search className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => {
              setShowFavorites(!showFavorites)
            }}
            className={`p-3 rounded-full shadow-sm ${showFavorites ? "bg-yellow-100" : "bg-white"}`}
          >
            <Star className={`w-4 h-4 ${showFavorites ? "text-yellow-500 fill-current" : "text-gray-600"}`} />
          </button>
        </div>
      </div>
    )
  }

  // Map Viewer
  if (currentScreen === "mapViewer" && activeMap) {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 bg-white overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseMove={() => setShowControls(true)}
        style={{ touchAction: "none" }}
      >
        {/* Map Image */}
        <div className="w-full h-full flex items-center justify-center">
          <img
            ref={mapRef}
            src={activeMap.fullImage || "/placeholder.svg"}
            alt={activeMap.title}
            className="max-w-full max-h-full object-contain transition-transform duration-200"
            style={{
              transform: `scale(${mapScale}) translate(${mapPosition.x}px, ${mapPosition.y}px)`,
            }}
            onDoubleClick={handleDoubleClick}
            onLoad={() => {
              const newFitScale = calculateFitToPageScale()
              setFitToPageScale(newFitScale)
              setMapScale(newFitScale)
            }}
          />
        </div>

        {/* Controls Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
        >
          {/* Top Controls */}
          <div className="absolute top-4 left-4 flex flex-col pointer-events-auto">
            <button
              onClick={() => {
                setCurrentScreen("category")
                setShowControls(false)
              }}
              className="mb-2 p-2 bg-white bg-opacity-90 rounded-lg text-gray-800 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <p className="text-gray-800 text-xs bg-white bg-opacity-90 px-3 py-2 rounded shadow-sm max-w-xs">
              {activeMap.title}
            </p>
          </div>

          {/* Favorite Toggle */}
          <button
            onClick={() => toggleFavorite(activeMap.id)}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 rounded-lg pointer-events-auto shadow-sm"
          >
            <Star
              className={`w-5 h-5 ${favorites.has(activeMap.id) ? "text-yellow-500 fill-current" : "text-gray-600"}`}
            />
          </button>

          {/* Navigation Arrows */}
          {currentMapIndex > 0 && (
            <button
              onClick={() => {
                const newIndex = currentMapIndex - 1
                setCurrentMapIndex(newIndex)
                setActiveMap(mockMapData[currentCategory].maps[newIndex])
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-90 rounded-lg pointer-events-auto shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
          )}

          {currentMapIndex < mockMapData[currentCategory].maps.length - 1 && (
            <button
              onClick={() => {
                const newIndex = currentMapIndex + 1
                setCurrentMapIndex(newIndex)
                setActiveMap(mockMapData[currentCategory].maps[newIndex])
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-90 rounded-lg pointer-events-auto shadow-sm"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          )}

          {/* Home Button */}
          <button
            onClick={() => {
              setCurrentScreen("home")
              setShowControls(false)
            }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-2 bg-white bg-opacity-90 rounded-lg pointer-events-auto shadow-sm"
          >
            <Home className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        {/* Hide controls after timeout */}
        {showControls && setTimeout(() => setShowControls(false), 3000)}
      </div>
    )
  }

  return null
}

export default BibleMapsApp
