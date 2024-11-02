'use client'

import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Calendar } from '../../components/ui/calendar'
import { Button } from '../../components/ui/button'
import { useToast } from '../../components/ui/use-toast'
import { Toaster } from '../../components/ui/toaster'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { motion, AnimatePresence } from 'framer-motion'

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

export default function AdvancedPadelCourtBooking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedCourt, setSelectedCourt] = useState<string | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [availableCourts, setAvailableCourts] = useState<Court[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  const handleDateSelect = async (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedCourt(undefined)
    setSelectedTime(undefined)
    
    if (date) {
      const courts = await fetchAvailability(date)
      setAvailableCourts(courts)
    }
  }

  const handleCourtSelect = (courtId: string) => {
    setSelectedCourt(courtId)
    setSelectedTime(undefined)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setIsModalOpen(true)
  }

  const handleConfirmBooking = () => {
    setIsModalOpen(false)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Advanced Padel Court Booking
      </motion.h1>
      
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Select Your Date</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border border-gray-600 bg-gray-800/50 p-4"
          />
        </motion.div>

        <AnimatePresence>
          {selectedDate && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Choose Your Court</h2>
              <Select onValueChange={handleCourtSelect}>
                <SelectTrigger className="w-full bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Select a court" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600 text-white">
                  {availableCourts.map((court) => (
                    <SelectItem key={court.id} value={court.id}>{court.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedCourt && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Available Time Slots</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availableCourts
                  .find(court => court.id === selectedCourt)
                  ?.availability.map((time) => (
                    <Button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      variant="outline"
                      className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-600 text-white transition-all duration-300 transform hover:scale-105"
                    >
                      {time}
                    </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Confirm Your Booking
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Please review your booking details below.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Date:</span> {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Court:</span> {availableCourts.find(c => c.id === selectedCourt)?.name}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Time:</span> {selectedTime}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600">
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}