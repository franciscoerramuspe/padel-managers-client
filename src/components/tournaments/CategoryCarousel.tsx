"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CategoryCarouselProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string) => void
}

export function CategoryCarousel({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
        setShowLeftArrow(scrollLeft > 0)
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5)
      }
    }

    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5)
    }
  }

  return (
    <div className="relative group w-full">
      {/* Botón izquierdo */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-10",
            "h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center",
            "bg-white rounded-lg shadow-sm border border-gray-100",
            "text-gray-600 hover:text-gray-900 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          )}
          aria-label="Desplazar categorías a la izquierda"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}

      {/* Contenedor de categorías */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
      >
        <div className="inline-flex gap-1.5 sm:gap-2 p-0.5 min-w-full">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={cn(
                "px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg whitespace-nowrap transition-all",
                "text-xs sm:text-sm font-medium",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/20",
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Botón derecho */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-10",
            "h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center",
            "bg-white rounded-lg shadow-sm border border-gray-100",
            "text-gray-600 hover:text-gray-900 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          )}
          aria-label="Desplazar categorías a la derecha"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}
    </div>
  )
}