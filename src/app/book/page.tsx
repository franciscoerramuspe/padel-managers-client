'use client'

import React, { useState, useEffect } from 'react';
import { format, addMinutes, parse } from 'date-fns';
import { Calendar } from '../../components/ui/calendar';
import { Button } from '../../components/ui/button';
import { useToast } from '../../components/ui/use-toast';
import { Toaster } from '../../components/ui/toaster';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, MapPin, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAvailability, fetchCourtAvailability } from '@/services/courts';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { RealtimeChannel } from '@supabase/supabase-js';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';

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
  const [availableTimes, setAvailableTimes] = useState<TimeSlot[]>([]);
  
  const { toast } = useToast();

  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [bookingsChannel, setBookingsChannel] = useState<RealtimeChannel | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  const [selectedCourtName, setSelectedCourtName] = useState<string | undefined>(undefined);

  const handleDateSelect = async (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const courts = await fetchAvailability(date);
      setAvailableCourts(courts);
      setStep(2);
    }
  };

  const handleCourtSelect = async (courtId: string, courtName: string) => {
    setSelectedCourt(courtId);
    setSelectedCourtName(courtName);
    setSelectedTimeRange(undefined);

    if (selectedDate) {
      const courtAvailability = await fetchCourtAvailability(courtId, selectedDate);
      if (courtAvailability) {
        setAvailableTimes(courtAvailability.availability);
        setStep(3);
      } else {
        setAvailableTimes([]);
      }
    }
  };

  const handleTimeSelect = (timeRange: string) => {
    setSelectedTimeRange(timeRange);

    // Prepare modal content
    const formattedDate = selectedDate
      ? format(selectedDate, 'dd/MM/yyyy')
      : '';
    const modalTitle = 'Confirmar Reserva';
    const modalDescription = `¿Deseas reservar la cancha "${selectedCourtName}" el día ${formattedDate} de ${timeRange}?`;

    setModalTitle(modalTitle);
    setModalDescription(modalDescription);

    // Open the modal
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (selectedCourt && selectedDate && selectedTimeRange) {
      try {
        const [startTime, endTime] = selectedTimeRange.split(' - ');
        const bookingDate = format(selectedDate, 'yyyy-MM-dd');

        const { error } = await supabase.from('bookings').insert([
          {
            court_id: selectedCourt,
            booking_date: bookingDate,
            start_time: startTime,
            end_time: endTime,
            status: 'confirmed',
            // Include other necessary fields like 'booked_by', 'user_phone_number', etc.
          },
        ]);

        if (error) throw error;

        toast({
          title: '¡Reserva Exitosa!',
          description: `Tu reserva ha sido procesada correctamente para ${format(
            selectedDate,
            'dd/MM/yyyy'
          )} de ${startTime} a ${endTime} hs.`,
          duration: 5000,
        });

        // Reset selections
        setSelectedDate(undefined);
        setSelectedCourt(undefined);
        setSelectedCourtName(undefined);
        setSelectedTimeRange(undefined);
        setAvailableCourts([]);
        setAvailableTimes([]);
        setStep(1);
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

  const handleModalConfirm = () => {
    // Close the modal
    setIsModalOpen(false);

    // Proceed to booking
    handleConfirmBooking();
  };

  const handleModalClose = () => {
    // Close the modal
    setIsModalOpen(false);

    // Optionally, reset the selected time range
    // setSelectedTimeRange(undefined);
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
                      {selectedDate && format(selectedDate, 'dd/MM/yyyy')}
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
                            src="/assets/padelcancha.jpeg"
                            alt={court.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                            <Star className="h-5 w-5 text-yellow-500" />
                          </div>
                        </div>
                        <div className="p-4 space-y-2">
                          <h4 className="text-xl font-semibold">{court.name}</h4>
                          <div className="flex items-center text-gray-500 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>Ubicación de la cancha</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              <span className="text-green-600 font-medium">Disponible</span>
                            </div>
                            <Button
                              onClick={() => handleCourtSelect(court.id, court.name)}
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

                  <div className="grid grid-cols-1 gap-3 mt-4">
                    {availableTimes.length > 0 ? (
                      availableTimes.map((slot) => (
                        <Button
                          key={slot.timeRange}
                          variant={
                            selectedTimeRange === slot.timeRange && !slot.isBooked
                              ? 'default'
                              : 'outline'
                          }
                          onClick={() => !slot.isBooked && handleTimeSelect(slot.timeRange)}
                          disabled={slot.isBooked}
                          className={slot.isBooked ? 'opacity-50 cursor-not-allowed' : ''}
                        >
                          {slot.timeRange}
                          {slot.isBooked && (
                            <span className="ml-2 text-red-500">(Reservado)</span>
                          )}
                        </Button>
                      ))
                    ) : (
                      <p>No hay horarios disponibles para esta cancha en la fecha seleccionada.</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      {/* Include the Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        title={modalTitle}
        description={modalDescription}
      />

      <Toaster />
    </div>
  )
}