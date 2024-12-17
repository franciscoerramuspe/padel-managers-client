"use client"

import { Trophy, Users, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tournament } from "@/types/tournament"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useRouter } from "next/navigation"

interface TournamentCardProps {
  tournament: Tournament
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const router = useRouter()
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d/M/yyyy", { locale: es })
  }

  const handleClick = () => {
    router.push(`/tournaments/${tournament.id}`)
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl sm:rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg overflow-hidden">
      {/* Header con gradiente azul */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-3 sm:p-4 md:p-5 rounded-t-xl sm:rounded-t-2xl">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] rounded-t-xl sm:rounded-t-2xl"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white line-clamp-1 pr-2">{tournament.name}</h3>
            <span className="inline-flex items-center justify-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium shrink-0">
              ${tournament.price}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-1.5 text-xs sm:text-sm text-white/90">
            <span>{formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}</span>
            <span className="text-white/60">•</span>
            <span>{tournament.location}</span>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-3 sm:p-4 md:p-5">
        <div className="space-y-2 sm:space-y-3">
          {/* Sección de categorías */}
          <div>
            <div className="flex items-center gap-1.5 text-gray-700 mb-2">
              <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
              <h4 className="text-xs sm:text-sm font-medium">Categorías disponibles</h4>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
              {Object.entries(tournament.availableSpots).map(([category, spots]) => {
                const totalSpots = tournament.totalTeams[category]
                const isAlmostFull = spots <= 3
                const percentage = (spots / totalSpots) * 100

                return (
                  <div
                    key={category}
                    className="relative overflow-hidden rounded-lg bg-gray-50 p-2 sm:p-2.5"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs sm:text-sm font-medium text-gray-700">{category}</span>
                        <span className={cn(
                          "text-xs font-medium",
                          isAlmostFull ? "text-red-600" : "text-blue-600"
                        )}>
                          {spots}/{totalSpots}
                        </span>
                      </div>
                      {/* Barra de progreso */}
                      <div className="h-1 sm:h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            isAlmostFull
                              ? "bg-red-500"
                              : "bg-blue-500"
                          )}
                          style={{ width: `${100 - percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 sm:p-4 md:p-5 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
            <span>Inscripción por equipo</span>
          </div>
        </div>
        <Button 
          onClick={handleClick}
          className="w-full h-8 sm:h-10 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white group-hover:scale-[1.02] transition-transform"
        >
          Inscribirse <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </div>
  )
}