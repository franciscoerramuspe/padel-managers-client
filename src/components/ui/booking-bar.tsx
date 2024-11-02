import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface BookingBarProps {
  price: number
  courtId: string
}

export function BookingBar({ price, courtId }: BookingBarProps) {
  const router = useRouter()

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-green-100 to-white border-t border-green-100">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-between gap-4 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-green-600">${price}</span>
            </div>
            <span className="text-sm text-gray-500">por hora</span>
          </div>
    
          <Button 
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 rounded-xl text-base font-medium shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all duration-300 hover:scale-[1.02]"
            onClick={() => router.push(`/book?court=${courtId}`)}
          >
            Reservar Ahora
          </Button>
        </div>
      </div>
    </div>
  )
} 