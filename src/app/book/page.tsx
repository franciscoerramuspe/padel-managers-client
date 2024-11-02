'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const availableTimes = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
]

export default function LuxuryPadelCourtBooking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    return () => {
      document.body.style.background = ''
    }
  }, [])

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
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
      description: `Your court is reserved for ${format(selectedDate!, 'MMMM d, yyyy')} at ${selectedTime}.`,
      duration: 5000,
    })
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
    setSelectedDate(undefined)
    setSelectedTime(undefined)
  }

  return (
    <div className="min-h-screen text-white p-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Luxury Padel Court Booking
      </motion.h1>
      
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Select Your Perfect Day</h2>
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
              <h2 className="text-2xl font-semibold mb-4">Choose Your Ideal Time</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {availableTimes.map((time) => (
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
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Confirm Your Exclusive Booking</DialogTitle>
            <DialogDescription className="text-gray-300">
              You're moments away from securing your premium padel experience.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <p className="text-lg"><span className="font-semibold">Date:</span> {selectedDate && format(selectedDate, 'MMMM d, yyyy')}</p>
            <p className="text-lg"><span className="font-semibold">Time:</span> {selectedTime}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600">
              Reconsider
            </Button>
            <Button onClick={handleConfirmBooking} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Confirm Luxury Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}