import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const bookingsPerPage = 3;

  useEffect(() => {
    const fetchBookings = async () => {
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
        .limit(10);

      if (error) {
        console.error('Error fetching bookings:', error);
        return;
      }

      setBookings(data || []);
    };

    fetchBookings();
  }, [userId]);

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);
  const currentBookings = bookings.slice(
    currentPage * bookingsPerPage,
    (currentPage + 1) * bookingsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  if (!bookings.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Tus próximas reservas</h3>
          <Button variant="outline" size="sm" onClick={onViewCalendar}>
            Ver Calendario
          </Button>
        </div>
        <div className="flex items-center justify-center py-8 text-gray-500">
          <p>No tienes reservas próximas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Tus próximas reservas</h3>
        <div className="flex items-center gap-2">
          {bookings.length > bookingsPerPage && (
            <div className="flex items-center gap-1 mr-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevPage}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-500">
                {currentPage + 1}/{totalPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextPage}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={onViewCalendar}>
            Ver Calendario
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          {currentBookings.map((booking) => (
            <div key={booking.id} className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {format(new Date(booking.booking_date), 'dd/MM/yyyy')}
                </p>
                <p className="text-xl font-semibold">
                  {booking.start_time.slice(0, 5)} - {booking.end_time.slice(0, 5)}
                </p>
                <p className="text-sm text-gray-500">{booking.court.name}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 