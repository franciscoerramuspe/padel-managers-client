'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { format } from 'date-fns'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin } from 'lucide-react'

type Booking = {
  id: string
  court_id: string
  booking_date: string
  start_time: string
  end_time: string
  status: string
  court: {
    name: string
  }
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) return

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          court:courts(name)
        `)
        .eq('booked_by', userId)
        .order('booking_date', { ascending: true })

      if (error) {
        console.error('Error fetching bookings:', error)
        return
      }

      setBookings(data)
      setLoading(false)
    }

    fetchBookings()
  }, [userId])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500'
      case 'cancelled':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mis Reservas</h1>
        
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
                      </Badge>
                      <h3 className="text-xl font-semibold">{booking.court.name}</h3>
                    </div>
                    
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(booking.booking_date), 'dd/MM/yyyy')}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {booking.start_time.slice(0, 5)} - {booking.end_time.slice(0, 5)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>Ubicación de la cancha</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {bookings.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No tienes reservas registradas
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
