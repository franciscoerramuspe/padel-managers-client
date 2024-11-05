import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Share2, Clock, MapPin, Phone  } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { toast } from '@/hooks/toast'

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
  const bookingDetails = `🎾 Reserva en ${courtName}\n📅 Fecha: ${format(date, 'dd/MM/yyyy')}\n⏰ Horario: ${startTime} - ${endTime}\n💳 Total: $${price}`
  
  const shareOptions = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(bookingDetails)}`,
    copy: async () => {
      try {
        await navigator.clipboard.writeText(bookingDetails)
        toast({
          title: "¡Copiado!",
          description: "Los detalles de la reserva se han copiado al portapapeles",
        })
      } catch (err) {
        console.error('Error al copiar:', err)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden animate-in zoom-in-95">
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

          {/* Reemplazar el botón de compartir por el menú desplegable */}
          <div className="flex gap-3 p-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex-1 bg-black hover:bg-gray-800"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => window.open(shareOptions.whatsapp, '_blank')}>
                  <svg 
                    viewBox="0 0 24 24" 
                    className="h-4 w-4 mr-2 fill-green-500"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Compartir por WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareOptions.copy}>
                  <svg 
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar al portapapeles
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
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