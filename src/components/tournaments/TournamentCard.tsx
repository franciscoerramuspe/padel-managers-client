"use client"

import { ChevronRight, Users, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Tournament } from "@/types/tournament"

interface TournamentCardProps {
  tournament: Tournament
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  // Función para obtener el color de la categoría
  const getCategoryColor = (category: string) => {
    const colors = {
      'Masculino A': 'bg-blue-50 text-blue-700 border-blue-100',
      'Masculino B': 'bg-green-50 text-green-700 border-green-100',
      'Femenino A': 'bg-pink-50 text-pink-700 border-pink-100',
      'Femenino B': 'bg-purple-50 text-purple-700 border-purple-100',
      'Mixto': 'bg-orange-50 text-orange-700 border-orange-100',
    }
    return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-100'
  }

  return (
    <div className="group relative bg-gradient-to-b from-white to-gray-50/50 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100/50 overflow-hidden backdrop-blur-sm">
      {/* Header del Torneo */}
      <div className="relative">
        <div className="aspect-[2/1] bg-gradient-to-br from-blue-500 to-blue-600 p-4 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/5" />
          <div className="relative">
            <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-1">
              {tournament.name}
            </h3>
            <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm mt-1">
              <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
              <span>-</span>
              <span>{new Date(tournament.endDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        {/* Precio Tag */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-xs sm:text-sm font-medium text-gray-900 border border-gray-100/50 shadow-sm">
          ${tournament.price}
        </div>
      </div>

      {/* Categorías */}
      <div className="p-3 sm:p-4">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <h4 className="text-xs sm:text-sm font-medium">Categorías disponibles</h4>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {tournament.categories.map((category) => {
              const availableSpots = tournament.availableSpots[category]
              const totalSpots = tournament.totalTeams[category]
              const isAlmostFull = availableSpots <= 3
              
              return (
                <Badge
                  key={category}
                  variant="outline"
                  className={cn(
                    "py-0.5 px-2 sm:py-1 sm:px-3 flex items-center gap-1.5 transition-colors text-xs sm:text-sm border-[0.5px]",
                    getCategoryColor(category)
                  )}
                >
                  <span className="line-clamp-1">{category}</span>
                  <span className={cn(
                    "text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full",
                    isAlmostFull ? "bg-red-50 text-red-600" : "bg-white/80 text-inherit"
                  )}>
                    {availableSpots}/{totalSpots}
                  </span>
                </Badge>
              )
            })}
          </div>
        </div>

        {/* Footer con CTA */}
        <div className="flex items-center justify-between pt-3 mt-3 sm:pt-4 sm:mt-4 border-t border-gray-200/50">
          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Inscripción por equipo</span>
            <span className="sm:hidden">Por equipo</span>
          </div>
          <Button 
            size="sm" 
            className="group-hover:translate-x-1 transition-transform text-xs sm:text-sm h-8 px-3 sm:h-9 sm:px-4 bg-blue-600 hover:bg-blue-700"
          >
            Inscribirse <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
} 