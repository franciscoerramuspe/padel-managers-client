import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Share2, Clock, MapPin, Phone, Share, FileDown, Copy, Users2, Loader2, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { toast } from '@/hooks/toast'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef, useState, useEffect } from 'react';

interface BookingConfirmationProps {
  bookingId: string
  courtName: string
  date: Date
  startTime: string
  endTime: string
  price: number
  players?: string[]
  onClose?: () => void
}

export function BookingConfirmation({
  bookingId,
  courtName,
  date,
  startTime,
  endTime,
  price,
  players = [],
  onClose
}: BookingConfirmationProps) {
  // Validar que todos los datos necesarios estén presentes
  if (!bookingId || !courtName || !date || !startTime || !endTime) {
    console.error('Missing required booking data');
    return null;
  }

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

  const receiptRef = useRef<HTMLDivElement>(null);

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const generatePDF = async () => {
    if (!receiptRef.current || isGeneratingPDF) return;

    try {
      setIsGeneratingPDF(true);
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
        hotfixes: ['px_scaling'],
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      const pdfBlob = pdf.output('blob');
      const newPdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(newPdfUrl);

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        const shareData = {
          files: [
            new File([pdfBlob], 'comprobante-reserva.pdf', {
              type: 'application/pdf',
            }),
          ],
        };
        
        if (navigator.share && navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          window.open(newPdfUrl, '_blank');
        }
      } else {
        window.open(newPdfUrl, '_blank');
      }
    } catch (error) {
      handlePDFError(error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div ref={receiptRef} className="bg-white rounded-3xl max-w-md w-full overflow-hidden animate-in zoom-in-95 shadow-xl">
        {/* Header simplificado */}
        <div className="px-6 py-4 flex items-center">
          <button 
            onClick={onClose} 
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-8">
          {/* Título y monto con mejor espaciado */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">Detalles de la reserva</h2>
            <p className="text-gray-500 text-sm">Comprobante #{bookingId.slice(-6)}</p>
            <div className="mt-6">
              <span className="text-4xl font-bold">${price}</span>
              <span className="text-gray-500 text-sm ml-2">ARS</span>
            </div>
          </div>

          {/* Información de la reserva con mejor diseño */}
          <div className="bg-gray-50 rounded-2xl p-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Cancha</p>
                <p className="font-medium text-lg">{courtName}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecha y hora</p>
                <p className="font-medium">
                  {format(date, 'EEEE d MMMM, yyyy', { locale: es })}
                </p>
                <p className="text-gray-600">
                  {startTime} - {endTime}
                </p>
              </div>
            </div>

            {players.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users2 className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Jugadores</p>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {players.map((player, index) => (
                      <p key={index} className="font-medium">{player}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botón de compartir */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-xl text-base">
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Share2 className="mr-2 h-5 w-5" />
                    Compartir comprobante
                  </>
                )}
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
              <DropdownMenuItem onClick={generatePDF}>
                <FileDown className="h-4 w-4 mr-2" />
                Descargar PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={shareOptions.copy}>
                <Copy className="h-4 w-4 mr-2" />
                Copiar al portapapeles
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
} 

const handlePDFError = (error: any) => {
  let errorMessage = 'No se pudo generar el PDF. Por favor, intente nuevamente.';
  
  if (error instanceof Error) {
    if (error.message.includes('canvas')) {
      errorMessage = 'Error al generar la imagen del comprobante.';
    } else if (error.message.includes('share')) {
      errorMessage = 'Su dispositivo no soporta la función de compartir.';
    }
  }
  
  toast({
    title: 'Error',
    description: errorMessage,
    variant: 'destructive',
  });
};