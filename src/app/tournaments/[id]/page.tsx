"use client"

import { useParams } from "next/navigation"
import { Trophy, MapPin, Calendar, Clock, Users, ChevronLeft, ExternalLink, Car, Info } from "lucide-react"
import { AppSidebar } from "@/components/app/Sidebar"
import { BottomNav } from "@/components/navigation/BottomNav"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Image from "next/image"
import Link from "next/link"

// Temporal: Usaremos los datos de ejemplo hasta que tengamos la API
import { MOCK_TOURNAMENTS } from "@/mocks/tournaments"

export default function TournamentDetailPage() {
  const params = useParams()
  const tournament = MOCK_TOURNAMENTS.find(t => t.id === Number(params.id))

  if (!tournament) {
    return <div>Torneo no encontrado</div>
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: es })
  }

  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
      <AppSidebar />
      <main className="flex-1 overflow-x-hidden w-full">
        {/* Hero Banner */}
        <div className="relative h-[300px] w-full">
          <Image
            src="/assets/padelcancha.jpeg"
            alt="Banner del torneo"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          
          {/* Contenido del banner */}
          <div className="absolute bottom-0 w-full p-6 md:p-8">
            <Button
              variant="ghost"
              className="text-white mb-4 hover:bg-white/10"
              onClick={() => router.back()}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Volver a Torneos
            </Button>
            <h1 className="text-3xl font-bold text-white mb-2">{tournament.name}</h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{tournament.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full px-4 py-6 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Descripción */}
              <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Acerca del torneo</h2>
                <p className="text-gray-600">{tournament.description}</p>
              </section>

              {/* Categorías y Cupos */}
              <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Categorías y Cupos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(tournament.availableSpots).map(([category, spots]) => {
                    const totalSpots = tournament.totalTeams[category]
                    const isAlmostFull = spots <= 3
                    const percentage = (spots / totalSpots) * 100

                    return (
                      <div
                        key={category}
                        className="bg-gray-50 rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{category}</span>
                          <span className={
                            isAlmostFull ? "text-red-600" : "text-green-600"
                          }>
                            {spots}/{totalSpots} cupos
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-full rounded-full ${
                              isAlmostFull ? "bg-red-500" : "bg-green-500"
                            }`}
                            style={{ width: `${100 - percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>

              {/* Premios */}
              <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Premios</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <div className="text-yellow-600 font-medium mb-1">1° Lugar</div>
                    <div className="text-gray-700">{tournament.prizes.firstPlace}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-gray-600 font-medium mb-1">2° Lugar</div>
                    <div className="text-gray-700">{tournament.prizes.secondPlace}</div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4">
                    <div className="text-orange-600 font-medium mb-1">3° Lugar</div>
                    <div className="text-gray-700">{tournament.prizes.thirdPlace}</div>
                  </div>
                </div>
              </section>

              {/* Cronograma */}
              <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Cronograma</h2>
                <div className="space-y-6">
                  {tournament.schedule.map((day, index) => (
                    <div key={index}>
                      <h3 className="font-medium text-gray-900 mb-3">
                        {formatDate(day.date)}
                      </h3>
                      <div className="space-y-3">
                        {day.events.map((event, eventIndex) => (
                          <div key={eventIndex} className="flex gap-4">
                            <div className="text-blue-600 font-medium w-20">
                              {event.time}
                            </div>
                            <div className="text-gray-600">
                              {event.description}
                            </div>
                          </div>
                        ))}
                      </div>
                      {index < tournament.schedule.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Reglamento */}
              <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Reglamento</h2>
                <ul className="space-y-2">
                  {tournament.rules.map((rule, index) => (
                    <li key={index} className="flex gap-2 text-gray-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Inscripción */}
              <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">${tournament.price}</h3>
                  <span className="text-gray-500">por equipo</span>
                </div>
                <Button className="w-full mb-4">Inscribirse ahora</Button>
                <p className="text-sm text-gray-500 mb-4">
                  Fecha límite de inscripción: {formatDate(tournament.registrationDeadline)}
                </p>
              </section>

              {/* Sede */}
              <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Sede del torneo</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium text-gray-900 mb-1">
                      {tournament.venue.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {tournament.venue.address}
                    </div>
                  </div>
                  
                  {tournament.venue.parkingAvailable && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Car className="h-4 w-4" />
                      <span>Estacionamiento disponible</span>
                    </div>
                  )}

                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">
                      Instalaciones
                    </div>
                    <div className="space-y-2">
                      {tournament.venue.facilities.map((facility, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                          {facility}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Organizador */}
              <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Organizador</h3>
                <div className="flex items-center gap-4 mb-4">
                  {tournament.organizer.logo && (
                    <Image
                      src={tournament.organizer.logo}
                      alt={tournament.organizer.name}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                  )}
                  <div>
                    <div className="font-medium text-gray-900">
                      {tournament.organizer.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {tournament.organizer.contact}
                    </div>
                  </div>
                </div>
              </section>

              {/* Sponsors */}
              <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Sponsors</h3>
                <div className="space-y-6">
                  {["platinum", "gold", "silver", "bronze"].map((tier) => {
                    const tierSponsors = tournament.sponsors.filter(s => s.tier === tier)
                    if (tierSponsors.length === 0) return null

                    return (
                      <div key={tier}>
                        <div className="text-sm font-medium text-gray-500 mb-3 capitalize">
                          {tier}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {tierSponsors.map((sponsor, index) => (
                            <a
                              key={index}
                              href={sponsor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative bg-gray-50 rounded-lg p-4 flex items-center justify-center transition-colors hover:bg-gray-100"
                            >
                              <Image
                                src={sponsor.logo}
                                alt={sponsor.name}
                                width={100}
                                height={40}
                                className="object-contain"
                              />
                              {sponsor.website && (
                                <ExternalLink className="absolute bottom-2 right-2 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}