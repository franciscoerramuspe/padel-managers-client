"use client"

import { useState } from "react"
import { Trophy } from "lucide-react"
import { AppSidebar } from "@/components/app/Sidebar"
import { BottomNav } from "@/components/navigation/BottomNav"
import { TournamentCard } from "@/components/tournaments/TournamentCard"
import { TournamentCarousel } from "@/components/tournaments/TournamentCarousel"
import { TournamentFilters } from "@/components/tournaments/TournamentFilters"
import { Tournament } from "@/types/tournament"
import { DateRange } from "react-day-picker"
import { isWithinInterval, parseISO } from "date-fns"
import { useRouter } from "next/navigation"
import { MOCK_TOURNAMENTS } from "@/mocks/tournaments"

export default function TournamentsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  const filteredTournaments = MOCK_TOURNAMENTS.filter(tournament => {
    // Filtro por búsqueda
    const matchesSearch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filtro por categoría
    const matchesCategory = !selectedCategory || tournament.categories.includes(selectedCategory)
    
    // Filtro por fecha
    let matchesDate = true
    if (dateRange?.from && dateRange?.to) {
      const tournamentStart = parseISO(tournament.startDate)
      const tournamentEnd = parseISO(tournament.endDate)
      
      matchesDate = (
        isWithinInterval(tournamentStart, { start: dateRange.from, end: dateRange.to }) ||
        isWithinInterval(tournamentEnd, { start: dateRange.from, end: dateRange.to }) ||
        (tournamentStart <= dateRange.from && tournamentEnd >= dateRange.to)
      )
    }

    return matchesSearch && matchesCategory && matchesDate
  })

  const allCategories = Array.from(
    new Set(MOCK_TOURNAMENTS.flatMap(t => t.categories))
  )

  const handleTournamentSelect = (tournamentId: number) => {
    router.push(`/tournaments/${tournamentId}`)
  }

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
      <AppSidebar />
      <main className="flex-1 overflow-x-hidden">
        <div className="flex flex-col min-h-full">
          {/* Header Banner con gradiente moderno */}
          <div className="relative w-full bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
            {/* Efectos de fondo */}
            <div className="absolute inset-0 bg-[linear-gradient(40deg,#0000_40%,#fff2_70%,#0000)] opacity-20"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#fff3_0%,#0000_50%)] opacity-40"></div>
            
            {/* Contenido */}
            <div className="relative px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2 sm:p-2.5 bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm">
                  <Trophy className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  Torneos Disponibles
                </h1>
              </div>
              <p className="text-white/90 text-sm sm:text-base max-w-2xl">
                Explora y participa en los mejores torneos de pádel. Encuentra el torneo perfecto para tu nivel y únete a la competición.
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 w-full px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
            <div className="max-w-7xl mx-auto w-full">
              {/* Filtros */}
              <TournamentFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                categories={allCategories}
              />

              {/* Contenedor principal que mantiene la estructura */}
              <div className="mt-6 sm:mt-8">
                {filteredTournaments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredTournaments.map((tournament) => (
                      <TournamentCard
                        key={tournament.id}
                        tournament={tournament}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-8 sm:p-10 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                        <Trophy className="h-6 w-6 sm:h-7 sm:w-7 text-blue-500" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        No se encontraron torneos
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base max-w-md">
                        No hay torneos que coincidan con tus criterios de búsqueda.
                        Intenta ajustar los filtros para ver más resultados.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
} 