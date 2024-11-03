import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { DateTime } from 'luxon';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Fetch the court's default availability
    const { data: court, error: courtError } = await supabase
      .from('courts')
      .select('id, name, availability')
      .eq('id', params.id)
      .single();

    if (courtError) throw courtError;
    if (!court) {
      return NextResponse.json({ error: 'Court not found' }, { status: 404 });
    }

    // Fetch bookings for this court on the selected date
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('start_time, end_time')
      .eq('court_id', court.id)
      .eq('booking_date', date);

    if (bookingsError) throw bookingsError;

    // Parse the court's availability from JSONB
    const defaultAvailability: string[] = Array.isArray(court.availability)
      ? court.availability
      : [];

    // Define your local time zone
    const localTimeZone = 'America/New_York'; // Replace with your actual local time zone

    // Convert bookings to time ranges in minutes
    const bookingRanges = bookings.map((booking) => {
      const bookingStart = DateTime.fromISO(booking.start_time).setZone(
        localTimeZone
      );
      const bookingEnd = DateTime.fromISO(booking.end_time).setZone(
        localTimeZone
      );

      return {
        start: bookingStart.hour * 60 + bookingStart.minute,
        end: bookingEnd.hour * 60 + bookingEnd.minute,
      };
    });

    // Create an array of all time slots with their booking status
    const availabilityWithStatus = defaultAvailability.map((slot) => {
      const [slotStartStr, slotEndStr] = slot.split(' - ');
      const slotStart = DateTime.fromFormat(slotStartStr, 'HH:mm', {
        zone: localTimeZone,
      });
      const slotEnd = DateTime.fromFormat(slotEndStr, 'HH:mm', {
        zone: localTimeZone,
      });

      const slotStartMinutes = slotStart.hour * 60 + slotStart.minute;
      const slotEndMinutes = slotEnd.hour * 60 + slotEnd.minute;

      // Check if the slot overlaps with any booking
      const isBooked = bookingRanges.some((booking) => {
        return slotStartMinutes < booking.end && slotEndMinutes > booking.start;
      });

      return {
        timeRange: slot,
        isBooked,
      };
    });

    // Sort the availability from earliest to latest
    availabilityWithStatus.sort((a, b) => {
      const [aStartStr] = a.timeRange.split(' - ');
      const [bStartStr] = b.timeRange.split(' - ');

      const aStart = DateTime.fromFormat(aStartStr, 'HH:mm', {
        zone: localTimeZone,
      });
      const bStart = DateTime.fromFormat(bStartStr, 'HH:mm', {
        zone: localTimeZone,
      });

      return aStart.toMillis() - bStart.toMillis();
    });

    return NextResponse.json({
      id: court.id,
      name: court.name,
      availability: availabilityWithStatus,
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
