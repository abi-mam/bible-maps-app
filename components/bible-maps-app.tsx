"use client"

import React, { useState, useEffect, useRef } from "react"
import { Search, Star, Grid3X3, List, ChevronLeft, ChevronRight, ArrowLeft, Home } from "lucide-react"

// ---------------- BOTTOM BAR ----------------
const BottomBar = ({ activeTab, onTabChange }) => {
  return (
    <div
      className="fixed inset-x-0 bottom-0 h-14 bg-white/95 backdrop-blur-md border-t border-gray-300 z-50 flex items-center justify-around pb-[env(safe-area-inset-bottom)]"
    >
      <button
        onClick={() => onTabChange("search")}
        className={`flex flex-col items-center ${activeTab === "search" ? "text-blue-600" : "text-gray-600"}`}>
        <Search className="h-5 w-5" />
        <span className="text-xs">Search</span>
      </button>
      <button
        onClick={() => onTabChange("favorites")}
        className={`flex flex-col items-center ${activeTab === "favorites" ? "text-blue-600" : "text-gray-600"}`}>
        <Star className="h-5 w-5" />
        <span className="text-xs">Favorites</span>
      </button>
    </div>
  )
}

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

// Layered Squares Icon Component
const LayeredSquaresIcon = ({ className }) => (
  <div className={className}>
    <img src="/category-icon.png" alt="Category" className="w-full h-full" />
  </div>
)

// Custom Icon Components with enhanced styling from home card
const ScrollIcon = ({ className }) => (
  <div className={className}>
    <svg width="100%" height="100%" viewBox="0 0 104 128" xmlns="http://www.w3.org/2000/svg">
      {/* Main scroll paper */}
      <rect x="20" y="25" width="64" height="78" fill="#6b9b7a" rx="4" ry="4" />
      {/* Left wooden rod */}
      <rect x="12" y="16" width="12" height="96" fill="#6b9b7a" rx="6" ry="6" />
      <rect x="14" y="18" width="8" height="92" fill="#6b9b7a" rx="4" ry="4" />
      {/* Right wooden rod */}
      <rect x="80" y="16" width="12" height="96" fill="#6b9b7a" rx="6" ry="6" />
      <rect x="82" y="18" width="8" height="92" fill="#6b9b7a" rx="4" ry="4" />
      {/* Text lines on scroll */}
      <line x1="28" y1="40" x2="76" y2="40" stroke="#f0f8f0" strokeWidth="2" />
      <line x1="28" y1="50" x2="74" y2="50" stroke="#f0f8f0" strokeWidth="2" />
      <line x1="28" y1="60" x2="76" y2="60" stroke="#f0f8f0" strokeWidth="2" />
      <line x1="28" y1="70" x2="72" y2="70" stroke="#f0f8f0" strokeWidth="2" />
      <line x1="28" y1="80" x2="76" y2="80" stroke="#f0f8f0" strokeWidth="2" />
      <line x1="28" y1="90" x2="74" y2="90" stroke="#f0f8f0" strokeWidth="2" />
    </svg>
  </div>
)

const CrossIcon = ({ className }) => (
  <div className={className}>
    <svg width="100%" height="100%" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      {/* Vertical beam */}
      <rect x="54" y="16" width="20" height="96" fill="#4a7c59" rx="2" ry="2" />
      {/* Horizontal beam */}
      <rect x="32" y="38" width="64" height="20" fill="#6b9b7a" rx="2" ry="2" />
      {/* Shadow/depth on vertical */}
      <rect x="56" y="18" width="16" height="92" fill="#6b9b7a" rx="1" ry="1" />
      {/* Shadow/depth on horizontal */}
      <rect x="34" y="40" width="60" height="16" fill="#4a7c59" rx="1" ry="1" />
      {/* Highlight on vertical */}
      <rect x="58" y="20" width="4" height="88" fill="#f0f8f0" rx="2" ry="2" />
      {/* Highlight on horizontal */}
      <rect x="36" y="42" width="56" height="4" fill="#f0f8f0" rx="2" ry="2" />
    </svg>
  </div>
)

const BookIcon = ({ className }) => (
  <div className={className}>
    <svg width="100%" height="100%" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      {/* Left page with curved binding */}
      <path d="M16 24c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v72c0 4.4-3.6 8-8 8H24c-4.4 0-8-3.6-8-8V24z" fill="#4a7c59" />
      <path d="M20 28c0-2.2 1.8-4 4-4h28c2.2 0 4 1.8 4 4v64c0 2.2-1.8 4-4 4H24c-2.2 0-4-1.8-4-4V28z" fill="#6b9b7a" />
      {/* Right page with curved binding */}
      <path d="M64 24c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v72c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8V24z" fill="#4a7c59" />
      <path d="M68 28c0-2.2 1.8-4 4-4h28c2.2 0 4 1.8 4 4v64c0 2.2-1.8 4-4 4H72c-2.2 0-4-1.8-4-4V28z" fill="#6b9b7a" />

      {/* Curved V-shape binding in center */}
      <path
        d="M56 18 Q62 24 62 32 Q62 40 62 48 Q62 56 62 64 Q62 72 62 80 Q62 88 62 96 Q62 102 68 106"
        fill="none"
        stroke="#f0f8f0"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M56 18 Q62 24 62 32 Q62 40 62 48 Q62 56 62 64 Q62 72 62 80 Q62 88 62 96 Q62 102 68 106"
        fill="none"
        stroke="#f0f8f0"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Shadow on the curved binding */}
      <path
        d="M58 20 Q62 26 62 34 Q62 42 62 50 Q62 58 62 66 Q62 74 62 82 Q62 90 62 98 Q62 102 66 104"
        fill="none"
        stroke="#f0f8f0"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      />

      {/* Text lines left page */}
      <line x1="26" y1="36" x2="50" y2="36" stroke="#f0f8f0" strokeWidth="1" />
      <line x1="26" y1="42" x2="48" y2="42" stroke="#f0f8f0" strokeWidth="1" />
      <line x1="26" y1="48" x2="50" y2="48" stroke="#f0f8f0" strokeWidth="1" />
      <line x1="26" y1="54" x2="46" y2="54" stroke="#f0f8f0" strokeWidth="1" />
      <line x1="26" y1="60" x2="50" y2="60" stroke="#f0f8f0" strokeWidth="1" />
      {/* Text lines right page */}
      <line x1="74" y1="36" x2="98" y2="36" stroke="#f0f8f0" strokeWidth="1" />
      <line x1="74" y1="42" x2="96" y2="42" stroke="#f0f8f0" strokeWidth="1" />
      <line x1="74" y1="48" x2="98" y2="48" stroke="#f0f8f0" strokeWidth="1" />
      <line x1="74" y1="54" x2="94" y2="54" stroke="#f0f8f0" strokeWidth="1" />
      <line x1="74" y1="60" x2="98" y2="60" stroke="#f0f8f0" strokeWidth="1" />
    </svg>
  </div>
)

// Mock data structure for maps
const mockMapData = {
  "OT Bible": {
    icon: ScrollIcon,
    count: 10,
    maps: [
      {
        id: "ot_ot_01_the_holy_land_relief",
        title: "The Holy Land Relief",
        thumbnail: "/maps/ot/ot_01_the_holy_land_relief.jpeg",
        fullImage: "/maps/ot/ot_01_the_holy_land_relief.jpeg",
      },
      {
        id: "ot_ot_02_the_world_of_patriarchs",
        title: "The World Of Patriarchs",
        thumbnail: "/maps/ot/ot_02_the_world_of_patriarchs.jpeg",
        fullImage: "/maps/ot/ot_02_the_world_of_patriarchs.jpeg",
      },
      {
        id: "ot_ot_03_the_exodus_and_conquest_of_canaan",
        title: "The Exodus And Conquest Of Canaan",
        thumbnail: "/maps/ot/ot_03_the_exodus_and_conquest_of_canaan.jpeg",
        fullImage: "/maps/ot/ot_03_the_exodus_and_conquest_of_canaan.jpeg",
      },
      {
        id: "ot_ot_04_the_twelve_tribes_of_israel",
        title: "The Twelve Tribes Of Israel",
        thumbnail: "/maps/ot/ot_04_the_twelve_tribes_of_israel.jpeg",
        fullImage: "/maps/ot/ot_04_the_twelve_tribes_of_israel.jpeg",
      },
      {
        id: "ot_ot_05_the_kingdoms_of_saul_david_and_solomon",
        title: "The Kingdoms Of Saul David And Solomon",
        thumbnail: "/maps/ot/ot_05_the_kingdoms_of_saul_david_and_solomon.jpeg",
        fullImage: "/maps/ot/ot_05_the_kingdoms_of_saul_david_and_solomon.jpeg",
      },
      {
        id: "ot_ot_06_the_kingdoms_of_israel_and_judah",
        title: "The Kingdoms Of Israel And Judah",
        thumbnail: "/maps/ot/ot_06_the_kingdoms_of_israel_and_judah.jpeg",
        fullImage: "/maps/ot/ot_06_the_kingdoms_of_israel_and_judah.jpeg",
      },
      {
        id: "ot_ot_07_the_prophets_of_judah_and_israel",
        title: "The Prophets Of Judah And Israel",
        thumbnail: "/maps/ot/ot_07_the_prophets_of_judah_and_israel.jpeg",
        fullImage: "/maps/ot/ot_07_the_prophets_of_judah_and_israel.jpeg",
      },
      {
        id: "ot_ot_08_the_assyrian_empire_c_700_bc",
        title: "The Assyrian Empire C 700 Bc",
        thumbnail: "/maps/ot/ot_08_the_assyrian_empire_c_700_bc.jpeg",
        fullImage: "/maps/ot/ot_08_the_assyrian_empire_c_700_bc.jpeg",
      },
      {
        id: "ot_ot_09_the_babylonian_empire_c_600_bc",
        title: "The Babylonian Empire C 600 Bc",
        thumbnail: "/maps/ot/ot_09_the_babylonian_empire_c_600_bc.jpeg",
        fullImage: "/maps/ot/ot_09_the_babylonian_empire_c_600_bc.jpeg",
      },
      {
        id: "ot_ot_10_the_persian_empire_c_450_bc",
        title: "The Persian Empire C 450 Bc",
        thumbnail: "/maps/ot/ot_10_the_persian_empire_c_450_bc.jpeg",
        fullImage: "/maps/ot/ot_10_the_persian_empire_c_450_bc.jpeg",
      },
    ],
  },
  "NT Bible": {
    icon: CrossIcon,
    count: 16,
    maps: [
      {
        id: "nt_nt_01_the_holy_land_in_time_of_jesus",
        title: "The Holy Land In Time Of Jesus",
        thumbnail: "/maps/nt/nt_01_the_holy_land_in_time_of_jesus.jpeg",
        fullImage: "/maps/nt/nt_01_the_holy_land_in_time_of_jesus.jpeg",
      },
      {
        id: "nt_nt_02_the_ministry_of_jesus",
        title: "The Ministry Of Jesus",
        thumbnail: "/maps/nt/nt_02_the_ministry_of_jesus.jpeg",
        fullImage: "/maps/nt/nt_02_the_ministry_of_jesus.jpeg",
      },
      {
        id: "nt_nt_03_jesus_final_week_in_jerusalem",
        title: "Jesus Final Week In Jerusalem",
        thumbnail: "/maps/nt/nt_03_jesus_final_week_in_jerusalem.jpeg",
        fullImage: "/maps/nt/nt_03_jesus_final_week_in_jerusalem.jpeg",
      },
      {
        id: "nt_nt_04_the_early_spread_of_christianity",
        title: "The Early Spread Of Christianity",
        thumbnail: "/maps/nt/nt_04_the_early_spread_of_christianity.jpeg",
        fullImage: "/maps/nt/nt_04_the_early_spread_of_christianity.jpeg",
      },
      {
        id: "nt_nt_05_pauls_missionary_travels_and_journey_to_rome",
        title: "Pauls Missionary Travels And Journey To Rome",
        thumbnail: "/maps/nt/nt_05_pauls_missionary_travels_and_journey_to_rome.jpeg",
        fullImage: "/maps/nt/nt_05_pauls_missionary_travels_and_journey_to_rome.jpeg",
      },
      {
        id: "nt_nt_06_the_roman_empire_and_the_early_church",
        title: "The Roman Empire And The Early Church",
        thumbnail: "/maps/nt/nt_06_the_roman_empire_and_the_early_church.jpeg",
        fullImage: "/maps/nt/nt_06_the_roman_empire_and_the_early_church.jpeg",
      },
      {
        id: "nt_nt_07_rome_empire",
        title: "Rome Empire",
        thumbnail: "/maps/nt/nt_07_rome_empire.jpeg",
        fullImage: "/maps/nt/nt_07_rome_empire.jpeg",
      },
      {
        id: "nt_nt_08_division_of_levant",
        title: "Division Of Levant",
        thumbnail: "/maps/nt/nt_08_division_of_levant.jpeg",
        fullImage: "/maps/nt/nt_08_division_of_levant.jpeg",
      },
      {
        id: "nt_nt_09_christ_in_galilee",
        title: "Christ In Galilee",
        thumbnail: "/maps/nt/nt_09_christ_in_galilee.jpeg",
        fullImage: "/maps/nt/nt_09_christ_in_galilee.jpeg",
      },
      {
        id: "nt_nt_10_galilee_to_jerusalem",
        title: "Galilee To Jerusalem",
        thumbnail: "/maps/nt/nt_10_galilee_to_jerusalem.jpeg",
        fullImage: "/maps/nt/nt_10_galilee_to_jerusalem.jpeg",
      },
      {
        id: "nt_nt_11_christ_in_judea",
        title: "Christ In Judea",
        thumbnail: "/maps/nt/nt_11_christ_in_judea.jpeg",
        fullImage: "/maps/nt/nt_11_christ_in_judea.jpeg",
      },
      {
        id: "nt_nt_12_jerusalem",
        title: "Jerusalem",
        thumbnail: "/maps/nt/nt_12_jerusalem.jpeg",
        fullImage: "/maps/nt/nt_12_jerusalem.jpeg",
      },
      {
        id: "nt_nt_13_early_christianity_east",
        title: "Early Christianity East",
        thumbnail: "/maps/nt/nt_13_early_christianity_east.jpeg",
        fullImage: "/maps/nt/nt_13_early_christianity_east.jpeg",
      },
      {
        id: "nt_nt_14_early_christianity_west",
        title: "Early Christianity West",
        thumbnail: "/maps/nt/nt_14_early_christianity_west.jpeg",
        fullImage: "/maps/nt/nt_14_early_christianity_west.jpeg",
      },
      {
        id: "nt_nt_15_pauls_journeys",
        title: "Pauls Journeys",
        thumbnail: "/maps/nt/nt_15_pauls_journeys.jpeg",
        fullImage: "/maps/nt/nt_15_pauls_journeys.jpeg",
      },
      {
        id: "nt_nt_16_epistles_overview",
        title: "Epistles Overview",
        thumbnail: "/maps/nt/nt_16_epistles_overview.jpeg",
        fullImage: "/maps/nt/nt_16_epistles_overview.jpeg",
      },
    ],
  },
  "NT Books": {
    icon: BookIcon,
    count: 54,
    maps: [
      {
        id: "nt_books_ntb_001_rome_empire",
        title: "Rome Empire",
        thumbnail: "/maps/nt_books/ntb_001_rome_empire.jpeg",
        fullImage: "/maps/nt_books/ntb_001_rome_empire.jpeg",
      },
      {
        id: "nt_books_ntb_002_division_of_levant",
        title: "Division Of Levant",
        thumbnail: "/maps/nt_books/ntb_002_division_of_levant.jpeg",
        fullImage: "/maps/nt_books/ntb_002_division_of_levant.jpeg",
      },
      {
        id: "nt_books_ntb_003_christ_in_galilee",
        title: "Christ In Galilee",
        thumbnail: "/maps/nt_books/ntb_003_christ_in_galilee.jpeg",
        fullImage: "/maps/nt_books/ntb_003_christ_in_galilee.jpeg",
      },
      {
        id: "nt_books_ntb_004_galilee_to_jerusalem",
        title: "Galilee To Jerusalem",
        thumbnail: "/maps/nt_books/ntb_004_galilee_to_jerusalem.jpeg",
        fullImage: "/maps/nt_books/ntb_004_galilee_to_jerusalem.jpeg",
      },
      {
        id: "nt_books_ntb_005_christ_in_judea",
        title: "Christ In Judea",
        thumbnail: "/maps/nt_books/ntb_005_christ_in_judea.jpeg",
        fullImage: "/maps/nt_books/ntb_005_christ_in_judea.jpeg",
      },
      {
        id: "nt_books_ntb_006_jerusalem",
        title: "Jerusalem",
        thumbnail: "/maps/nt_books/ntb_006_jerusalem.jpeg",
        fullImage: "/maps/nt_books/ntb_006_jerusalem.jpeg",
      },
      {
        id: "nt_books_ntb_007_matthew_2",
        title: "Matthew 2",
        thumbnail: "/maps/nt_books/ntb_007_matthew_2.png",
        fullImage: "/maps/nt_books/ntb_007_matthew_2.png",
      },
      {
        id: "nt_books_ntb_008_luke_2",
        title: "Luke 2",
        thumbnail: "/maps/nt_books/ntb_008_luke_2.png",
        fullImage: "/maps/nt_books/ntb_008_luke_2.png",
      },
      {
        id: "nt_books_ntb_009_luke_24",
        title: "Luke 24",
        thumbnail: "/maps/nt_books/ntb_009_luke_24.png",
        fullImage: "/maps/nt_books/ntb_009_luke_24.png",
      },
      {
        id: "nt_books_ntb_010_john_1",
        title: "John 1",
        thumbnail: "/maps/nt_books/ntb_010_john_1.png",
        fullImage: "/maps/nt_books/ntb_010_john_1.png",
      },
      {
        id: "nt_books_ntb_011_john_2-3",
        title: "John 2 3",
        thumbnail: "/maps/nt_books/ntb_011_john_2-3.png",
        fullImage: "/maps/nt_books/ntb_011_john_2-3.png",
      },
      {
        id: "nt_books_ntb_012_john_4",
        title: "John 4",
        thumbnail: "/maps/nt_books/ntb_012_john_4.png",
        fullImage: "/maps/nt_books/ntb_012_john_4.png",
      },
      {
        id: "nt_books_ntb_013_john_6",
        title: "John 6",
        thumbnail: "/maps/nt_books/ntb_013_john_6.png",
        fullImage: "/maps/nt_books/ntb_013_john_6.png",
      },
      {
        id: "nt_books_ntb_014_john_7-10",
        title: "John 7 10",
        thumbnail: "/maps/nt_books/ntb_014_john_7-10.png",
        fullImage: "/maps/nt_books/ntb_014_john_7-10.png",
      },
      {
        id: "nt_books_ntb_015_john_11-12",
        title: "John 11 12",
        thumbnail: "/maps/nt_books/ntb_015_john_11-12.png",
        fullImage: "/maps/nt_books/ntb_015_john_11-12.png",
      },
      {
        id: "nt_books_ntb_016_early_christianity_east",
        title: "Early Christianity East",
        thumbnail: "/maps/nt_books/ntb_016_early_christianity_east.png",
        fullImage: "/maps/nt_books/ntb_016_early_christianity_east.png",
      },
      {
        id: "nt_books_ntb_017_early_christianity_west",
        title: "Early Christianity West",
        thumbnail: "/maps/nt_books/ntb_017_early_christianity_west.png",
        fullImage: "/maps/nt_books/ntb_017_early_christianity_west.png",
      },
      {
        id: "nt_books_ntb_018_pauls_journeys",
        title: "Pauls Journeys",
        thumbnail: "/maps/nt_books/ntb_018_pauls_journeys.png",
        fullImage: "/maps/nt_books/ntb_018_pauls_journeys.png",
      },
      {
        id: "nt_books_ntb_019_antioch",
        title: "Antioch",
        thumbnail: "/maps/nt_books/ntb_019_antioch.jpeg",
        fullImage: "/maps/nt_books/ntb_019_antioch.jpeg",
      },
      {
        id: "nt_books_ntb_020_athens",
        title: "Athens",
        thumbnail: "/maps/nt_books/ntb_020_athens.jpeg",
        fullImage: "/maps/nt_books/ntb_020_athens.jpeg",
      },
      {
        id: "nt_books_ntb_021_corinth",
        title: "Corinth",
        thumbnail: "/maps/nt_books/ntb_021_corinth.jpeg",
        fullImage: "/maps/nt_books/ntb_021_corinth.jpeg",
      },
      {
        id: "nt_books_ntb_022_ephesus",
        title: "Ephesus",
        thumbnail: "/maps/nt_books/ntb_022_ephesus.jpeg",
        fullImage: "/maps/nt_books/ntb_022_ephesus.jpeg",
      },
      {
        id: "nt_books_ntb_023_caesarea",
        title: "Caesarea",
        thumbnail: "/maps/nt_books/ntb_023_caesarea.jpeg",
        fullImage: "/maps/nt_books/ntb_023_caesarea.jpeg",
      },
      {
        id: "nt_books_ntb_024_rome",
        title: "Rome",
        thumbnail: "/maps/nt_books/ntb_024_rome.jpeg",
        fullImage: "/maps/nt_books/ntb_024_rome.jpeg",
      },
      {
        id: "nt_books_ntb_025_acts_2",
        title: "Acts 2",
        thumbnail: "/maps/nt_books/ntb_025_acts_2.jpeg",
        fullImage: "/maps/nt_books/ntb_025_acts_2.jpeg",
      },
      {
        id: "nt_books_ntb_026_acts_6",
        title: "Acts 6",
        thumbnail: "/maps/nt_books/ntb_026_acts_6.jpeg",
        fullImage: "/maps/nt_books/ntb_026_acts_6.jpeg",
      },
      {
        id: "nt_books_ntb_027_acts_7",
        title: "Acts 7",
        thumbnail: "/maps/nt_books/ntb_027_acts_7.jpeg",
        fullImage: "/maps/nt_books/ntb_027_acts_7.jpeg",
      },
      {
        id: "nt_books_ntb_028_acts_8",
        title: "Acts 8",
        thumbnail: "/maps/nt_books/ntb_028_acts_8.jpeg",
        fullImage: "/maps/nt_books/ntb_028_acts_8.jpeg",
      },
      {
        id: "nt_books_ntb_029_acts_9",
        title: "Acts 9",
        thumbnail: "/maps/nt_books/ntb_029_acts_9.jpeg",
        fullImage: "/maps/nt_books/ntb_029_acts_9.jpeg",
      },
      {
        id: "nt_books_ntb_030_acts_9-11",
        title: "Acts 9 11",
        thumbnail: "/maps/nt_books/ntb_030_acts_9-11.jpeg",
        fullImage: "/maps/nt_books/ntb_030_acts_9-11.jpeg",
      },
      {
        id: "nt_books_ntb_031_acts_11",
        title: "Acts 11",
        thumbnail: "/maps/nt_books/ntb_031_acts_11.jpeg",
        fullImage: "/maps/nt_books/ntb_031_acts_11.jpeg",
      },
      {
        id: "nt_books_ntb_032_acts_12",
        title: "Acts 12",
        thumbnail: "/maps/nt_books/ntb_032_acts_12.jpeg",
        fullImage: "/maps/nt_books/ntb_032_acts_12.jpeg",
      },
      {
        id: "nt_books_ntb_033_acts_13",
        title: "Acts 13",
        thumbnail: "/maps/nt_books/ntb_033_acts_13.jpeg",
        fullImage: "/maps/nt_books/ntb_033_acts_13.jpeg",
      },
      {
        id: "nt_books_ntb_034_acts_14",
        title: "Acts 14",
        thumbnail: "/maps/nt_books/ntb_034_acts_14.jpeg",
        fullImage: "/maps/nt_books/ntb_034_acts_14.jpeg",
      },
      {
        id: "nt_books_ntb_035_acts_15",
        title: "Acts 15",
        thumbnail: "/maps/nt_books/ntb_035_acts_15.jpeg",
        fullImage: "/maps/nt_books/ntb_035_acts_15.jpeg",
      },
      {
        id: "nt_books_ntb_036_acts_16am",
        title: "Acts 16Am",
        thumbnail: "/maps/nt_books/ntb_036_acts_16am.jpeg",
        fullImage: "/maps/nt_books/ntb_036_acts_16am.jpeg",
      },
      {
        id: "nt_books_ntb_037_acts_16-18",
        title: "Acts 16 18",
        thumbnail: "/maps/nt_books/ntb_037_acts_16-18.jpeg",
        fullImage: "/maps/nt_books/ntb_037_acts_16-18.jpeg",
      },
      {
        id: "nt_books_ntb_038_acts_18",
        title: "Acts 18",
        thumbnail: "/maps/nt_books/ntb_038_acts_18.jpeg",
        fullImage: "/maps/nt_books/ntb_038_acts_18.jpeg",
      },
      {
        id: "nt_books_ntb_039_acts_19-20",
        title: "Acts 19 20",
        thumbnail: "/maps/nt_books/ntb_039_acts_19-20.jpeg",
        fullImage: "/maps/nt_books/ntb_039_acts_19-20.jpeg",
      },
      {
        id: "nt_books_ntb_040_acts_21",
        title: "Acts 21",
        thumbnail: "/maps/nt_books/ntb_040_acts_21.jpeg",
        fullImage: "/maps/nt_books/ntb_040_acts_21.jpeg",
      },
      {
        id: "nt_books_ntb_041_acts_23",
        title: "Acts 23",
        thumbnail: "/maps/nt_books/ntb_041_acts_23.jpeg",
        fullImage: "/maps/nt_books/ntb_041_acts_23.jpeg",
      },
      {
        id: "nt_books_ntb_042_acts_27",
        title: "Acts 27",
        thumbnail: "/maps/nt_books/ntb_042_acts_27.jpeg",
        fullImage: "/maps/nt_books/ntb_042_acts_27.jpeg",
      },
      {
        id: "nt_books_ntb_043_acts_28",
        title: "Acts 28",
        thumbnail: "/maps/nt_books/ntb_043_acts_28.jpeg",
        fullImage: "/maps/nt_books/ntb_043_acts_28.jpeg",
      },
      {
        id: "nt_books_ntb_044_epistles_overview",
        title: "Epistles Overview",
        thumbnail: "/maps/nt_books/ntb_044_epistles_overview.jpeg",
        fullImage: "/maps/nt_books/ntb_044_epistles_overview.jpeg",
      },
      {
        id: "nt_books_ntb_045_romans",
        title: "Romans",
        thumbnail: "/maps/nt_books/ntb_045_romans.jpeg",
        fullImage: "/maps/nt_books/ntb_045_romans.jpeg",
      },
      {
        id: "nt_books_ntb_046_corinthians",
        title: "Corinthians",
        thumbnail: "/maps/nt_books/ntb_046_corinthians.jpeg",
        fullImage: "/maps/nt_books/ntb_046_corinthians.jpeg",
      },
      {
        id: "nt_books_ntb_047_galatians",
        title: "Galatians",
        thumbnail: "/maps/nt_books/ntb_047_galatians.jpeg",
        fullImage: "/maps/nt_books/ntb_047_galatians.jpeg",
      },
      {
        id: "nt_books_ntb_048_philippians",
        title: "Philippians",
        thumbnail: "/maps/nt_books/ntb_048_philippians.jpeg",
        fullImage: "/maps/nt_books/ntb_048_philippians.jpeg",
      },
      {
        id: "nt_books_ntb_049_colossians",
        title: "Colossians",
        thumbnail: "/maps/nt_books/ntb_049_colossians.jpeg",
        fullImage: "/maps/nt_books/ntb_049_colossians.jpeg",
      },
      {
        id: "nt_books_ntb_050_thessalonians",
        title: "Thessalonians",
        thumbnail: "/maps/nt_books/ntb_050_thessalonians.jpeg",
        fullImage: "/maps/nt_books/ntb_050_thessalonians.jpeg",
      },
      {
        id: "nt_books_ntb_051_timothy",
        title: "Timothy",
        thumbnail: "/maps/nt_books/ntb_051_timothy.jpeg",
        fullImage: "/maps/nt_books/ntb_051_timothy.jpeg",
      },
      {
        id: "nt_books_ntb_052_titus",
        title: "Titus",
        thumbnail: "/maps/nt_books/ntb_052_titus.jpeg",
        fullImage: "/maps/nt_books/ntb_052_titus.jpeg",
      },
      {
        id: "nt_books_ntb_053_peter",
        title: "Peter",
        thumbnail: "/maps/nt_books/ntb_053_peter.jpeg",
        fullImage: "/maps/nt_books/ntb_053_peter.jpeg",
      },
      {
        id: "nt_books_ntb_054_revelation",
        title: "Revelation",
        thumbnail: "/maps/nt_books/ntb_054_revelation.png",
        fullImage: "/maps/nt_books/ntb_054_revelation.png",
      },
    ],
  },
}

const BibleMapsApp = () => {
  const [currentScreen, setCurrentScreen] = useState("home")
  const [currentCategory, setCurrentCategory] = useState(null)
  const [viewMode, setViewMode] = useState("smallList")
  const [currentMapIndex, setCurrentMapIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState(new Set())
  const [activeTab, setActiveTab] = useState("view")
  const [showFavorites, setShowFavorites] = useState(false)
  const [activeMap, setActiveMap] = useState(null)
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false)
  const [showTitlePopup, setShowTitlePopup] = useState(false)
  const [popupTitle, setPopupTitle] = useState("")
  const [isSearchingFromHome, setIsSearchingFromHome] = useState(false)
  const [searchFromContext, setSearchFromContext] = useState(null)
  const [searchFromViewMode, setSearchFromViewMode] = useState("smallList")
  const [favoriteFromContext, setFavoriteFromContext] = useState(null)
  const [favoriteFromViewMode, setFavoriteFromViewMode] = useState("smallList")
  const [isSystemNavVisible, setIsSystemNavVisible] = useState(false)
  const [highlightActiveMap, setHighlightActiveMap] = useState(false)

  // Map viewer states
  const [mapScale, setMapScale] = useState(1)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [showControls, setShowControls] = useState(false)
  const mapRef = useRef(null)
  const touchRef = useRef({ startX: 0, startY: 0, lastScale: 1 })
  const containerRef = useRef(null)

  // Touch handlers for map viewer
  const getTouchDistance = (touches) => {
  const dx = touches[0].clientX - touches[1].clientX
  const dy = touches[0].clientY - touches[1].clientY
  return Math.sqrt(dx * dx + dy * dy)
  }

  const handleTouchStart = (e) => {
    setShowControls(true)
    if (e.touches.length === 1) {
      touchRef.current.startX = e.touches[0].clientX - mapPosition.x
      touchRef.current.startY = e.touches[0].clientY - mapPosition.y
    } else if (e.touches.length === 2) {
      touchRef.current.lastDistance = getTouchDistance(e.touches)
    }
  }
  const handleTouchMove = (e) => {
    e.preventDefault()
    if (e.touches.length === 1) {
      const newX = e.touches[0].clientX - touchRef.current.startX
      const newY = e.touches[0].clientY - touchRef.current.startY
      setMapPosition({ x: newX, y: newY })
    } else if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches)
      const scaleChange = distance / touchRef.current.lastDistance
      const newScale = Math.max(0.5, Math.min(mapScale * scaleChange, 5))
      setMapScale(newScale)
      touchRef.current.lastDistance = distance
    }
  }

  const handleTouchEnd = (e) => {
    // Touch ended
  }
  
  const handleDoubleClick = (e) => {
    if (mapScale > 1) {
      // Reset to fit-to-screen scale
      setMapScale(1)
      setMapPosition({ x: 0, y: 0 })
    } else {
      // Zoom to natural size while keeping center
      const mapImg = mapRef.current
      const container = containerRef.current
      if (mapImg && container) {
        // Wait for image to be fully loaded
        if (mapImg.complete && mapImg.naturalWidth > 0) {
          const containerRect = container.getBoundingClientRect()
          const containerWidth = containerRect.width
          const containerHeight = containerRect.height
        
          // Calculate current displayed size
          const currentDisplayWidth = mapImg.offsetWidth
          const currentDisplayHeight = mapImg.offsetHeight
        
          // Calculate scale to show image at natural size
          const naturalScale = Math.max(
            mapImg.naturalWidth / currentDisplayWidth,
            mapImg.naturalHeight / currentDisplayHeight
          )
        
          setMapScale(naturalScale)
          // Keep centered
          setMapPosition({ x: 0, y: 0 })
        }
      }
    }
  }
  
  const handleLongPress = (title) => {
    setPopupTitle(title)
    setShowTitlePopup(true)
  }

  // Handle system navigation visibility for Capacitor
  useEffect(() => {
    const setupNativeUI = async () => {
      // Only enter immersive / hide body scrolling for the full-screen map viewer
      if (currentScreen === "mapViewer") {
        try {
          // Import StatusBar plugin dynamically
          const { StatusBar } = await import('@capacitor/status-bar')
          await StatusBar.hide()
        } catch (error) {
          console.log('StatusBar plugin not available')
        }

        // Set immersive mode using native Android calls
        if (typeof window !== 'undefined' && window.AndroidFullScreen) {
          try {
            await window.AndroidFullScreen.immersiveMode()
          } catch (error) {
            console.log('AndroidFullScreen not available')
          }
        }

        // CSS fallback: prevent scrolling only in map viewer
        document.body.style.overflow = 'hidden'
        document.documentElement.style.height = '100vh'
        document.body.style.height = '100vh'
      } else {
        try {
          // Show status bar for non-map screens
          const { StatusBar } = await import('@capacitor/status-bar')
          await StatusBar.show()
        } catch (error) {
          console.log('StatusBar plugin not available')
        }

        if (typeof window !== 'undefined' && window.AndroidFullScreen) {
          try {
            await window.AndroidFullScreen.showSystemUI()
          } catch (error) {
            console.log('AndroidFullScreen not available')
          }
        }

        // Restore normal scrolling for all other screens
        document.body.style.overflow = 'auto'
        document.documentElement.style.height = 'auto'
        document.body.style.height = 'auto'
      }
    }

    setupNativeUI()

    return () => {
      // Cleanup on unmount or screen change
      const cleanup = async () => {
        try {
          const { StatusBar } = await import('@capacitor/status-bar')
          await StatusBar.show()
        } catch (error) {
          console.log('StatusBar cleanup error')
        }

        if (typeof window !== 'undefined' && window.AndroidFullScreen) {
          try {
            await window.AndroidFullScreen.showSystemUI()
          } catch (error) {
            console.log('AndroidFullScreen cleanup error')
          }
        }

        document.body.style.overflow = 'auto'
        document.documentElement.style.height = 'auto'
        document.body.style.height = 'auto'
      }
      cleanup()
    }
  }, [currentScreen])

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

  // Handle controls timeout
  useEffect(() => {
    if (showControls && currentScreen === "mapViewer") {
      const timer = setTimeout(() => setShowControls(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showControls, currentScreen])
  
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
    // Define the order of categories
    const categoryOrder = ["OT Bible", "NT Bible", "NT Books"]
    
    return categoryOrder.flatMap(category => 
      mockMapData[category].maps.map((map) => ({ ...map, category }))
    )
  }

  // Helper function to get filtered maps for category screen
  const getFilteredMaps = () => {
    if (showFavorites) {
      return getAllMaps().filter((map) => favorites.has(map.id))
    }
    return currentCategory ? mockMapData[currentCategory].maps : []
  }

  // Splash Screen
  if (currentScreen === "splash") {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <img src="/bible-maps-icon.png" alt="Bible Maps" className="w-24 h-24 mb-4" />
          <h1 className="text-2xl font-bold text-green-800">Bible Maps</h1>
        </div>
      </div>
    )
  }

  // Home Screen
  if (currentScreen === "home") {
    const filteredCategories = searchQuery.trim() 
      ? Object.entries(mockMapData).filter(([category, data]) =>
          category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          data.maps.some(map => map.title.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : Object.entries(mockMapData)

    // Get search results for when searching from home
    let searchResults = getAllMaps()
    if (searchQuery.trim()) {
      searchResults = searchResults.filter((map) => 
        map.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return (
      <div className={`min-h-screen ${isSearchingFromHome ? 'bg-green-50' : 'bg-gray-50'}`}>
        {showTitlePopup && <TitlePopup title={popupTitle} onClose={() => setShowTitlePopup(false)} />}

        {/* Header */}
        <div className={`${isSearchingFromHome ? 'bg-green-100' : 'bg-gray-100'} px-4 py-4`}>
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
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (e.target.value.trim()) {
                    setIsSearchingFromHome(true)
                  } else {
                    setIsSearchingFromHome(false)
                  }
                }}
                onFocus={() => {
                  // Open search screen immediately when focusing on search bar
                  setSearchFromContext("home")
                  setSearchFromViewMode(viewMode)
                  setCurrentScreen("search")
                  setActiveTab("search")
                }}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              onClick={() => {
                setShowFavorites(true)
                setCurrentCategory(null)
                setFavoriteFromContext("home")
                setFavoriteFromViewMode(viewMode)
                setCurrentScreen("favorites")
                setActiveTab("favorites")
              }}
              className="h-10 px-3 bg-gray-100 border border-gray-300 rounded-lg"
            >
              <Star className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>

          {/* Show search results count when searching */}
          {isSearchingFromHome && (
            <div className="mt-4">
              <p className="text-sm text-green-700 opacity-75">{searchResults.length} Results</p>
            </div>
          )}
        </div>

        {/* Content - Show search results when searching, categories otherwise */}
        {isSearchingFromHome ? (
          <div className="px-4 py-4 space-y-6">
            {searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Search className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-center">
                  No maps found matching your search
                </p>
              </div>
            ) : (
              <>
                {/* Map Title List */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="space-y-2">
                    {searchResults.map((map, index) => (
                      <div key={`title-${map.id}`} className="flex">
                        <span className="text-sm text-gray-600 w-8 flex-shrink-0 text-right">{index + 1} :</span>
                        <span className="text-sm text-black truncate ml-2">{map.title}</span>
                        <span className="text-xs text-gray-500 ml-auto">{map.category}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Large Thumbnails */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  {searchResults.map((map, index) => (
                    <div key={map.id} className={index > 0 ? "mt-4" : ""}>
                      <div
                        onClick={() => openMapViewer(map.category, mockMapData[map.category].maps.findIndex(m => m.id === map.id))}
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
                            <div>
                              <p className="text-sm font-medium text-black truncate">{map.title}</p>
                              <p className="text-xs text-gray-500">{map.category}</p>
                            </div>
                            <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full ml-2">#{index + 1}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Category Cards */}
            <div className="px-4 py-6 space-y-4 mb-16">
              {filteredCategories.map(([category, data]) => {
                const Icon = data.icon
                return (
                  <div
                    key={category}
                    onClick={() => {
                      setCurrentCategory(category)
                      setShowFavorites(false)
                      setCurrentScreen("category")
                      setActiveTab("view")
                    }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col items-center mb-4">
                      <Icon className="w-16 h-16 text-blue-600 mb-2" />
                      <h3 className="text-lg font-normal text-blue-600">{category}</h3>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-sm text-green-700 opacity-75">{data.count} maps available</span>
                      <span className="text-sm text-green-700 opacity-75">Explore Maps →</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Dark Band Area */}
            <div className="h-32 bg-green-800 flex flex-col items-center justify-center px-4">
              <div className="flex items-center justify-center mb-2">
                <SimpleBookIcon className="w-6 h-6 text-white mr-2" />
                <h2 className="text-sm font-bold text-white">Bible Maps</h2>
              </div>
              <p className="text-sm text-gray-300 text-center">
                Explore the lands of the Bible with detailed historical maps
              </p>
            </div>
          </>
        )}

        {/* System Navigation Overlay */}
        {isSystemNavVisible && (
          <div className="fixed inset-x-0 bottom-0 h-16 bg-black bg-opacity-50 z-[9999] pointer-events-none">
            {/* This represents the system navigation area */}
          </div>
        )}
      </div>
    )
  }

  // Search Screen
  if (currentScreen === "search") {
    // For search screen, always show all maps when no query is entered
    let searchResults = getAllMaps()
    
    // Apply search filter only if there's a query
    if (searchQuery.trim()) {
      searchResults = searchResults.filter((map) => 
        map.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return (
      <div className="min-h-screen bg-green-50" style={{ paddingBottom: isSystemNavVisible ? '4rem' : '0' }}>
        {showTitlePopup && <TitlePopup title={popupTitle} onClose={() => setShowTitlePopup(false)} />}

        {/* Header */}
        <div className="bg-green-100 px-4 py-4">
          {/* Row 1: Category icon + Title */}
          <div className="flex items-center mb-4">
            <button 
              onClick={() => {
                // Always navigate to home
                setCurrentScreen("home")
                setSearchFromContext(null)
                setIsSearchingFromHome(false)
                setSearchQuery("")
                setActiveTab("view")
              }}
              className="flex items-center justify-center mr-3"
            >
              <LayeredSquaresIcon className="w-6 h-6 text-blue-600" />
            </button>
            <div>
              <div className="flex items-center">
                <Search className="w-4 h-4 text-blue-600 mr-1" />
                <h2 className="text-lg font-bold text-black">Search Maps</h2>
              </div>
              <p className="text-sm text-green-700 opacity-75">{searchResults.length} Results</p>
            </div>
          </div>

          {/* Row 2: Arrow button on left, Search bar center, View Mode Toggle on right */}
          <div className="flex items-center justify-between">
            <div className="w-10">
              {searchFromContext && searchFromContext !== "home" && (
                <button 
                  onClick={() => {
                    // Return to category screen with original view mode
                    setCurrentScreen("category")
                    setViewMode(searchFromViewMode)
                    setSearchFromContext(null)
                    setActiveTab("view")
                  }}
                  className="flex items-center justify-center"
                >
                  <ArrowLeft className="w-6 h-6 text-blue-600" />
                </button>
              )}
            </div>
            <div className="flex-1 mx-4">
              <input
                type="text"
                placeholder="Search maps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                autoFocus
              />
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
        </div>

        {/* Search Results */}
        <div className="px-4 py-4">
          {searchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Search className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-center">
                No maps found matching your search
              </p>
            </div>
          ) : (
            <>
              {viewMode === "grid" && (
                <div className="grid grid-cols-2 gap-4">
                  {searchResults.map((map, index) => (
                    <div
                      key={map.id}
                      onClick={() => openMapViewer(map.category, mockMapData[map.category].maps.findIndex(m => m.id === map.id))}
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
                        <p className="text-xs text-gray-500 mt-1">{map.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {viewMode === "smallList" && (
                <div className="bg-white rounded-lg shadow-sm">
                  {searchResults.map((map, index) => (
                    <div
                      key={map.id}
                      onClick={() => openMapViewer(map.category, mockMapData[map.category].maps.findIndex(m => m.id === map.id))}
                      className="flex items-center p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50"
                    >
                      <img
                        src={map.thumbnail || "/placeholder.svg"}
                        alt={map.title}
                        className="w-16 h-12 object-cover rounded mr-4 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black truncate">{map.title}</p>
                        <p className="text-xs text-gray-500">{map.category}</p>
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
                      {searchResults.map((map, index) => (
                        <div key={`title-${map.id}`} className="flex">
                          <span className="text-sm text-gray-600 w-8 flex-shrink-0 text-right">{index + 1} :</span>
                          <span className="text-sm text-black truncate ml-2">{map.title}</span>
                          <span className="text-xs text-gray-500 ml-auto">{map.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Large Thumbnails */}
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    {searchResults.map((map, index) => (
                      <div key={map.id} className={index > 0 ? "mt-4" : ""}>
                        <div
                          onClick={() => openMapViewer(map.category, mockMapData[map.category].maps.findIndex(m => m.id === map.id))}
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
                              <div>
                                <p className="text-sm font-medium text-black truncate">{map.title}</p>
                                <p className="text-xs text-gray-500">{map.category}</p>
                              </div>
                              <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full ml-2">#{index + 1}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* System Navigation Overlay - overlays any bottom content */}
        {isSystemNavVisible && (
          <div className="fixed inset-x-0 bottom-0 h-16 bg-black bg-opacity-50 z-[9999] pointer-events-none">
            {/* This represents the system navigation area */}
          </div>
        )}
      </div>
    )
  }

  // Favorites Screen
  if (currentScreen === "favorites") {
    const favoritesList = getAllMaps().filter((map) => favorites.has(map.id))
   
    return (
      <div className="min-h-screen bg-gray-50" style={{ paddingBottom: isSystemNavVisible ? '4rem' : '0' }}>
        {showTitlePopup && <TitlePopup title={popupTitle} onClose={() => setShowTitlePopup(false)} />}

        {/* Header */}
        <div className="bg-gray-100 px-4 py-4">
          {/* Row 1: Category icon + Title */}
          <div className="flex items-center mb-4">
            <button 
              onClick={() => {
                // Always navigate to home
                setCurrentScreen("home")
                setFavoriteFromContext(null)
                setActiveTab("view")
              }}
              className="flex items-center justify-center mr-3"
            >
              <LayeredSquaresIcon className="w-6 h-6 text-blue-600" />
            </button>
            <div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-blue-600 mr-1" />
                <h2 className="text-lg font-bold text-black">Favorite Maps</h2>
              </div>
              <p className="text-sm text-green-700 opacity-75">{favoritesList.length} Maps</p>
            </div>
          </div>

          {/* Row 2: Arrow button on left, View Mode Toggle on right */}
          <div className="flex items-center justify-between">
            <div className="w-10">
              {favoriteFromContext && favoriteFromContext !== "home" && (
                <button 
                  onClick={() => {
                    // Return to category screen with original view mode
                    setCurrentScreen("category")
                    setCurrentCategory(favoriteFromContext)
                    setViewMode(favoriteFromViewMode)
                    setFavoriteFromContext(null)
                    setActiveTab("view")
                  }}
                  className="flex items-center justify-center"
                >
                  <ArrowLeft className="w-6 h-6 text-blue-600" />
                </button>
              )}
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
        </div>

        {/* Content */}
        <div className="px-4 py-4 pb-20">
          {favoritesList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Star className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-center">No favorite maps yet</p>
              <p className="text-gray-400 text-center text-sm mt-2">
                Tap the star icon on any map to add it to your favorites
              </p>
            </div>
          ) : (
            <>
              {viewMode === "grid" && (
                <div className="grid grid-cols-2 gap-4">
                  {favoritesList.map((map, index) => (
                    <div
                      key={map.id}
                      onClick={() => openMapViewer(map.category, mockMapData[map.category].maps.findIndex(m => m.id === map.id))}
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
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        </button>
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-black line-clamp-2">{map.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{map.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {viewMode === "smallList" && (
                <div className="bg-white rounded-lg shadow-sm">
                  {favoritesList.map((map, index) => (
                    <div
                      key={map.id}
                      onClick={() => openMapViewer(map.category, mockMapData[map.category].maps.findIndex(m => m.id === map.id))}
                      className="flex items-center p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50"
                    >
                      <img
                        src={map.thumbnail || "/placeholder.svg"}
                        alt={map.title}
                        className="w-16 h-12 object-cover rounded mr-4 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black truncate">{map.title}</p>
                        <p className="text-xs text-gray-500">{map.category}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(map.id)
                        }}
                        className="ml-2 flex-shrink-0"
                      >
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
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
                      {favoritesList.map((map, index) => (
                        <div key={`title-${map.id}`} className="flex">
                          <span className="text-sm text-gray-600 w-8 flex-shrink-0 text-right">{index + 1} :</span>
                          <span className="text-sm text-black truncate ml-2">{map.title}</span>
                          <span className="text-xs text-gray-500 ml-auto">{map.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Large Thumbnails */}
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    {favoritesList.map((map, index) => (
                      <div key={map.id} className={index > 0 ? "mt-4" : ""}>
                        <div
                          onClick={() => openMapViewer(map.category, mockMapData[map.category].maps.findIndex(m => m.id === map.id))}
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
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            </button>
                          </div>
                          <div className="p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium text-black truncate">{map.title}</p>
                                <p className="text-xs text-gray-500">{map.category}</p>
                              </div>
                              <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full ml-2">#{index + 1}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* System Navigation Overlay */}
        {isSystemNavVisible && (
          <div className="fixed inset-x-0 bottom-0 h-16 bg-black bg-opacity-50 z-[9999] pointer-events-none">
            {/* This represents the system navigation area */}
          </div>
        )}
      </div>
    )
  }

  // Category Screen
  if (currentScreen === "category") {
    const maps = getFilteredMaps()
    const displayTitle = showFavorites ? "Favorites" : currentCategory
    const Icon = showFavorites ? Star : mockMapData[currentCategory]?.icon || BookIcon

    return (
      <div className="flex flex-col h-full bg-gray-50" style={{ paddingBottom: isSystemNavVisible ? '4rem' : '0' }}>
        {showTitlePopup && <TitlePopup title={popupTitle} onClose={() => setShowTitlePopup(false)} />}

        {/* Header */}
        <div className="bg-gray-100 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => setCurrentScreen("home")} className="mr-3">
              <LayeredSquaresIcon className="w-6 h-6 text-blue-600" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-black">{displayTitle}</h2>
              <p className="text-sm text-green-700 opacity-75">{maps.length} Maps</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
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
        </div>

        {/* Content */}
        <div className="px-4 py-4 pb-20">       
          {viewMode === "grid" && (
            <div className="grid grid-cols-2 gap-4">
              {maps.map((map, index) => {
                const isActiveMap = activeMap && map.id === activeMap.id
                const shouldHighlight = highlightActiveMap && isActiveMap
                return (
                  <div
                    key={map.id}
                    onClick={() => openMapViewer(map.category || currentCategory, mockMapData[map.category || currentCategory].maps.findIndex(m => m.id === map.id))}
                    className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 ${
                      shouldHighlight ? 'ring-4 ring-blue-500 ring-opacity-75 shadow-lg scale-105' : ''
                    }`}
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
                )
              })}
            </div>
          )}

          {viewMode === "smallList" && (
            <div className="bg-white rounded-lg shadow-sm">
              {maps.map((map, index) => {
                const isActiveMap = activeMap && map.id === activeMap.id
                const shouldHighlight = highlightActiveMap && isActiveMap
                return (
                  <div
                    key={map.id}
                    onClick={() => openMapViewer(map.category || currentCategory, mockMapData[map.category || currentCategory].maps.findIndex(m => m.id === map.id))}
                    className={`flex items-center p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-all duration-300 ${
                      shouldHighlight ? 'bg-blue-50 ring-2 ring-blue-500 ring-inset' : ''
                    }`}
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
                )
              })}
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
                {maps.map((map, index) => {
                  const isActiveMap = activeMap && map.id === activeMap.id
                  const shouldHighlight = highlightActiveMap && isActiveMap
                  return (
                    <div key={map.id} className={index > 0 ? "mt-4" : ""}>
                      <div
                        onClick={() => openMapViewer(map.category || currentCategory, mockMapData[map.category || currentCategory].maps.findIndex(m => m.id === map.id))}
                        className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:opacity-90 transition-all duration-300 ${
                          shouldHighlight ? 'ring-4 ring-blue-500 ring-opacity-75 shadow-lg' : ''
                        }`}
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
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <BottomBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab)
            if (tab === "search") {
              setSearchFromContext(currentCategory)
              setSearchFromViewMode(viewMode)
              setCurrentScreen("search")
            } else if (tab === "favorites") {
              setFavoriteFromContext(currentCategory)
              setFavoriteFromViewMode(viewMode)
              setCurrentScreen("favorites")
            }
          }}
        />

        {/* System Navigation Overlay - overlays bottom bar when visible */}
        {isSystemNavVisible && (
          <div className="fixed inset-x-0 bottom-0 h-16 bg-black bg-opacity-50 z-[9999] pointer-events-none">
            {/* This represents the system navigation area */}
          </div>
        )}
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
        style={{ 
          touchAction: "none",
          paddingBottom: isSystemNavVisible ? '4rem' : '0'
        }}
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
              setMapScale(1)
              setMapPosition({ x: 0, y: 0 })
            }}
          />
        </div>

        {/* Controls Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
        >

        {/* Top Controls Row */}
        <div className="absolute top-4 left-4 flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => {
              setHighlightActiveMap(true)
              setCurrentScreen("category")
              setShowControls(false)
              // Clear highlight after 2 seconds
              setTimeout(() => setHighlightActiveMap(false), 2000)
            }}
            className="p-2 bg-white bg-opacity-90 rounded-lg pointer-events-auto shadow-sm text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <p 
            className="text-gray-800 text-xs bg-white bg-opacity-90 px-2 py-1 rounded shadow-sm max-w-xs truncate cursor-pointer"
            onClick={() => handleLongPress(activeMap.title)}
          >
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
                setMapScale(1)
                setMapPosition({ x: 0, y: 0 })
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
                setMapScale(1)
                setMapPosition({ x: 0, y: 0 })
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

        {/* System Navigation Overlay */}
        {isSystemNavVisible && (
          <div className="fixed inset-x-0 bottom-0 h-16 bg-black bg-opacity-50 z-[9999] pointer-events-none">
            {/* This represents the system navigation area */}
          </div>
        )}
      </div>
    )
  }

  return null
}

export default BibleMapsApp