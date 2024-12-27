"use client"

import { Trophy, Users, ChevronRight, Calendar, MapPin } from "lucide-react"
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
  
  const handleClick = () => {
    router.push(`/tournaments/${tournament.id}`)
  }

  const formatDate = (date: string) => {
    return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es })
  }

  return (
    <div 
      onClick={handleClick}
      className="group cursor-pointer bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200"
    >
      {/* Card Content */}
      <div className="p-3 sm:p-4 md:p-5">
        {/* Header */}
        <div className="flex justify-between items-start gap-4 mb-3 sm:mb-4">
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
            {tournament.name}
          </h3>
          <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm sm:text-base">
            ${tournament.price}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{formatDate(tournament.startDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{tournament.location}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 sm:p-4 md:p-5 border-t border-gray-100">
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