import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { format } from 'date-fns';

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });

  try {
    const { courtId, date, timeRange, players, rescheduleId } =
      await request.json();

    // Verify user is authenticated
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [startTime, endTime] = timeRange.split(' - ');
    const bookingDate = format(new Date(date), 'yyyy-MM-dd');

    // Check for conflicting bookings
    const { data: conflicts, error: conflictError } = await supabase
      .from('bookings')
      .select('*')
      .eq('court_id', courtId)
      .eq('booking_date', bookingDate)
      .eq('status', 'confirmed')
      .neq('id', rescheduleId || '') // Exclude current booking if rescheduling
      .lt('start_time', endTime)
      .gt('end_time', startTime);

    if (conflictError) throw conflictError;

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json(
        { error: 'This time slot is no longer available' },
        { status: 409 }
      );
    }

    if (rescheduleId) {
      // Update existing booking
      const { data, error } = await supabase
        .from('bookings')
        .update({
          court_id: courtId,
          booking_date: bookingDate,
          start_time: startTime,
          end_time: endTime,
          players,
        })
        .eq('id', rescheduleId)
        .select();

      if (error) throw error;
      return NextResponse.json({ bookingId: rescheduleId });
    } else {
      // Create new booking
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            court_id: courtId,
            booking_date: bookingDate,
            start_time: startTime,
            end_time: endTime,
            status: 'confirmed',
            booked_by: user.id,
            players,
          },
        ])
        .select();

      if (error) throw error;
      return NextResponse.json({ bookingId: data[0].id });
    }
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}
