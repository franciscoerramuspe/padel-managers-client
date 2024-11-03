import { supabase } from '@/lib/supabase';
import { format, parse, addHours } from 'date-fns';

export const fetchAvailability = async (date: Date) => {
  const { data, error } = await supabase.from('courts').select('*');

  if (error) {
    throw error;
  }

  return data || [];
};

export const fetchCourtAvailability = async (courtId: string, date: Date) => {
  try {
    // Get the day of week (0-6, where 0 is Sunday)
    const dayOfWeek = date.getDay();
    const formattedDate = format(date, 'yyyy-MM-dd');

    // First, get the court's availability schedule for this day
    const { data: availabilityData, error: availabilityError } = await supabase
      .from('court_availability')
      .select('start_time, end_time')
      .eq('court_id', courtId)
      .eq('day_of_week', dayOfWeek);

    if (availabilityError) throw availabilityError;

    // If no availability is set for this day, return empty array
    if (!availabilityData || availabilityData.length === 0) {
      return { availability: [] };
    }

    // Get existing bookings for this court and date
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('start_time, end_time')
      .eq('court_id', courtId)
      .eq('booking_date', formattedDate)
      .eq('status', 'confirmed');

    if (bookingsError) throw bookingsError;

    // Generate available time slots based on availability schedule
    const availability: { timeRange: string; isBooked: boolean }[] = [];

    availabilityData.forEach(({ start_time, end_time }) => {
      // Generate 1-hour slots between start_time and end_time
      const startDateTime = parse(start_time, 'HH:mm:ss', new Date());
      const endDateTime = parse(end_time, 'HH:mm:ss', new Date());

      let currentSlot = startDateTime;
      while (currentSlot < endDateTime) {
        const slotStart = format(currentSlot, 'HH:mm');
        const slotEnd = format(addHours(currentSlot, 1), 'HH:mm');

        // Check if this slot overlaps with any existing booking
        const isBooked = bookings?.some((booking) => {
          const bookingStart = booking.start_time.slice(0, 5); // Get HH:mm
          const bookingEnd = booking.end_time.slice(0, 5); // Get HH:mm
          return (
            (slotStart >= bookingStart && slotStart < bookingEnd) ||
            (slotEnd > bookingStart && slotEnd <= bookingEnd)
          );
        });

        availability.push({
          timeRange: `${slotStart} - ${slotEnd}`,
          isBooked: !!isBooked,
        });

        currentSlot = addHours(currentSlot, 1);
      }
    });

    return { availability };
  } catch (error) {
    console.error('Error fetching court availability:', error);
    return null;
  }
};
