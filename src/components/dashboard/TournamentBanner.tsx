"use client"

import { useState, useEffect } from 'react'
import { Trophy, Calendar, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { MOCK_TOURNAMENTS } from '@/mocks/tournaments'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import useEmblaCarousel from 'embla-carousel-react'
import AutoPlay from 'embla-carousel-autoplay'

export function TournamentBanner() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  
  // Asegúrate de que siempre haya al menos 3 torneos
  const upcomingTournaments = MOCK_TOURNAMENTS
    .filter(t => new Date(t.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3)

  // Si no hay suficientes torneos futuros, usa los primeros torneos disponibles
  const tournamentsToShow = upcomingTournaments.length >= 3 
    ? upcomingTournaments 
    : [...upcomingTournaments, ...MOCK_TOURNAMENTS.slice(0, 3 - upcomingTournaments.length)]

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [AutoPlay({ delay: 5000, stopOnInteraction: false })]
  )

  const formatDate = (date: string) => {
    return format(new Date(date), "d 'de' MMMM", { locale: es })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleViewDetails = (tournamentId: string) => {
    router.push(`/tournaments/${tournamentId}`)
  }

  if (tournamentsToShow.length === 0) return null

  return (
    <div className={cn(
      "relative w-full h-[180px] sm:h-[220px] rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 transition-all duration-700 transform",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {tournamentsToShow.map((tournament) => (
            <div key={tournament.id} className="relative flex-[0_0_100%] min-w-0 embla__slide transform transition-transform duration-500">
              {/* Fondo con gradiente y overlay */}
              <div className="absolute inset-0">
                <Image
                  src="/assets/canchapadel.jpeg"
                  alt="Fondo torneo"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 mix-blend-multiply" />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Contenido */}
              <div className="relative h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                <div>
                  {/* Badge animado */}
                  <div className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-blue-600 text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                    <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                    ¡Próximo Torneo!
                  </div>

                  {/* Título y descripción */}
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                    {tournament.name}
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-3 sm:mb-4">
                    <div className="flex items-center text-white/90 text-xs sm:text-sm">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                      <span>
                        {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center text-white/90 text-xs sm:text-sm">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                      <span>{tournament.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transform transition-all duration-500 delay-400">
                  <p className="text-white/90 text-xs sm:text-sm max-w-2xl line-clamp-2 hidden sm:block">
                    {tournament.description}
                  </p>

                  <Button
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white group shadow-lg border-0 transition-all duration-300 hover:scale-105"
                    onClick={() => handleViewDetails(tournament.id.toString())}
                  >
                    Ver detalles
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decoración */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  )
}