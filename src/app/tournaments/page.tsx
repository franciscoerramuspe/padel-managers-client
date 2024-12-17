"use client"

import { useState } from "react"
import { Trophy } from "lucide-react"
import { AppSidebar } from "@/components/app/Sidebar"
import { BottomNav } from "@/components/navigation/BottomNav"
import { TournamentCard } from "@/components/tournaments/TournamentCard"
import { TournamentFilters } from "@/components/tournaments/TournamentFilters"
import { Tournament } from "@/types/tournament"
import { DateRange } from "react-day-picker"
import { isWithinInterval, parseISO } from "date-fns"

// Datos de ejemplo para los torneos
const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 1,
    name: "Torneo de Verano 2024",
    startDate: "2024-07-15",
    endDate: "2024-07-20",
    categories: ["Primera", "Segunda", "Tercera"],
    availableSpots: {
      "Primera": 8, 
      "Segunda": 12,
      "Tercera": 6
    },
    totalTeams: {
      "Primera": 16,
      "Segunda": 16,
      "Tercera": 8
    },
    registrationDeadline: "2024-07-01",
    price: 50,
    status: "open",
    image: "/assets/tournament-summer.jpg"
  },
  {
    id: 2,
    name: "Copa Primavera",
    startDate: "2024-04-10",
    endDate: "2024-04-15",
    categories: ["Cuarta", "Quinta", "Sexta" , "Septima", "Octava"],
    availableSpots: {
      "Cuarta": 4,
      "Quinta": 8,
      "Sexta": 10,
      "Septima": 12,
      "Octava": 14
    },
    totalTeams: {
      "Cuarta": 8,
      "Quinta": 16,
      "Sexta": 16,
      "Septima": 16,
      "Octava": 16
    },
    registrationDeadline: "2024-03-25",
    price: 45,
    status: "open",
    image: "/assets/tournament-spring.jpg"
  },
  {
    id: 3,
    name: "Copa Otoño",
    startDate: "2024-09-10",
    endDate: "2024-09-15",
    categories: ["Cuarta", "Quinta", "Sexta" , "Septima", "Octava"],
    availableSpots: {
      "Cuarta": 4,
      "Quinta": 8,
      "Sexta": 10,
      "Septima": 12,
      "Octava": 14
    },
    totalTeams: {
      "Cuarta": 8,
      "Quinta": 16,
      "Sexta": 16,
      "Septima": 16,
      "Octava": 16
    },
    registrationDeadline: "2024-08-25",
    price: 45,
    status: "open",
    image: "/assets/tournament-fall.jpg"
  },
  {
    id: 4,
    name: "Copa Invierno",
    startDate: "2024-12-10",
    endDate: "2024-12-15",
    categories: ["Cuarta", "Quinta", "Sexta" , "Septima", "Octava"],
    availableSpots: {
      "Cuarta": 4,
      "Quinta": 8,
      "Sexta": 10,
      "Septima": 12,
      "Octava": 14
    },
    totalTeams: {
      "Cuarta": 8,
      "Quinta": 16,
      "Sexta": 16,
      "Septima": 16,
      "Octava": 16
    },
    registrationDeadline: "2024-11-25",
    price: 45,
    status: "open",
    image: "/assets/tournament-winter.jpg"
  },
]

export default function TournamentsPage() {
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
      
      // Un torneo coincide si hay alguna superposición entre los rangos de fecha
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

  return (
    <div className="relative flex min-h-screen bg-gray-50/50">
      <AppSidebar />
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="container max-w-7xl mx-auto px-4 py-6 sm:py-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Trophy className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-600" />
                Torneos Disponibles
              </h1>
              <p className="mt-1.5 sm:mt-2 text-gray-600 text-sm sm:text-base">
                Explora y participa en los mejores torneos de pádel
              </p>
            </div>

            {/* Filtros */}
            <div className="mb-6 sm:mb-8">
              <TournamentFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                categories={allCategories}
              />
            </div>

            {/* Lista de Torneos */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTournaments.map((tournament) => (
                <TournamentCard
                  key={tournament.id}
                  tournament={tournament}
                />
              ))}
            </div>

            {/* Estado vacío */}
            {filteredTournaments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm sm:text-base">
                  No se encontraron torneos que coincidan con tu búsqueda.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
} 