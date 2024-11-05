import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Share2, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface BookingConfirmationProps {
  bookingId: string
  courtName: string
  date: Date
  startTime: string
  endTime: string
  price: number
  onClose?: () => void
}

export function BookingConfirmation({
  bookingId,
  courtName,
  date,
  startTime,
  endTime,
  price,
  onClose
}: BookingConfirmationProps) {
  const handleShare = async () => {
    const bookingDetails = `Reserva en ${courtName}\nFecha: ${format(date, 'dd/MM/yyyy')}\nHorario: ${startTime} - ${endTime}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Comprobante de Reserva',
          text: bookingDetails,
          url: `${window.location.origin}/booking/${bookingId}`
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden">
        {/* Header con imagen de fondo */}
        <div className="relative h-32 bg-gradient-to-br from-green-400 to-green-600">
          <Image
            src="/assets/padelcancha.jpeg"
            alt="Cancha de padel"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-2xl font-bold text-white">Reserva procesada con éxito</h2>
          </div>
        </div>

        {/* Timer section */}
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">Comprobante de reserva</p>
            <p className="text-lg font-semibold">#{bookingId.slice(-6)}</p>
          </div>

          {/* Detalles de la reserva */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">{courtName}</p>
                <p className="text-sm text-gray-500">Ubicación de la cancha</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">{format(date, 'EEEE d MMMM, yyyy', { locale: es })}</p>
                <p className="text-sm text-gray-500">{startTime} - {endTime}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Total</span>
                <span className="text-xl font-bold">${price}</span>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-black hover:bg-gray-800"
              onClick={handleShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Compartir
            </Button>
            {onClose && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Cerrar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 