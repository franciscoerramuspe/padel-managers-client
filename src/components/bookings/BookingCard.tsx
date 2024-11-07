import { useState } from 'react'
import { format, addHours, isBefore } from 'date-fns'
import { es } from 'date-fns/locale'
import { Clock, MapPin, MoreVertical, Receipt, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { BookingConfirmation } from './BookingConfirmation'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface BookingCardProps {
  booking: any;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
}

const canModifyBooking = (bookingDate: string, startTime: string): boolean => {
  const [hours, minutes] = startTime.split(':')
  const bookingDateTime = new Date(bookingDate)
  bookingDateTime.setHours(parseInt(hours), parseInt(minutes))

  const now = new Date()

  const twentyFourHoursBefore = addHours(bookingDateTime, -24)

  return isBefore(now, twentyFourHoursBefore)
}

export function BookingCard({ booking, onReschedule, onCancel }: BookingCardProps) {
  const [showReceipt, setShowReceipt] = useState(false);
  const date = new Date(booking.booking_date + 'T00:00:00-03:00')
  const dayNumber = format(date, 'd')
  const dayName = format(date, 'EEE', { locale: es })
  const month = format(date, 'MMM', { locale: es })
  
  const isModificationAllowed = canModifyBooking(booking.booking_date, booking.start_time)

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
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  disabled={!isModificationAllowed || booking.status !== 'confirmed'}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem 
                  onClick={() => onReschedule(booking.id)}
                  disabled={!isModificationAllowed || booking.status !== 'confirmed'}
                  className="cursor-pointer"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Reprogramar
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. La reserva será cancelada permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => onCancel(booking.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Confirmar Cancelación
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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