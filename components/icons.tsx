// components/icons.tsx
import React from "react"

export const BookIcon = ({ className = "" }: { className?: string }) => (
  <div className={className}>
    <img src="/book-icon.png" alt="Book" className="w-full h-full" />
  </div>
)

export const CrossIcon = ({ className = "" }: { className?: string }) => (
  <div className={className}>
    <img src="/cross-icon.png" alt="Cross" className="w-full h-full" />
  </div>
)

export const ScrollIcon = ({ className = "" }: { className?: string }) => (
  <div className={className}>
    <img src="/scroll-icon.png" alt="Scroll" className="w-full h-full" />
  </div>
)
