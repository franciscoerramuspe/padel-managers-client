import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // First verify the booking exists and is not already cancelled
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', params.id)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Booking is already cancelled' },
        { status: 400 }
      );
    }

    // Update the booking status to cancelled
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', params.id);

    if (updateError) throw updateError;

    return NextResponse.json({
      message: 'Booking cancelled successfully',
      status: 'cancelled',
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { error: 'Failed to cancel booking' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { start_time, end_time, booking_date } = body;

    // Validate required fields
    if (!start_time || !end_time || !booking_date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // First verify the booking exists and is not cancelled
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', params.id)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Cannot modify a cancelled booking' },
        { status: 400 }
      );
    }

    // Check for conflicting bookings
    const { data: conflicts, error: conflictError } = await supabase
      .from('bookings')
      .select('*')
      .eq('court_id', booking.court_id)
      .eq('booking_date', booking_date)
      .neq('id', params.id)
      .or(`start_time.overlaps.[${start_time},${end_time}]`);

    if (conflictError) throw conflictError;

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json(
        { error: 'This time slot is no longer available' },
        { status: 409 }
      );
    }

    // Update the booking
    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        start_time,
        end_time,
        booking_date,
      })
      .eq('id', params.id);

    if (updateError) throw updateError;

    return NextResponse.json({
      message: 'Booking updated successfully',
      status: 'confirmed',
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
