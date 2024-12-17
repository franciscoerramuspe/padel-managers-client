"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CategoryCarouselProps {
  categories: string[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export function CategoryCarousel({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 200
    const targetScroll = container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
    
    container.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    })
  }

  return (
    <div className="relative max-w-full">
      {/* Botones de navegación y contenedor principal */}
      <div className="flex items-center max-w-full">
        {/* Botón izquierdo con gradiente */}
        <div className="flex-none relative z-10">
          <div className="absolute right-0 h-full w-4 bg-gradient-to-r from-white to-transparent" />
          <button
            onClick={() => scroll("left")}
            className="relative h-8 w-8 flex items-center justify-center bg-white hover:bg-gray-50 border border-gray-200 rounded-full shadow-sm"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Contenedor scrolleable */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto scrollbar-hide scroll-smooth mx-2"
        >
          <div className="flex gap-2 w-max px-2">
            <Button
              size="sm"
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => onCategoryChange(null)}
              className="shrink-0 text-xs sm:text-sm h-8 whitespace-nowrap"
            >
              Todos
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => onCategoryChange(category)}
                className="shrink-0 text-xs sm:text-sm h-8 whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Botón derecho con gradiente */}
        <div className="flex-none relative z-10">
          <div className="absolute left-0 h-full w-4 bg-gradient-to-l from-white to-transparent" />
          <button
            onClick={() => scroll("right")}
            className="relative h-8 w-8 flex items-center justify-center bg-white hover:bg-gray-50 border border-gray-200 rounded-full shadow-sm"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}