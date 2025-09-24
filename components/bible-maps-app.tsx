"use client"

import { setOpaqueStatusBar, setTransparentStatusBar } from '../helpers/statusBarHelper';
import { App as CapacitorApp } from '@capacitor/app';
import React, { useState, useEffect, useRef } from "react"
import { StatusBar, Style } from '@capacitor/status-bar';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Search, Star, Grid3X3, List, ChevronLeft, ChevronRight, ArrowLeft, Home } from "lucide-react"

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
  const currentScreenRef = useRef(currentScreen);
  const searchFromContextRef = useRef(searchFromContext);
  const favoriteFromContextRef = useRef(favoriteFromContext);
  const searchFromViewModeRef = useRef(searchFromViewMode);
  const favoriteFromViewModeRef = useRef(favoriteFromViewMode);
  
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

useEffect(() => {
  if (currentScreen === "mapViewer") {
    setTransparentStatusBar();
  } else {
    setOpaqueStatusBar();
  }
}, [currentScreen, mapViewerTheme]);

  // Controls auto-hide
  useEffect(() => {
    if (showControls && currentScreen === "mapViewer") {
      const timer = setTimeout(() => setShowControls(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [showControls, currentScreen])

 // Update refs when values change
  useEffect(() => {
    currentScreenRef.current = currentScreen;
  }, [currentScreen]);

  useEffect(() => {
    searchFromContextRef.current = searchFromContext;
  }, [searchFromContext]);

  // Sync isSearchingFromHome with searchQuery state
  useEffect(() => {
    if (currentScreen === "home") {
      setIsSearchingFromHome(searchQuery.trim() !== "");
    }
  }, [searchQuery, currentScreen]);

  useEffect(() => {
    favoriteFromContextRef.current = favoriteFromContext;
  }, [favoriteFromContext]);

  useEffect(() => {
    searchFromViewModeRef.current = searchFromViewMode;
  }, [searchFromViewMode]);

  useEffect(() => {
    favoriteFromViewModeRef.current = favoriteFromViewMode;
  }, [favoriteFromViewMode]);


// System's back button handler for Android Capacitor
useEffect(() => {
  let backButtonListener = null;

  const setupBackButtonListener = async () => {
    try {
      console.log('Setting up back button listener...');
      backButtonListener = await CapacitorApp.addListener('backButton', (event) => {
        console.log('Back button pressed, current screen:', currentScreenRef.current);
        console.log('Event data:', event);

        if (currentScreenRef.current === "home") {
          console.log('Exiting app...');
          CapacitorApp.exitApp();
        } else if (currentScreenRef.current === "mapViewer") {
          console.log('Navigating from mapViewer to category');
          setHighlightActiveMap(true);
          setCurrentScreen("category");
          setTimeout(() => setHighlightActiveMap(false), 2000);
        } else if (currentScreenRef.current === "category") {
          console.log('Navigating from category to home');
          setCurrentScreen("home");
          setActiveTab("view");
        } else if (currentScreenRef.current === "search") {
          console.log('Navigating from search, context:', searchFromContextRef.current);
          if (searchFromContextRef.current && searchFromContextRef.current !== "home") {
            setCurrentScreen("category");
            setViewMode(searchFromViewModeRef.current);
          } else {
            setCurrentScreen("home");
          }
          setSearchFromContext(null);
          setActiveTab("view");
        } else if (currentScreenRef.current === "favorites") {
          console.log('Navigating from favorites, context:', favoriteFromContextRef.current);
          if (favoriteFromContextRef.current && favoriteFromContextRef.current !== "home") {
            setCurrentScreen("category");
            setViewMode(favoriteFromViewModeRef.current);
          } else {
            setCurrentScreen("home");
          }
          setFavoriteFromContext(null);
          setActiveTab("view");
        }
      });
      console.log('Back button listener registered:', backButtonListener);
    } catch (error) {
      console.error('Error setting up back button listener:', error);
    }
  };

  setupBackButtonListener();

  return () => {
    console.log('Cleaning up back button listener:', backButtonListener);
    if (backButtonListener) {
      backButtonListener.remove();
    }
  };
}, []);
  
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
    <div className={`h-screen flex flex-col transition-all duration-300 ${isSearchingFromHome ? 'bg-stone-50' : 'bg-gradient-to-br from-slate-50 via-stone-50 to-slate-100'}`}>
      {showTitlePopup && <TitlePopup title={popupTitle} onClose={() => setShowTitlePopup(false)} />}
  
      {/* Status Bar Pad - Fixed */}
      <div className="bg-lime-800 w-full py-4 flex-shrink-0"></div>
      
      {/* Header - Fixed */}
      <div className={`transition-all duration-300 ${isSearchingFromHome ? 'bg-stone-100' : 'bg-gradient-to-r from-slate-100 to-stone-100'} px-5 py-6 shadow-sm flex-shrink-0`}>
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
            <Star className="w-4 h-4 text-stone-600" />
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

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
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
          </>
        )}
      </div>
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
    <div className="h-screen flex flex-col bg-gray-50">
      {showTitlePopup && <TitlePopup title={popupTitle} onClose={() => setShowTitlePopup(false)} />}

      {/* Status Bar Pad - Fixed */}
      <div className="bg-lime-800 w-full py-4 flex-shrink-0"></div>

      {/* Header - Fixed */}
      <div className="bg-gray-100 px-4 py-4 flex-shrink-0">
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
          <div className="flex-1 mr-4">
            <input
              type="text"
              placeholder="Search maps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
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

      {/* Search Results - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
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
                {/* Map Titles */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="space-y-2">
                    {searchResults.map((map, index) => (
                      <div key={`title-${map.id}`} className="flex items-start gap-2 pr-4">
                        <div className="w-4 text-sm text-gray-600 font-mono shrink-0 leading-5 tabular-nums">{index + 1}
                        </div>
                        <div className="text-sm text-gray-600 mr-1">:
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm text-black leading-5 truncate">{map.title}</div>
                          <div className="text-xs text-gray-500">{map.category}</div>
                        </div>
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
                              className={`w-5 h-5 ${favorites.has(map.id) ? "text-yellow-500 fill-current" : "text-gray-400"}`}
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
    <div className="h-screen flex flex-col bg-gray-50">
      {showTitlePopup && <TitlePopup title={popupTitle} onClose={() => setShowTitlePopup(false)} />}

      {/* Status Bar Pad - Fixed */}
      <div className="bg-lime-800 w-full py-4 flex-shrink-0"></div>

      {/* Header - Fixed */}
      <div className="bg-gray-100 px-4 py-4 flex-shrink-0">
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

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
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
                      <div key={`favorite-${map.id}`} className="flex items-start gap-2 pr-4">
                        <div className="w-4 text-sm text-gray-600 font-mono shrink-0 leading-5 tabular-nums">{index + 1}
                        </div>
                        <div className="text-sm text-gray-600 mr-1">:
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm text-black leading-5 truncate">{map.title}</div>
                          <div className="text-xs text-gray-500">{map.category}</div>
                        </div>
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
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
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
    <div className="h-screen flex flex-col bg-gray-50 relative overflow-hidden">
      {showTitlePopup && <TitlePopup title={popupTitle} onClose={() => setShowTitlePopup(false)} />}

      {/* Status Bar Pad - Fixed */}
      <div className="bg-lime-800 w-full py-4 flex-shrink-0 relative z-50"></div>

      {/* Header - Fixed */}
      <div className="bg-gray-100 px-4 py-4 flex items-center justify-between flex-shrink-0 relative z-50">
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

      {/* Content - Scrollable with proper containment */}
      <div className="flex-1 relative z-10" style={{ overflowY: 'auto', overscrollBehavior: 'contain' }}>
        <div className="px-4 py-4 pb-20">{/* Added pb-20 for bottom bar clearance */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-2 gap-4">
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
                    <div key={`map-${map.id}`} className="flex items-start gap-2 pr-4">
                      <div className="w-4 text-sm text-gray-600 font-mono shrink-0 leading-5 tabular-nums">{index + 1}
                      </div>
                      <div className="text-sm text-gray-600 mr-1">:
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-black leading-5 truncate">{map.title}</div>
                      </div>
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
                              className={`w-5 h-5 ${favorites.has(map.id) ? "text-yellow-500 fill-current" : "text-gray-400"}`}
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
      </div>
      
      {/* Bottom Bar - Fixed with proper positioning */}
      <div className="fixed bottom-0 left-0 right-0 h-14 shadow-sm border-t border-stone-200 flex-shrink-0 z-50" style={{ backgroundColor: '#f0f1f2'}}>                 
        <div className="flex items-center justify-center h-14">
          {/* Button Container with equal spacing */}
          <div className="flex items-center justify-between w-full max-w-md px-16">
            {/* Search Button */}
            <button
              onClick={() => {
                setActiveTab("search")
                setSearchFromContext(currentCategory)
                setSearchFromViewMode(viewMode)
                setCurrentScreen("search")
              }}
              className="flex flex-col items-center w-16"
            >
              <Search className="h-5 w-5 text-stone-700" />
              <span className={`text-xs mt-1 ${activeTab === "search" ? "text-indigo-600" : "text-gray-400"}`}>
                Search
              </span>
            </button>

            {/* Favorites Button */}
            <button
              onClick={() => {
                setActiveTab("favorites")
                setFavoriteFromContext(currentCategory)
                setFavoriteFromViewMode(viewMode)
                setCurrentScreen("favorites")
              }}
              className="flex flex-col items-center w-16"
            >
              <Star className="h-5 w-5 text-stone-700" />
              <span className={`text-xs mt-1 ${activeTab === "favorites" ? "text-indigo-600" : "text-gray-400"}`}>
                Favorites
              </span>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

"use client" import { setOpaqueStatusBar, setTransparentStatusBar } from '../helpers/statusBarHelper'; import { App as CapacitorApp } from '@capacitor/app'; import React, { useState, useEffect, useRef } from "react" import { StatusBar, Style } from '@capacitor/status-bar'; import { TransformWrapper

pasted


package com.abi.biblemaps; import android.content.res.TypedArray; import android.graphics.Color; import android.os.Build; import android.os.Bundle; import android.view.View; import android.view.Window; import android.view.WindowInsetsController; import android.webkit.WebView; import com.get

pasted

the tsx file is to be applies based on the mainactivity.java pasted. currently it is working as intended but only minor things to adjust.
* in category screen when content scrolling is finished if further panned up header is overlapping status bar, and if panned down further bottom bar is partly getting out of screen

Looking at your code and the issue description, the problem is that the category screen's header and bottom bar don't have proper safe area boundaries when content is over-scrolled. The current implementation allows the scrollable content to push these fixed elements beyond the screen edges.

Here's the fix for the category screen section:

Untitled
Text 
Now let's update the Content section to ensure proper scroll containment:

Untitled
Text ∙ Version 2 
Now let's update the bottom bar to be properly fixed with z-index:

Untitled
Text ∙ Version 3 
The key changes I made to fix the over-scrolling issues:

Main Fixes Applied:
Container Structure: Added relative overflow-hidden to the main container to prevent content from escaping bounds
Z-index Layering:
Status bar and header: z-20 (highest)
Bottom bar: z-20 (highest)
Content area: z-10 (lower)
Scroll Containment: Added overscrollBehavior: 'contain' to prevent iOS-style bounce scrolling that was causing the overlap
Bottom Bar Positioning: Changed from relative positioning to fixed bottom-0 left-0 right-0 to ensure it stays anchored to the bottom
Content Padding: Added pb-20 (padding-bottom: 5rem) to the content wrapper to ensure there's clearance for the fixed bottom bar
Scroll Container: Moved the scroll container to wrap just the content area, not the padding, ensuring proper scroll boundaries
These changes will prevent:

Header from sliding up past the status bar during over-scroll
Bottom bar from sliding down past the screen edge during over-scroll
Content from appearing behind fixed elements
The scroll behavior is now properly contained within the designated content area while maintaining the fixed positioning of your header and bottom navigation.

on others z is 50 for status bar

You're right, I need to match the z-index values used in other screens. Let me update the category screen to use z-50 for the status bar and other fixed elements:

Untitled
Text ∙ Version 4 
Now let me update the bottom bar to also use z-50:

Untitled
Text ∙ Version 5 
Perfect! Now the category screen has the correct z-index hierarchy that matches the other screens:

Status bar and header: z-50 (highest priority, will always stay on top)
Bottom bar: z-50 (same priority as header/status bar)
Content area: z-10 (lower priority, stays behind fixed elements)
This should completely resolve the over-scrolling issues where the header was overlapping the status bar when scrolled up, and the bottom bar was sliding off-screen when scrolled down. The fixed elements will now properly stay in their designated positions regardless of scroll behavior.

give me the replacement codes

Here are the complete replacement code blocks for the category screen section:

Replace the entire category screen section (starting from // Category Screen through the closing bracket and brace) with:

javascript
// Category Screen
if (currentScreen === "category") {
  const maps = getFilteredMaps()
  const displayTitle = showFavorites ? "Favorites" : currentCategory
  const Icon = showFavorites ? Star : mockMapData[currentCategory]?.icon || BookIcon

  return (
    <div className="h-screen flex flex-col bg-gray-50 relative overflow-hidden">
      {showTitlePopup && <TitlePopup title={popupTitle} onClose={() => setShowTitlePopup(false)} />}

      {/* Status Bar Pad - Fixed */}
      <div className="bg-lime-800 w-full py-4 flex-shrink-0 relative z-50"></div>

      {/* Header - Fixed */}
      <div className="bg-gray-100 px-4 py-4 flex items-center justify-between flex-shrink-0 relative z-50">
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

      {/* Content - Scrollable with proper containment */}
      <div className="flex-1 relative z-10" style={{ overflowY: 'auto', overscrollBehavior: 'contain' }}>
        <div className="px-4 py-4 pb-20">{/* Added pb-20 for bottom bar clearance */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-2 gap-4">
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
                    <div key={`map-${map.id}`} className="flex items-start gap-2 pr-4">
                      <div className="w-4 text-sm text-gray-600 font-mono shrink-0 leading-5 tabular-nums">{index + 1}
                      </div>
                      <div className="text-sm text-gray-600 mr-1">:
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-black leading-5 truncate">{map.title}</div>
                      </div>
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
                              className={`w-5 h-5 ${favorites.has(map.id) ? "text-yellow-500 fill-current" : "text-gray-400"}`}
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
      </div>
      
      {/* Bottom Bar - Fixed with proper positioning */}
      <div className="fixed bottom-0 left-0 right-0 h-14 shadow-sm border-t border-stone-200 flex-shrink-0 z-50" style={{ backgroundColor: '#f0f1f2'}}>                 
        <div className="flex items-center justify-center h-14">
          {/* Button Container with equal spacing */}
          <div className="flex items-center justify-between w-full max-w-md px-12">
            {/* Search Button */}
            <button
              onClick={() => {
                setActiveTab("search")
                setSearchFromContext(currentCategory)
                setSearchFromViewMode(viewMode)
                setCurrentScreen("search")
              }}
              className="flex flex-col items-center w-16"
            >
              <Search className="h-5 w-5 text-stone-700" />
              <span className={`text-xs mt-1 ${activeTab === "search" ? "text-indigo-600" : "text-gray-400"}`}>
                Search
              </span>
            </button>

            {/* Favorites Button */}
            <button
              onClick={() => {
                setActiveTab("favorites")
                setFavoriteFromContext(currentCategory)
                setFavoriteFromViewMode(viewMode)
                setCurrentScreen("favorites")
              }}
              className="flex flex-col items-center w-16"
            >
              <Star className="h-5 w-5 text-stone-700" />
              <span className={`text-xs mt-1 ${activeTab === "favorites" ? "text-indigo-600" : "text-gray-400"}`}>
                Favorites
              </span>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
The key changes made:

Added relative overflow-hidden to main container
Changed status bar and header to z-50
Changed content area to use proper scroll containment with overscrollBehavior: 'contain'
Changed bottom bar to fixed bottom-0 left-0 right-0 with z-50
Added pb-20 padding to content wrapper for bottom bar clearance
This will prevent the header from overlapping the status bar during over-scroll and keep the bottom bar anchored to the screen bottom.


please the code here, the right side window is not showing

I understand you're having trouble seeing the code in the right window. Let me provide the complete replacement code in an artifact that should display properly:

Category Screen Replacement Code
Code 
This artifact contains the complete category screen replacement code with the fixed over-scroll behavior. The key changes are:

Main container: Added relative overflow-hidden
Z-index consistency: Status bar, header, and bottom bar all use z-50
Scroll containment: Content area uses overscrollBehavior: 'contain'
Bottom bar positioning: Changed to fixed bottom-0 left-0 right-0
Content padding: Added pb-20 for bottom bar clearance
Replace your existing category screen section (from // Category Screen to the closing }) with this code to fix the over-scrolling issues.


// Map Viewer if (currentScreen === "mapViewer" && activeMap) { return ( <> {/* Status Bar */} <div className={`w-full py-4 flex-shrink-0 z-50 ${mapViewerTheme === "light" ? "bg-slate-200" : "bg-gray-900"}`}/> <div className={`map-viewer-container ${mapViewerTheme

pasted

please confirm if the pasted code is correct and the status bar is fixed at top above the map viewing element

Looking at your Map Viewer code, there are a couple of issues with the status bar implementation:

Missing fixed positioning: The status bar div needs fixed positioning to stay at the top
Missing top-0: It needs to be anchored to the top of the screen
Self-closing div: The status bar is currently a self-closing div <div ... /> but should be a proper opening and closing tag
Here's the corrected version:

Map Viewer Fixed Status Bar
Code 
Key Changes Made:

Status Bar:
Changed from self-closing <div ... /> to proper <div></div> tags
Added fixed top-0 left-0 positioning to keep it anchored at the very top
Maintains z-50 to stay above all other elements
Control Positioning:
Changed top controls from top-4 to top-20 to account for the status bar height (py-4 ≈ 1rem padding = 16px + some margin = ~80px total)
This prevents the controls from being hidden behind the status bar
Layout Structure:
Status bar is now completely separate from the map container
Map viewer container can still use full viewport dimensions
Controls are properly spaced below the status bar
Confirmation: ✅ The status bar is now fixed at the top above the map viewing element
✅ It will stay in place during map zoom/pan operations
✅ Controls are positioned to avoid being hidden behind the status bar
✅ Z-index hierarchy ensures status bar stays on top

The status bar will now remain fixed at the top of the screen and won't interfere with map interactions, while the theme-based coloring (light/dark) will still work as intended.

fixed top-0 left-0--why for this, the others do not have this

You're absolutely right to question this. Looking at the other screens in your code, they use a different approach for the status bar.

In other screens like home, search, favorites, and category, the status bar is structured as:

javascript
{/* Status Bar Pad - Fixed */}
<div className="bg-lime-800 w-full py-4 flex-shrink-0"></div>
This works because those screens use a flex container (h-screen flex flex-col) where the status bar is the first flex item, so it naturally sits at the top.

In the Map Viewer, the structure is different - you have:

A fragment <> containing the status bar
A separate map-viewer-container with TransformWrapper
Since the map viewer uses absolute positioning and full viewport dimensions for the map, the status bar needs fixed top-0 left-0 to ensure it stays at the very top and doesn't get covered by the map content.

However, to be consistent with your other screens, you could restructure it like this:

javascript
// Map Viewer
if (currentScreen === "mapViewer" && activeMap) {
  return (
    <div className="h-screen flex flex-col">
      {/* Status Bar Pad - Fixed */}
      <div className={`w-full py-4 flex-shrink-0 z-50 ${mapViewerTheme === "light" ? "bg-slate-200" : "bg-gray-900"}`}></div>
      
      <div className={`flex-1 ${mapViewerTheme === "light" ? "bg-slate-50" : "bg-black"}`}>
        {/* Rest of your TransformWrapper code */}
      </div>
    </div>
  )
}
This would match the pattern used in your other screens. The fixed top-0 left-0 was only needed because of the current structure where the map container might overlap the status bar.


<div className="flex items-center justify-between w-full max-w-md px-12">---what does it mean

That CSS class combination creates a horizontal layout for the bottom navigation buttons. Let me break it down:

flex - Creates a flexbox container

items-center - Vertically centers the items within the container

justify-between - Distributes items with equal space between them (first item at start, last item at end, equal space in between)

w-full - Makes the container take up the full width of its parent

max-w-md - Limits the maximum width to md size (28rem or 448px in Tailwind)

px-12 - Adds horizontal padding of 3rem (48px) on left and right sides

So this container:

Takes full width but caps at 448px max
Centers itself within its parent (the bottom bar)
Has 48px padding on each side
Spreads the Search and Favorites buttons to opposite ends with equal space between them
Vertically centers the buttons
This creates a balanced layout where the two navigation buttons are evenly spaced within a contained area, rather than being pushed to the very edges of the screen. The max-w-md prevents the buttons from being too far apart on wider screens, keeping them within a comfortable thumb-reach distance.

what if i make it px 18

If you change px-12 to px-18, you'll increase the horizontal padding from 48px to 72px (since px-18 = 4.5rem = 72px).

This means:

More padding on the left and right sides of the button container
Buttons pushed closer together since there's more padding eating into the available space
Smaller usable area for the buttons within the max-w-md (448px) container
With px-18:

Container max width: 448px
Padding: 72px left + 72px right = 144px total
Available space for buttons: 448px - 144px = 304px
The Search and Favorites buttons will be distributed within this 304px space
Compared to px-12:

Available space for buttons: 448px - 96px = 352px
So the buttons will be about 48px closer together with px-18. Whether this looks better depends on your design preference - more padding creates a more compact, centered look, while less padding gives the buttons more breathing room.

what if px14

If

what if px 16

If you change px-12 to px-16, you'll increase the horizontal padding from 48px to 64px (since px-16 = 4rem = 64px).

This means:

Moderate increase in padding on the left and right sides
Buttons slightly closer together compared to px-12
Balanced spacing - not too cramped, not too spread out
With px-16:

Container max width: 448px
Padding: 64px left + 64px right = 128px total
Available space for buttons: 448px - 128px = 320px
The Search and Favorites buttons will be distributed within this 320px space
Compared to your current px-12:

Available space for buttons: 448px - 96px = 352px
So buttons will be about 32px closer together
This px-16 setting would give you a nice middle ground - more contained than px-12 but not as tight as px-18. It's a common spacing value that often works well for mobile interfaces where you want the buttons accessible but not too spread apart for thumb navigation.

<div className="px-4 py-4 pb-20">{/* Added pb-20 for bottom bar clearance */}

That CSS class combination creates padding for the content wrapper in your category screen:

px-4 - Adds 16px horizontal padding (left and right)

py-4 - Adds 16px vertical padding (top and bottom)

pb-20 - Adds 80px bottom padding specifically

The pb-20 overrides the bottom portion of py-4, so the effective padding becomes:

Top: 16px
Left/Right: 16px each
Bottom: 80px (instead of 16px)
The large bottom padding (pb-20 = 80px) is there to prevent content from being hidden behind the fixed bottom navigation bar. Since your bottom bar has h-14 (56px height), the 80px padding ensures there's enough clearance so users can scroll to see all content without it being obscured by the navigation.

Without this extra bottom padding, the last items in your content would slide under the fixed bottom bar when scrolling, making them inaccessible.

yarn run v1.22.19
warning ../package.json: No license field
$ next build
⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry
 ▲ Next.js 14.2.33
 Creating an optimized production build ...
> [PWA] Compile server
> [PWA] Compile server
> [PWA] Compile client (static)
> [PWA] Auto register service worker with: /Users/builder/clone/node_modules/next-pwa/register.js
> [PWA] Service worker: /Users/builder/clone/public/sw.js
> [PWA] url: /sw.js
> [PWA] scope: /
Failed to compile.
./components/bible-maps-app.tsx
Error:
x Unexpected token div. Expected jsx identifier
 ,-[/Users/builder/clone/components/bible-maps-app.tsx:1757:1]
1757 |
1758 | return (
1759 |
1760 | <div className="h-screen flex flex-col">
 : ^^^
1761 | {/* Status Bar Pad - Fixed */}
1762 | <div className={w-full py-4 flex-shrink-0 z-50 ${mapViewerTheme === "light" ? "bg-slate-200" : "bg-gray-900"}}></div>
 ----
Caused by:
 Syntax Error
Import trace for requested module:
./components/bible-maps-app.tsx
./app/page.tsx
> Build failed because of webpack errors
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
Build failed :|
Step 6 script Build Web` exited with status code 1

The error is a JSX syntax issue. Looking at line 1760 in your error, there's likely a missing return statement or fragment wrapper before the <div>.

The error "Expected jsx identifier" suggests there's a syntax problem with how the JSX is structured. This commonly happens when:

Missing return statement
Missing fragment wrapper <> or <React.Fragment>
Unclosed tags above this line
To fix this, make sure your Map Viewer section looks like this:

javascript
// Map Viewer
if (currentScreen === "mapViewer" && activeMap) {
  return (
    <div className="h-screen flex flex-col">
      {/* Status Bar Pad - Fixed */}
      <div className={`w-full py-4 flex-shrink-0 z-50 ${mapViewerTheme === "light" ? "bg-slate-200" : "bg-gray-900"}`}></div>
      
      <div className={`flex-1 ${mapViewerTheme === "light" ? "bg-slate-50" : "bg-black"}`}>
        {/* Your TransformWrapper code here */}
      </div>
    </div>
  )
}
Check these potential issues in your code:

Missing return - Make sure you have return ( before the JSX
Unclosed tags - Check if any JSX elements above line 1757 are not properly closed
Missing parentheses - Ensure the return statement has proper parentheses around the JSX
Fragment issues - If you were using <> fragments, make sure they're properly closed
Can you show me the exact code around lines 1755-1765 so I can identify the specific syntax issue?



// Map Viewer if (currentScreen === "mapViewer" && activeMap) { return ( <div className="h-screen flex flex-col"> {/* Status Bar Pad - Fixed */} <div className={`w-full py-4 flex-shrink-0 z-50 ${mapViewerTheme === "light" ? "bg-slate-200" : "bg-gray-900"}`}></div> <

pasted

I found the issue in your Map Viewer code. There are two problems:

Missing closing </div> tag - The second div (map-viewer-container) is never closed
Missing handleLongPress function - This function is called but doesn't exist
Here's the corrected code:

Corrected Map Viewer Code
Code 
Fixes Applied:

Added missing handleLongPress function - This was referenced but not defined
Fixed JSX structure - Changed the second div to use flex-1 instead of map-viewer-container class and added proper closing tag
Updated container dimensions - Changed from 100vw/100vh to 100% since it's now within a flex container
Added relative positioning - To the map container for proper absolute positioning of controls
Key Changes:

Status bar: Uses flex layout like other screens, no need for fixed positioning
Map container: Now uses flex-1 to take remaining space after status bar
Dimensions: Image container uses 100% instead of viewport units
Structure: Properly nested divs with correct closing tags
This should resolve the compilation error and maintain consistency with your other screens while keeping the map viewer functionality intact.





// Map Viewer
if (currentScreen === "mapViewer" && activeMap) {
  
  // Handle long press for title popup
  const handleLongPress = (title) => {
    setPopupTitle(title)
    setShowTitlePopup(true)
  }
  
  return (
    <div className="h-screen flex flex-col">
      {/* Status Bar Pad - Fixed */}
      <div className={`w-full py-4 flex-shrink-0 z-50 ${mapViewerTheme === "light" ? "bg-slate-200" : "bg-gray-900"}`}></div>

      <div className={`flex-1 ${mapViewerTheme === "light" ? "bg-slate-50" : "bg-black"} relative`}>
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
                  width: '100%', 
                  height: '100%', 
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
                    className={`p-1.5 backdrop-blur-none rounded-lg shadow-lg w-fit ${
                      mapViewerTheme === "light" 
                        ? "bg-white/90 text-blue-600 hover:bg-white" 
                        : "bg-black/70 text-white hover:bg-black/80"
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div 
                    onClick={() => handleLongPress(activeMap.title)}
                    className={`text-sm backdrop-blur-none px-3 py-1.5 rounded-lg shadow-lg cursor-pointer ${
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
                    className={`p-1.5 backdrop-blur-none rounded-lg shadow-lg ${
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
                    className={`p-1.5 backdrop-blur-none rounded-lg shadow-lg ${
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
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-1.5 backdrop-blur-none rounded-lg shadow-lg pointer-events-auto ${
                      mapViewerTheme === "light" 
                        ? "bg-white/90 text-gray-800 hover:bg-white" 
                        : "bg-black/70 text-white hover:bg-black/80"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
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
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 backdrop-blur-none rounded-lg shadow-lg pointer-events-auto ${
                      mapViewerTheme === "light" 
                        ? "bg-white/90 text-gray-800 hover:bg-white" 
                        : "bg-black/70 text-white hover:bg-black/80"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {/* Home Button */}
                <button
                  onClick={() => setCurrentScreen("home")}
                  className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 p-2 backdrop-blur-none rounded-lg shadow-lg pointer-events-auto ${
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
    </div>
  )
}

  // [Keep all your other screen conditions: home, search, favorites, category...]

  return null
}

export default BibleMapsApp
