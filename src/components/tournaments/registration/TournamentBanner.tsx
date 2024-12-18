'use client'

import Image from 'next/image'
import { Calendar, MapPin, Trophy } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface TournamentBannerProps {
  tournament: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    price: number;
    availableSpots: Record<string, number>;
  };
}

export function TournamentBanner({ tournament }: TournamentBannerProps) {
  const formatDate = (date: string) => {
    return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es })
  }

  return (
    <div className="space-y-6">
      {/* Imagen del banner */}
      <div className="relative w-full h-[500px] sm:h-[400px] rounded-xl overflow-hidden">
        <Image
          src="/assets/banner.jpg"
          alt="Banner del torneo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-transparent" />
      </div>

      {/* Detalles del torneo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>{formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>{tournament.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="font-medium text-gray-900">${tournament.price}</span>
              <span className="text-gray-500">por equipo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}