import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Clock, MapPin, MoreVertical, Receipt } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BookingConfirmation } from './BookingConfirmation'

interface BookingCardProps {
  booking: any;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
}

export function BookingCard({ booking, onReschedule, onCancel }: BookingCardProps) {
  const [showReceipt, setShowReceipt] = useState(false);
  const date = new Date(booking.booking_date + 'T00:00:00-03:00')
  const dayNumber = format(date, 'd')
  const dayName = format(date, 'EEE', { locale: es })
  const month = format(date, 'MMM', { locale: es })
  
  return (
    <>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex gap-4">
          {/* Date */}
          <div className="flex flex-col items-center min-w-[60px]">
            <span className="text-red-500 font-medium capitalize">{dayName}</span>
            <span className="text-3xl font-bold">{dayNumber}</span>
            <span className="text-sm text-gray-500 capitalize">{month}</span>
          </div>

          <div className="flex-1">
            {/* Time and location */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>
                  {booking.start_time.slice(0, 5)} - {booking.end_time.slice(0, 5)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="font-semibold text-gray-800 text-lg">{booking.court.name}</span>
              </div>
            </div>

            {/* Status */}
            <div className="mt-3 flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded-full text-sm ${
                booking.status === 'confirmed' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {booking.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowReceipt(true)}
                disabled={!booking || !booking.court}
              >
                <Receipt className="h-4 w-4 mr-1" />
                Ver comprobante
              </Button>
            </div>
          </div>

          {/* Actions menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onReschedule(booking.id)}>
                Reprogramar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCancel(booking.id)}>
                Cancelar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Booking Receipt Modal */}
      {showReceipt && booking && booking.court && (
        <BookingConfirmation
          bookingId={booking.id}
          courtName={booking.court.name}
          date={date}
          startTime={booking.start_time}
          endTime={booking.end_time}
          price={35}
          players={booking.players || []}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </>
  )
} 