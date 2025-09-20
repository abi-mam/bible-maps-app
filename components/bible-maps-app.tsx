"use client"

import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import React, { useState, useEffect, useRef } from "react"
import { Search, Star, Grid3X3, List, ChevronLeft, ChevronRight, ArrowLeft, Home } from "lucide-react"

// ---------------- BOTTOM BAR ----------------
const BottomBar = ({ activeTab, onTabChange }) => {
  return (
    <div
      className="fixed inset-x-0 bottom-0 h-14 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 flex items-center justify-around pb-[env(safe-area-inset-bottom)]"
    >
      <button
        onClick={() => onTabChange("search")}
        className={`flex flex-col items-center ${activeTab === "search" ? "text-indigo-600" : "text-slate-600"}`}>
        <Search className="h-5 w-5" />
        <span className="text-xs">Search</span>
      </button>
      <button
        onClick={() => onTabChange("favorites")}
        className={`flex flex-col items-center ${activeTab === "favorites" ? "text-indigo-600" : "text-slate-600"}`}>
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
  
const TitlePopup = ({ title, onClose }) => (
  <div className="fixed inset-0 bg-slate-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
    <div className="bg-white rounded-xl shadow-2xl p-6 m-4 max-w-sm border border-slate-200">
      <p className="text-sm font-medium text-slate-800">{title}</p>
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
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
      <rect x="20" y="25" width="64" height="78" fill="#4f46e5" rx="4" ry="4" />
      {/* Left wooden rod */}
      <rect x="12" y="16" width="12" height="96" fill="#6366f1" rx="6" ry="6" />
      <rect x="14" y="18" width="8" height="92" fill="#8b5cf6" rx="4" ry="4" />
      {/* Right wooden rod */}
      <rect x="80" y="16" width="12" height="96" fill="#6366f1" rx="6" ry="6" />
      <rect x="82" y="18" width="8" height="92" fill="#8b5cf6" rx="4" ry="4" />
      {/* Text lines on scroll */}
      <line x1="28" y1="40" x2="76" y2="40" stroke="#f8fafc" strokeWidth="2" />
      <line x1="28" y1="50" x2="74" y2="50" stroke="#f8fafc" strokeWidth="2" />
      <line x1="28" y1="60" x2="76" y2="60" stroke="#f8fafc" strokeWidth="2" />
      <line x1="28" y1="70" x2="72" y2="70" stroke="#f8fafc" strokeWidth="2" />
      <line x1="28" y1="80" x2="76" y2="80" stroke="#f8fafc" strokeWidth="2" />
      <line x1="28" y1="90" x2="74" y2="90" stroke="#f8fafc" strokeWidth="2" />
    </svg>
  </div>
)

const CrossIcon = ({ className }) => (
  <div className={className}>
    <svg width="100%" height="100%" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      {/* Vertical beam */}
      <rect x="54" y="16" width="20" height="96" fill="#059669" rx="2" ry="2" />
      {/* Horizontal beam */}
      <rect x="32" y="38" width="64" height="20" fill="#10b981" rx="2" ry="2" />
      {/* Shadow/depth on vertical */}
      <rect x="56" y="18" width="16" height="92" fill="#34d399" rx="1" ry="1" />
      {/* Shadow/depth on horizontal */}
      <rect x="34" y="40" width="60" height="16" fill="#059669" rx="1" ry="1" />
      {/* Highlight on vertical */}
      <rect x="58" y="20" width="4" height="88" fill="#f0fdf4" rx="2" ry="2" />
      {/* Highlight on horizontal */}
      <rect x="36" y="42" width="56" height="4" fill="#f0fdf4" rx="2" ry="2" />
    </svg>
  </div>
)

const BookIcon = ({ className }) => (
  <div className={className}>
    <svg width="100%" height="100%" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      {/* Left page with curved binding */}
      <path d="M16 24c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v72c0 4.4-3.6 8-8 8H24c-4.4 0-8-3.6-8-8V24z" fill="#dc2626" />
      <path d="M20 28c0-2.2 1.8-4 4-4h28c2.2 0 4 1.8 4 4v64c0 2.2-1.8 4-4 4H24c-2.2 0-4-1.8-4-4V28z" fill="#ef4444" />
      {/* Right page with curved binding */}
      <path d="M64 24c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v72c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8V24z" fill="#dc2626" />
      <path d="M68 28c0-2.2 1.8-4 4-4h28c2.2 0 4 1.8 4 4v64c0 2.2-1.8 4-4 4H72c-2.2 0-4-1.8-4-4V28z" fill="#ef4444" />

      {/* Curved V-shape binding in center */}
      <path
        d="M56 18 Q62 24 62 32 Q62 40 62 48 Q62 56 62 64 Q62 72 62 80 Q62 88 62 96 Q62 102 68 106"
        fill="none"
        stroke="#fef2f2"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M56 18 Q62 24 62 32 Q62 40 62 48 Q62 56 62 64 Q62 72 62 80 Q62 88 62 96 Q62 102 68 106"
        fill="none"
        stroke="#fef2f2"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Shadow on the curved binding */}
      <path
        d="M58 20 Q62 26 62 34 Q62 42 62 50 Q62 58 62 66 Q62 74 62 82 Q62 90 62 98 Q62 102 66 104"
        fill="none"
        stroke="#fef2f2"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      />

      {/* Text lines left page */}
      <line x1="26" y1="36" x2="50" y2="36" stroke="#fef2f2" strokeWidth="1" />
      <line x1="26" y1="42" x2="48" y2="42" stroke="#fef2f2" strokeWidth="1" />
      <line x1="26" y1="48" x2="50" y2="48" stroke="#fef2f2" strokeWidth="1" />
      <line x1="26" y1="54" x2="46" y2="54" stroke="#fef2f2" strokeWidth="1" />
      <line x1="26" y1="60" x2="50" y2="60" stroke="#fef2f2" strokeWidth="1" />
      {/* Text lines right page */}
      <line x1="74" y1="36" x2="98" y2="36" stroke="#fef2f2" strokeWidth="1" />
      <line x1="74" y1="42" x2="96" y2="42" stroke="#fef2f2" strokeWidth="1" />
      <line x1="74" y1="48" x2="98" y2="48" stroke="#fef2f2" strokeWidth="1" />
      <line x1="74" y1="54" x2="94" y2="54" stroke="#fef2f2" strokeWidth="1" />
      <line x1="74" y1="60" x2="98" y2="60" stroke="#fef2f2" strokeWidth="1" />
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
  const [showControls, setShowControls] = useState(false);
  const [isAtFitToPage, setIsAtFitToPage] = useState(true);
  const [mapViewerTheme, setMapViewerTheme] = useState("light")

  const handleLongPress = (title) => {
    setPopupTitle(title)
    setShowTitlePopup(true)
  }

  // Simple screen change logging - no system manipulation
  useEffect(() => {
    console.log('Screen changed to:', currentScreen)
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
      const timer = setTimeout(() => setShowControls(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [showControls, currentScreen])// System's back button handler:
  useEffect(() => {
    const handleBackButton = () => {
      if (currentScreen === "home") {
        // Exit the app when on home screen
        // For Capacitor: App.exitApp()
        // For web testing: do nothing (let browser handle it)
        return
      } else if (currentScreen === "mapViewer") {
        setHighlightActiveMap(true)
        setCurrentScreen("category")
        setTimeout(() => setHighlightActiveMap(false), 2000)
      } else if (currentScreen === "category") {
        setCurrentScreen("home")
        setActiveTab("view")
      } else if (currentScreen === "search") {
        if (searchFromContext && searchFromContext !== "home") {
          setCurrentScreen("category")
          setViewMode(searchFromViewMode)
        } else {
          setCurrentScreen("home")
        }
        setSearchFromContext(null)
        setActiveTab("view")
      } else if (currentScreen === "favorites") {
        if (favoriteFromContext && favoriteFromContext !== "home") {
          setCurrentScreen("category")
          setViewMode(favoriteFromViewMode)
        } else {
          setCurrentScreen("home")
        }
        setFavoriteFromContext(null)
        setActiveTab("view")
      }
    }

    const handlePopState = (event) => {
      if (currentScreen === "home") {
        return
      }
      event.preventDefault()
      window.history.pushState(null, null, window.location.pathname)
      handleBackButton()
    }
    
    window.history.pushState(null, null, window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [currentScreen, searchFromContext, favoriteFromContext, searchFromViewMode, favoriteFromViewMode])

  
  // Make status bar transparent and request fullscreen when entering map viewer
  useEffect(() => {
    if (currentScreen === "mapViewer") {
      StatusBar.setOverlaysWebView({ overlay: true });
      StatusBar.setBackgroundColor({ color: '#00000000' }); // Transparent
      StatusBar.setStyle({ style: 'DARK' }); // Adjust based on your map content
      
      // Request fullscreen for immersive experience
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {
          // Fullscreen not supported or denied
        });
      }
    }
    
    return () => {
      // Always restore normal status bar when leaving map viewer
      StatusBar.setOverlaysWebView({ overlay: false });
      StatusBar.setBackgroundColor({ color: '#4a7c59' }); // Your app's green
      StatusBar.setStyle({ style: 'LIGHT' });
      
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {
          // Already exited or not supported
        });
      }
    }
  }, [currentScreen])
  

  // ... rest of your component code (toggleFavorite, openMapViewer, etc.) ...
  
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
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <img src="/bible-maps-icon.png" alt="Bible Maps" className="w-24 h-24 mb-4" />
          <h1 className="text-2xl font-bold text-slate-800">Bible Maps</h1>
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
    <div className={`min-h-screen transition-all duration-300 ${isSearchingFromHome ? 'bg-stone-50' : 'bg-gradient-to-br from-slate-50 via-stone-50 to-slate-100'}`}>
      {showTitlePopup && <TitlePopup title={popupTitle} onClose={() => setShowTitlePopup(false)} />}

      {/* Header */}
      <div className={`transition-all duration-300 ${isSearchingFromHome ? 'bg-stone-100' : 'bg-gradient-to-r from-slate-100 to-stone-100'} px-5 py-6 shadow-sm`}>
        <div className="flex items-center justify-center mb-6">
          <div className="p-2 bg-gradient-to-br from-stone-600 to-stone-700 rounded-lg mr-3 shadow-md">
            <SimpleBookIcon className="w-6 h-6 brightness-0 invert opacity-95" />
          </div>
          <h1 className="text-xl font-semibold text-stone-800 tracking-tight">Bible Maps</h1>
        </div>

        {/* Search and Favorites Row */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="relative">
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
                  setSearchFromContext("home")
                  setSearchFromViewMode(viewMode)
                  setCurrentScreen("search")
                  setActiveTab("search")
                }}
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 shadow-sm text-sm placeholder-stone-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
            </div>
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
            className="p-2.5 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 hover:shadow-md transition-all duration-200 shadow-sm"
          >
            <Star className="w-5 h-5 text-stone-600" />
          </button>
        </div>

        {/* Show search results count when searching */}
        {isSearchingFromHome && (
          <div className="mt-4">
            <div className="bg-white/90 rounded-lg px-3 py-1.5 mx-auto w-fit shadow-sm border border-stone-200">
              <p className="text-xs text-stone-600 font-medium text-center">{searchResults.length} Maps Found</p>
            </div>
          </div>
        )}
      </div>

      {/* Content - Show search results when searching, categories otherwise */}
      {isSearchingFromHome ? (
        <div className="px-5 py-5 space-y-5">
          {searchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="p-4 bg-white/60 rounded-xl shadow-sm mb-4 border border-stone-200">
                <Search className="w-12 h-12 text-stone-400" />
              </div>
              <p className="text-stone-600 text-center font-medium">
                No maps found matching your search
              </p>
            </div>
          ) : (
            <>
              {/* Map Title List */}
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                <h3 className="text-base font-semibold text-stone-800 mb-4">Search Results</h3>
                <div className="space-y-2">
                  {searchResults.map((map, index) => (
                    <div key={`title-${map.id}`} className="flex items-center p-2 rounded-lg hover:bg-stone-50 transition-colors">
                      <span className="text-xs text-stone-500 w-6 h-6 flex-shrink-0 font-medium bg-stone-100 rounded-full flex items-center justify-center">{index + 1}</span>
                      <span className="text-sm text-stone-700 truncate ml-3 font-medium flex-1">{map.title}</span>
                      <span className="text-xs text-stone-500 ml-2 bg-stone-100 px-2 py-1 rounded-md font-medium">{map.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Large Thumbnails */}
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                <h3 className="text-base font-semibold text-stone-800 mb-4">Map Previews</h3>
                <div className="space-y-4">
                  {searchResults.map((map, index) => (
                    <div key={map.id}>
                      <div
                        onClick={() => openMapViewer(map.category, mockMapData[map.category].maps.findIndex(m => m.id === map.id))}
                        className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={map.thumbnail || "/placeholder.svg"}
                            alt={map.title}
                            className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
                            style={{ maxHeight: "none" }}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(map.id)
                            }}
                            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-all duration-200"
                          >
                            <Star
                              className={`w-4 h-4 transition-colors ${favorites.has(map.id) ? "text-amber-500 fill-current" : "text-stone-400"}`}
                            />
                          </button>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-stone-800 truncate mb-1">{map.title}</p>
                              <p className="text-xs text-stone-500 font-medium">{map.category}</p>
                            </div>
                            <div className="bg-stone-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full ml-3">#{index + 1}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Category Cards */}
          <div className="px-5 py-6 space-y-4 mb-16">
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
                  className="bg-white rounded-xl p-5 shadow-sm border border-stone-200 cursor-pointer hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 hover:scale-[1.01] group active:scale-[0.98]"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2.5 bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg mr-4 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                      <Icon className="w-8 h-8 transition-transform duration-200 group-hover:scale-105" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-stone-800 group-hover:text-stone-900 transition-colors">{category}</h3>
                      <p className="text-sm text-stone-500 font-medium">{data.count} maps available</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-xs text-stone-600 font-semibold group-hover:text-stone-700 transition-colors flex items-center">
                      Explore Maps 
                      <svg className="w-3 h-3 ml-1.5 transition-transform group-hover:translate-x-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer Section */}
          <div className="bg-gradient-to-r from-stone-700 to-stone-800 flex flex-col items-center justify-center px-6 py-12 shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <div className="p-2 bg-white/10 rounded-lg mr-3 shadow-sm">
                <div className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(98%) sepia(4%) saturate(339%) hue-rotate(202deg) brightness(106%) contrast(96%)' }}>
                  <img src="/open-book-icon.png" alt="Open Book" className="w-full h-full" />
                </div>
              </div>
              <h2 className="text-lg font-semibold text-white">Bible Maps</h2>
            </div>
            <p className="text-stone-300 text-center max-w-md leading-relaxed text-sm mb-6">
              Explore historical biblical maps and uncover the geography of ancient times
            </p>
            <div className="h-0.5 w-16 bg-gradient-to-r from-stone-400 to-stone-500 rounded-full mb-6"></div>

            {/* Copyright */}
            <div className="text-center border-t border-stone-600 pt-6 w-full max-w-sm">
              <p className="text-stone-400 text-xs">
                © 2025 Bible Maps. All rights reserved.
              </p>
              <p className="text-stone-500 text-xs mt-1">
                Educational use for biblical geography study
              </p>
            </div>
          </div>

          {/* System Navigation Bar Color Pad - only visible portion */}
          <div className="h-6 w-full" style={{ backgroundColor: '#f0f1f2' }}></div>
        </>
      )}

      {/* Bottom Bar - Covers system navigation area on home screen only */}
      <div className="fixed bottom-0 left-0 right-0 h-14 shadow-sm border-t border-stone-200" style={{ backgroundColor: '#f0f1f2' }}></div>
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
             <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
              <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
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
             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
      <div className="px-4 py-4">
        {viewMode === "grid" && (
          <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 mx-4">
            {maps.map((map) => {
              const isActiveMap = activeMap && map.id === activeMap.id
              const shouldHighlight = highlightActiveMap && isActiveMap
              return (
                <div
                  key={map.id}
                  onClick={() =>
                    openMapViewer(
                      map.category || currentCategory,
                      mockMapData[map.category || currentCategory].maps.findIndex((m) => m.id === map.id)
                    )
                  }
                  className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 ${
                    shouldHighlight ? "ring-4 ring-blue-500 ring-opacity-75 shadow-lg scale-105" : ""
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {maps.map((map) => {
              const isActiveMap = activeMap && map.id === activeMap.id
              const shouldHighlight = highlightActiveMap && isActiveMap
              return (
                <div
                  key={map.id}
                  onClick={() =>
                    openMapViewer(
                      map.category || currentCategory,
                      mockMapData[map.category || currentCategory].maps.findIndex((m) => m.id === map.id)
                    )
                  }
                  className={`flex items-center p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-all duration-300 ${
                    shouldHighlight ? "bg-blue-50 ring-2 ring-blue-500 ring-inset" : ""
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              {maps.map((map, index) => {
                const isActiveMap = activeMap && map.id === activeMap.id
                const shouldHighlight = highlightActiveMap && isActiveMap
                return (
                  <div key={map.id} className={index > 0 ? "mt-4" : ""}>
                    <div
                      onClick={() =>
                        openMapViewer(
                          map.category || currentCategory,
                          mockMapData[map.category || currentCategory].maps.findIndex((m) => m.id === map.id)
                        )
                      }
                      className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:opacity-90 transition-all duration-300 ${
                        shouldHighlight ? "ring-4 ring-blue-500 ring-opacity-75 shadow-lg" : ""
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

      {/* Bottom Bar */}
      <div className="flex items-center h-14 shadow-sm" style={{ backgroundColor: '#f0f1f2' }}>

        {/* Search Button - Center aligned with thumbnail center (48px from left) */}
        <button
          onClick={() => {
            setActiveTab("search")
            setSearchFromContext(currentCategory)
            setSearchFromViewMode(viewMode)
            setCurrentScreen("search")
          }}
          className="flex flex-col items-center w-16"
          style={{ marginLeft: '32px' }}
        >
          <Search className="h-4 w-4" />
          <span className={`text-xs mt-1 ${activeTab === "search" ? "text-indigo-600" : "text-gray-400"}`}>
            Search
          </span>
        </button>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Favorites Button - Mirrored positioning from right edge */}
        <button
          onClick={() => {
            setActiveTab("favorites")
            setFavoriteFromContext(currentCategory)
            setFavoriteFromViewMode(viewMode)
            setCurrentScreen("favorites")
          }}
          className="flex flex-col items-center w-16"
          style={{ marginRight: '32px' }}
        >
          <Star className="h-4 w-4" />
          <span className={`text-xs mt-1 ${activeTab === "favorites" ? "text-indigo-600" : "text-gray-400"}`}>
            Favorites
          </span>
        </button>

      </div>
    </div>
  )
}

// Map Viewer
if (currentScreen === "mapViewer" && activeMap) {
  return (
    <div className={`fixed inset-0 ${mapViewerTheme === "light" ? "bg-slate-50" : "bg-black"}`}>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={3}
        limitToBounds={true}
        onTransformed={(ref, state) => {
          if (state && typeof state.scale === 'number') {
            setIsAtFitToPage(state.scale <= 1.1)
            setIsSystemNavVisible(state.scale > 1.2)
          }
          setShowControls(true)
        }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent>
              <div style={{ 
                width: '100vw', 
                height: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <img
                  src={activeMap.fullImage || "/placeholder.svg"}
                  alt={activeMap.title}
                  onClick={() => setShowControls(true)}
                  onError={(e) => { e.target.src = "/placeholder.svg" }}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </div>
            </TransformComponent>

            {/* Controls Overlay */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
              showControls ? "opacity-100" : "opacity-20"
            }`}>
              
              {/* Top Left Controls */}
              <div className="absolute top-4 left-4 flex flex-col gap-3 pointer-events-auto">
                <button
                  onClick={() => {
                    setHighlightActiveMap(true)
                    setCurrentScreen("category")
                    setTimeout(() => setHighlightActiveMap(false), 2000)
                  }}
                  className={`p-1.5 backdrop-blur-sm rounded-lg shadow-lg w-fit ${
                    mapViewerTheme === "light" 
                      ? "bg-white/90 text-gray-800 hover:bg-white" 
                      : "bg-black/70 text-white hover:bg-black/80"
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div 
                  onClick={() => handleLongPress(activeMap.title)}
                  className={`text-sm backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg cursor-pointer ${
                    mapViewerTheme === "light" 
                      ? "bg-white/90 text-gray-800 hover:bg-white" 
                      : "bg-black/70 text-white hover:bg-black/80"
                  }`}
                >
                  <p className="truncate font-medium">{activeMap.title}</p>
                </div>
              </div>

              {/* Top Right Controls */}
              <div className="absolute top-4 right-4 flex items-center gap-3 pointer-events-auto">
                {/* Theme Toggle */}
                <button
                  onClick={() => setMapViewerTheme(mapViewerTheme === "light" ? "dark" : "light")}
                  className={`p-1.5 backdrop-blur-sm rounded-lg shadow-lg ${
                    mapViewerTheme === "light" 
                      ? "bg-white/90 text-gray-800 hover:bg-white" 
                      : "bg-black/70 text-white hover:bg-black/80"
                  }`}
                >
                  {mapViewerTheme === "light" ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(activeMap.id)}
                  className={`p-1.5 backdrop-blur-sm rounded-lg shadow-lg ${
                    mapViewerTheme === "light" 
                      ? "bg-white/90 hover:bg-white" 
                      : "bg-black/70 hover:bg-black/80"
                  }`}
                >
                  <Star className={`w-5 h-5 ${favorites.has(activeMap.id) ? "text-yellow-500 fill-current" : mapViewerTheme === "light" ? "text-gray-600" : "text-white"}`} />
                </button>
              </div>

             {/* Navigation Arrows */}
              {currentMapIndex > 0 && (
                <button
                  onClick={() => {
                    const newIndex = currentMapIndex - 1
                    setCurrentMapIndex(newIndex)
                    setActiveMap(mockMapData[currentCategory].maps[newIndex])
                    setShowControls(true)
                  }}
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-1.5 backdrop-blur-sm rounded-lg shadow-lg pointer-events-auto ${
                    mapViewerTheme === "light" 
                      ? "bg-white/90 text-gray-800 hover:bg-white" 
                      : "bg-black/70 text-white hover:bg-black/80"
                  }`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {currentMapIndex < mockMapData[currentCategory].maps.length - 1 && (
                <button
                  onClick={() => {
                    const newIndex = currentMapIndex + 1
                    setCurrentMapIndex(newIndex)
                    setActiveMap(mockMapData[currentCategory].maps[newIndex])
                    setShowControls(true)
                  }}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 backdrop-blur-sm rounded-lg shadow-lg pointer-events-auto ${
                    mapViewerTheme === "light" 
                      ? "bg-white/90 text-gray-800 hover:bg-white" 
                      : "bg-black/70 text-white hover:bg-black/80"
                  }`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Home Button */}
              <button
                onClick={() => setCurrentScreen("home")}
                className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 p-2 backdrop-blur-sm rounded-lg shadow-lg pointer-events-auto ${
                  mapViewerTheme === "light" 
                    ? "bg-white/90 text-gray-800 hover:bg-white" 
                    : "bg-black/70 text-white hover:bg-black/80"
                }`}
              >
                <Home className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  )
}

  // [Keep all your other screen conditions: home, search, favorites, category...]

  return null
}

export default BibleMapsApp