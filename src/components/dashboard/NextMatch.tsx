import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

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

interface NextMatchProps {
  userId: string | undefined;
  onViewCalendar: () => void;
}

export function NextMatch({ userId, onViewCalendar }: NextMatchProps) {
  const [nextBooking, setNextBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchNextBooking = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          court:courts(name)
        `)
        .eq('booked_by', userId)
        .eq('status', 'confirmed')
        .gte('booking_date', new Date().toISOString().split('T')[0])
        .order('booking_date', { ascending: true })
        .order('start_time', { ascending: true })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching next booking:', error);
        return;
      }

      setNextBooking(data);
    };

    fetchNextBooking();
  }, [userId]);

  if (!nextBooking) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Tus próximas reservas</h3>
          <Button variant="outline" size="sm" onClick={onViewCalendar}>
            Ver Calendario
          </Button>
        </div>
        <p className="text-gray-500 text-sm">No tienes reservas próximas</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Tus próximas reservas</h3>
        <Button variant="outline" size="sm" onClick={onViewCalendar}>
          Ver Calendario
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Calendar className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {format(new Date(nextBooking.booking_date), 'dd/MM/yyyy')}
          </p>
          <p className="text-xl font-semibold">
            {nextBooking.start_time.slice(0, 5)} - {nextBooking.end_time.slice(0, 5)}
          </p>
          <p className="text-sm text-gray-500">{nextBooking.court.name}</p>
        </div>
      </div>
    </div>
  );
} 