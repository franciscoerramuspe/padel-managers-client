'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, MapPin, Clock, Users, Star, Heart, LandPlot, Share } from 'lucide-react'
import { motion } from 'framer-motion'
import { fetchAvailability } from '@/services/courts'
import { Court } from '@/types'
import { ShareModal } from "@/components/ShareModal"

export default function CourtDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [court, setCourt] = useState<Court | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  useEffect(() => {
    const getCourt = async () => {
      const courts = await fetchAvailability(new Date())
      const currentCourt = courts.find(c => c.id === params.id)
      if (currentCourt) {
        setCourt(currentCourt)
      }
    }
    getCourt()
  }, [params.id])

  if (!court) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative h-[50vh]">
          <Button
            variant="ghost"
            className="absolute top-4 left-4 z-10 rounded-full bg-white/80 backdrop-blur-sm"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="absolute top-4 right-4 z-10 rounded-full bg-white/80 backdrop-blur-sm"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
                  variant="ghost"
                  onClick={() => setIsShareModalOpen(true)}
                  className="rounded-full"
                >
            <Share className="h-5 w-5" />
          </Button>
          <Image
            src="/assets/padelcancha.jpeg"
            alt={court.name}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h1 className="text-2xl font-bold text-white mb-2">{court.name}</h1>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="h-4 w-4" />
              <span>Paysandu, Uruguay</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LandPlot className="h-5 w-5 text-green-600" />
              <span className="text-green-600 font-medium">Cancha abierta</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-600" />
              <span>2 vs 2</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">4.85</span>
            <span className="text-gray-500">(100+ reseñas)</span>
          </div>

          <p className="text-gray-700">
            Cancha profesional con iluminación LED y superficie de última generación.
          </p>

          <div className="mb-20">
            <h3 className="text-lg font-semibold mb-4">Ubicación</h3>
            <div className="aspect-video w-full rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.7499163007893!2d-56.8113!3d-32.7213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQzJzE2LjgiUyA1NsKwNDgnNDAuNyJX!5e0!3m2!1ses!2suy!4v1620000000000!5m2!1ses!2suy"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 px-6 py-2 bg-green-400 backdrop-blur-sm border-t border-gray-400">
            <div className="flex items-center justify-between mb-4 mt-2">
              <div className="flex items-center gap-1 border-2 border-green-500 bg-green-200 rounded-md px-4 py-2">
                <span className="text-1xl font-medium text-green-600 ">$35</span>
                <span className="text-black">por hora</span>
              </div>
        
              <Button 
                className="bg-green-800 hover:bg-green-900 text-white p-4 py-6 rounded-md"
                onClick={() => router.push(`/book?court=${params.id}`)}
              >
                Reservar Ahora
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block max-w-7xl mx-auto py-8 px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        
        <h1 className="text-4xl font-bold mb-8">{court.name}</h1>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Primera columna: Imagen */}
          <div className="aspect-video relative rounded-2xl overflow-hidden">
            <Image
              src="/assets/padelcancha.jpeg"
              alt={court.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Segunda columna: Mapa */}
          <div className="aspect-video rounded-2xl overflow-hidden">
          <h3 className="text-3xl font-semibold mb-6">Ubicación</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.7499163007893!2d-56.8113!3d-32.7213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQzJzE2LjgiUyA1NsKwNDgnNDAuNyJX!5e0!3m2!1ses!2suy!4v1620000000000!5m2!1ses!2suy"
              width="100%"
              height="100%"
              style={{ border: 'none', borderRadius: '25px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Información de la cancha - Span completo */}
          <div className="col-span-2 bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Detalles de la cancha:</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>Paysandu, Uruguay</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setIsShareModalOpen(true)}
                  className="rounded-full"
                >
                  <Share className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setIsLiked(!isLiked)}
                  className="rounded-full"
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <Clock className="h-5 w-5 text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">Horario</p>
                <p className="font-medium">9am To 2pm</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <Users className="h-5 w-5 text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">Modalidad</p>
                <p className="font-medium">2 vs 2</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">4.85</span>
                <span className="text-gray-500">(100+ Reviews)</span>
              </div>
              
              <p className="text-gray-600 mb-8">
                Cancha profesional con iluminación LED y superficie de última generación.
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold">$35</span>
                  <span className="text-gray-500">/Hora</span>
                </div>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white px-8"
                  onClick={() => router.push(`/book?court=${params.id}`)}
                >
                  Reservar Ahora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        courtId={params.id as string}
        courtName={court.name}
      />
    </div>
  )
} 