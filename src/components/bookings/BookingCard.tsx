import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Clock, MapPin, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface BookingCardProps {
  booking: {
    id: string
    court: {
      name: string
    }
    booking_date: string
    start_time: string
    end_time: string
    status: string
  }
  onReschedule: (id: string) => void
  onCancel: (id: string) => void
}

export function BookingCard({ booking, onReschedule, onCancel }: BookingCardProps) {
  const date = new Date(booking.booking_date + 'T00:00:00-03:00')
  const dayNumber = format(date, 'd')
  const dayName = format(date, 'EEE', { locale: es })
  const month = format(date, 'MMM', { locale: es })
  
  return (
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
          <div className="mt-3">
            <span className={`px-2 py-0.5 rounded-full text-sm ${
              booking.status === 'confirmed' 
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {booking.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
            </span>
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
  )
} 