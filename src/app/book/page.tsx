'use client'

import React, { useState, useEffect } from 'react';
import { format, addMinutes, parse, addMonths } from 'date-fns';
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"
import { CustomCalendar } from '@/components/ui/custom-calendar'
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAvailability, fetchCourtAvailability } from '@/services/courts';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { RealtimeChannel } from '@supabase/supabase-js';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { useRouter } from 'next/navigation';
import { es } from 'date-fns/locale'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app/Sidebar"
import { BottomNav } from "@/components/navigation/BottomNav"
import { BookingConfirmation } from '@/components/bookings/BookingConfirmation'

type Court = {
  id: string;
  name: string;
  availability: string[];
};

type TimeSlot = {
  timeRange: string;
  isBooked: boolean;
};

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedCourt, setSelectedCourt] = useState<string | undefined>(undefined);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string | undefined>(undefined);
  const [availableCourts, setAvailableCourts] = useState<Court[]>([]);
  const [availableTimes, setAvailableTimes] = useState<TimeSlot[] | null>(null);
  
  const { toast } = useToast();

  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [bookingsChannel, setBookingsChannel] = useState<RealtimeChannel | null>(null);

  const [selectedCourtName, setSelectedCourtName] = useState<string | undefined>(undefined);

  const router = useRouter();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        toast({
          title: 'Acceso Denegado',
          description: 'Debes iniciar sesión para realizar una reserva.',
          duration: 5000,
        });
      }
    };
    
    checkAuth();
  }, []);

  const handleDateSelect = async (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const courts = await fetchAvailability(date);
      setAvailableCourts(courts);
      setStep(2);
    }
  };

  const handleCourtSelect = async (courtId: string, courtName: string) => {
    try {
      setSelectedCourt(courtId);
      setSelectedCourtName(courtName);
      setSelectedTimeRange(undefined);
      setAvailableTimes(null);

      if (!selectedDate) {
        toast({
          title: "Error",
          description: "Por favor, selecciona una fecha primero",
          variant: "destructive",
        });
        return;
      }

      const courtAvailability = await fetchCourtAvailability(courtId, selectedDate);
      if (courtAvailability) {
        setAvailableTimes(courtAvailability.availability);
      } else {
        setAvailableTimes([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setAvailableTimes([]);
      toast({
        title: "Error",
        description: "Ocurrió un error al cargar los horarios",
        variant: "destructive",
      });
    }
  };

  const handleTimeSelect = (timeRange: string) => {
    setSelectedTimeRange(timeRange);
    setStep(3);
  };

  const handleConfirmBooking = async () => {
    if (selectedCourt && selectedDate && selectedTimeRange) {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          toast({
            title: 'Error',
            description: 'Debes iniciar sesión para realizar una reserva.',
            duration: 5000,
          });
          return;
        }

        const [startTime, endTime] = selectedTimeRange.split(' - ');
        const bookingDate = format(selectedDate, 'yyyy-MM-dd');

        const { data, error } = await supabase.from('bookings').insert([
          {
            court_id: selectedCourt,
            booking_date: bookingDate,
            start_time: startTime,
            end_time: endTime,
            status: 'confirmed',
            booked_by: user.id,
          },
        ]).select();

        if (error) throw error;

        setConfirmedBookingId(data[0].id);
        setShowConfirmation(true);

      } catch (error) {
        console.error('Error saving booking:', error);
        toast({
          title: 'Error',
          description: 'No se pudo procesar tu reserva. Por favor, intenta nuevamente.',
          duration: 5000,
        });
      }
    }
  };


  useEffect(() => {
    if (selectedCourt && selectedDate) {
      // Unsubscribe from previous channel if any
      bookingsChannel?.unsubscribe();

      // Subscribe to changes in the bookings table for the selected court and date
      const channel = supabaseClient
        .channel('custom-insert-channel')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'bookings',
            filter: `court_id=eq.${selectedCourt},booking_date=eq.${format(selectedDate, 'yyyy-MM-dd')}`,
          },
          (payload) => {
            console.log('Real-time update received:', payload);
            // Refetch availability
            handleCourtSelect(selectedCourt, selectedCourtName!);
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('Successfully subscribed to real-time updates.');
          }
        });

      setBookingsChannel(channel);

      // Cleanup on unmount
      return () => {
        channel.unsubscribe();
      };
    }
  }, [selectedCourt, selectedDate]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
          <div className="w-full max-w-[95%] lg:max-w-[80%] xl:max-w-[1200px] mx-auto">
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
                      className="space-y-8"
                    >
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl font-bold text-gray-800">Selecciona una fecha</h3>
                        <p className="text-gray-600">Elige el día que deseas jugar</p>
                      </div>
                      
                      <div className="w-full max-w-full md:max-w-2xl lg:max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-5 w-5 text-green-500" />
                              <span className="font-medium text-gray-700">Selecciona fecha</span>
                            </div>
                            {selectedDate && (
                              <span className="text-sm text-gray-500">
                                {format(selectedDate, 'EEEE, d MMMM', { locale: es })}
                              </span>
                            )}
                          </div>
                          <div className="flex justify-center">
                            <CustomCalendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleDateSelect}
                              disabled={(date) => date < new Date() || date > addMonths(new Date(), 2)}
                              initialFocus
                              className="mx-auto"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" onClick={() => setStep(1)} className="text-gray-600">
                          <ChevronLeft className="mr-2 h-4 w-4" /> Volver
                        </Button>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {selectedDate && format(selectedDate, 'dd/MM/yyyy')}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Canchas disponibles */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium text-gray-700">Canchas disponibles</h4>
                          <div className="space-y-4">
                            {availableCourts.map((court) => (
                              <div
                                key={court.id}
                                onClick={() => handleCourtSelect(court.id, court.name)}
                                className={`bg-white rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                                  selectedCourt === court.id
                                    ? 'ring-2 ring-green-500 shadow-lg'
                                    : 'hover:shadow-md'
                                }`}
                              >
                                <div className="flex items-start space-x-4">
                                  <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                                    <Image
                                      src="/assets/padelcancha.jpeg"
                                      alt={court.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-gray-900">{court.name}</h5>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      <span>Ubicación de la cancha</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                                      <span className="text-sm text-green-600 ml-2">Disponible</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Horarios disponibles */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium text-gray-700">Horarios disponibles</h4>
                          {!selectedCourt ? (
                            <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
                              Selecciona una cancha para ver los horarios disponibles
                            </div>
                          ) : availableTimes === null ? (
                            <div className="bg-gray-50 rounded-xl p-6 text-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4" />
                              <p className="text-gray-500">Cargando horarios disponibles...</p>
                            </div>
                          ) : availableTimes.length === 0 ? (
                            <div className="bg-gray-50 rounded-xl p-6">
                              <div className="flex flex-col items-center gap-3">
                                <div className="bg-red-50 rounded-full p-3">
                                  <Clock className="h-6 w-6 text-red-500" /> 
                                </div>
                                <div className="text-center">
                                  <p className="text-gray-900 font-medium">No hay horarios disponibles</p>
                                  <p className="text-gray-500 text-sm mt-1">
                                    Por favor, selecciona otra cancha u otra fecha
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                              <div className="grid grid-cols-2 gap-3">
                                {availableTimes.map((slot) => (
                                  <button
                                    key={slot.timeRange}
                                    onClick={() => !slot.isBooked && handleTimeSelect(slot.timeRange)}
                                    disabled={slot.isBooked}
                                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                                      selectedTimeRange === slot.timeRange
                                        ? 'bg-green-500 text-white'
                                        : slot.isBooked
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }`}
                                  >
                                    {slot.timeRange}
                                    {slot.isBooked && (
                                      <span className="block text-xs text-red-500">(Reservado)</span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="max-w-2xl mx-auto"
                    >
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="bg-green-500 px-6 py-4">
                          <h3 className="text-xl font-semibold text-white">Revisa y confirma tu reserva</h3>
                        </div>
                        
                        <div className="p-6 space-y-6">
                          <div className="flex items-start space-x-4">
                            <div className="relative h-32 w-32 rounded-lg overflow-hidden">
                              <Image
                                src="/assets/padelcancha.jpeg"
                                alt={selectedCourtName || ''}
                                fill
                                className="object-cover"
                              />
                            </div>
                            
                            <div className="flex-1 space-y-4">
                              <div className="space-y-1">
                                <h4 className="text-lg font-semibold text-gray-900">{selectedCourtName}</h4>
                                <p className="text-gray-500 flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  Ubicación de la cancha
                                </p>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-sm text-gray-500">Fecha</p>
                                  <p className="font-medium text-gray-900">
                                    {selectedDate && format(selectedDate, 'dd/MM/yyyy')}
                                  </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-sm text-gray-500">Horario</p>
                                  <p className="font-medium text-gray-900">{selectedTimeRange}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-6 border-t">
                            <Button variant="outline" onClick={() => setStep(2)}>
                              <ChevronLeft className="mr-2 h-4 w-4" /> Volver
                            </Button>
                            <Button 
                              onClick={handleConfirmBooking}
                              className="bg-black hover:bg-gray-900 text-white px-8"
                            >
                              Confirmar Reserva
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          <Toaster />
        </main>
        <BottomNav />
      </div>
      {showConfirmation && confirmedBookingId && (
        <BookingConfirmation
          bookingId={confirmedBookingId}
          courtName={selectedCourtName || ''}
          date={selectedDate!}
          startTime={selectedTimeRange!.split(' - ')[0]}
          endTime={selectedTimeRange!.split(' - ')[1]}
          price={1200}
          onClose={() => {
            setShowConfirmation(false);
            setSelectedDate(undefined);
            setSelectedCourt(undefined);
            setSelectedCourtName(undefined);
            setSelectedTimeRange(undefined);
            setAvailableCourts([]);
            setAvailableTimes([]);
            setStep(1);
          }}
        />
      )}
    </SidebarProvider>
  )
}