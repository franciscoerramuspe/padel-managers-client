"use client"

import { Search, Calendar as CalendarIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DateRangePicker } from "@/components/tournaments/DateRangePicker"
import { DateRange } from "react-day-picker"
import { CategoryCarousel } from "./CategoryCarousel"

interface TournamentFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
  categories: string[]
}

export function TournamentFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  dateRange,
  onDateRangeChange,
  categories,
}: TournamentFiltersProps) {
  return (
    <div className="space-y-3 sm:space-y-4 w-full">
      {/* Barra superior con búsqueda y filtro de fecha */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
        {/* Buscador moderno */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none">
            <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Buscar torneos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 sm:pl-9 pr-3 h-9 sm:h-10 text-sm bg-white rounded-lg sm:rounded-xl border-gray-100 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>

        {/* Selector de fecha con diseño moderno */}
        <div className="w-full sm:w-auto">
          <DateRangePicker
            date={dateRange}
            onDateChange={onDateRangeChange}
            className="w-full"
            align="start"
          >
            <button className="w-full h-9 sm:h-10 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-lg sm:rounded-xl bg-white border border-gray-100 text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-colors">
              <CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 shrink-0" />
              <span className="text-xs sm:text-sm font-medium truncate">
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {dateRange.from.toLocaleDateString()} -{" "}
                      {dateRange.to.toLocaleDateString()}
                    </>
                  ) : (
                    dateRange.from.toLocaleDateString()
                  )
                ) : (
                  "Filtrar por fecha"
                )}
              </span>
            </button>
          </DateRangePicker>
        </div>
      </div>

      {/* Categorías con diseño moderno */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-100 p-0.5 w-full">
        <CategoryCarousel
          categories={["Todos", ...categories]}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => 
            onCategoryChange(category === "Todos" ? null : category)
          }
        />
      </div>
    </div>
  )
} 