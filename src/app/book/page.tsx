'use client'

import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Calendar } from '../../components/ui/calendar'
import { Button } from '../../components/ui/button'
import { useToast } from '../../components/ui/use-toast'
import { Toaster } from '../../components/ui/toaster'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { ChevronLeft, ChevronRight, Check, MapPin, Star } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Add these types at the top
type Court = {
  id: string
  name: string
  availability: string[]
}

const fetchAvailability = async (date: Date) => {
  try {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const response = await fetch(`/api/availability?date=${formattedDate}`);
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.error);
    
    return data;
  } catch (error) {
    console.error('Error fetching availability:', error);
    return [];
  }
};

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedCourt, setSelectedCourt] = useState<string | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [availableCourts, setAvailableCourts] = useState<Court[]>([])
  const { toast } = useToast()

  const handleDateSelect = async (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      const courts = await fetchAvailability(date)
      setAvailableCourts(courts)
      setStep(2)
    }
  }

  const handleConfirmBooking = () => {
    toast({
      title: "Booking Confirmed!",
      description: `Your court is reserved for ${format(selectedDate!, 'MMMM d, yyyy')} at ${selectedTime} on ${availableCourts.find(c => c.id === selectedCourt)?.name}.`,
      duration: 5000,
    })
    setSelectedDate(undefined)
    setSelectedCourt(undefined)
    setSelectedTime(undefined)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-3xl mx-auto">
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-white rounded-t-xl border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Reserva tu cancha</CardTitle>
              <div className="flex items-center space-x-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Badge 
                    key={i} 
                    variant={step > i ? "default" : "outline"}
                    className={step > i ? "bg-green-500" : ""}
                  >
                    {i + 1}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4 flex flex-col items-center"
                >
                  <h3 className="text-lg font-semibold">Selecciona una fecha</h3>
                  <div className="w-full flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      className="rounded-md border"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="ghost" onClick={() => setStep(1)} className="text-gray-600">
                      <ChevronLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {format(selectedDate!, 'dd/MM/yyyy')}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {availableCourts.map((court) => (
                      <div
                        key={court.id}
                        className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                      >
                        <div className="relative h-48">
                          <Image
                            src="/assets/images.jpg"
                            alt={court.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-4 left-4 flex items-center gap-2">
                            <span className="bg-white backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm font-medium">
                              2 vs 2
                            </span>
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Abierta
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800 mb-1">{court.name}</h3>
                              <div className="flex items-center gap-2 text-gray-500">
                                <MapPin className="h-4 w-4" />
                                <span className="text-sm">Paysandu, Uruguay</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="flex items-center gap-1 text-yellow-500 mb-1">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="font-medium">4.85</span>
                              </div>
                              <span className="text-xs text-gray-500">100 reseñas</span>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-4">
                            Cancha profesional con iluminación LED y superficie de última generación.
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              <span className="text-green-600 font-medium">Disponible</span>
                            </div>
                            <Button
                              onClick={() => {
                                setSelectedCourt(court.id)
                                setStep(3)
                              }}
                              className="bg-green-500 hover:bg-green-600 text-white px-6"
                            >
                              Reservar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" onClick={() => setStep(2)}>
                      <ChevronLeft className="mr-2 h-4 w-4" /> Volver
                    </Button>
                    <h3 className="text-lg font-semibold">Selecciona un horario</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {availableCourts
                      .find(court => court.id === selectedCourt)
                      ?.availability.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => {
                            setSelectedTime(time)
                            handleConfirmBooking()
                          }}
                        >
                          {time}
                        </Button>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}