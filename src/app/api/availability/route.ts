import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Get courts with their default availability (from jsonb field)
    const { data: courts, error: courtsError } = await supabase
      .from('courts')
      .select('id, name, availability');

    if (courtsError) throw courtsError;

    // Get bookings for the specified date
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('court_id, start_time, end_time')
      .eq('booking_date', date)
      .eq('status', 'confirmed');

    if (bookingsError) throw bookingsError;

    // Process each court's availability
    const availableCourts = courts.map((court) => {
      const courtBookings = bookings.filter(
        (booking) => booking.court_id === court.id
      );

      // Parse the JSONB availability field
      const defaultAvailability = Array.isArray(court.availability)
        ? court.availability
        : [];

      // Filter out time slots that overlap with any booking
      const availableSlots = defaultAvailability.filter((slot) => {
        const slotHour = parseInt(slot.split(':')[0]);

        return !courtBookings.some((booking) => {
          const bookingStart = new Date(
            `1970-01-01T${booking.start_time}`
          ).getHours();
          const bookingEnd = new Date(
            `1970-01-01T${booking.end_time}`
          ).getHours();

          return slotHour >= bookingStart && slotHour < bookingEnd;
        });
      });

      return {
        id: court.id,
        name: court.name,
        availability: availableSlots,
      };
    });

    return NextResponse.json(availableCourts);
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
