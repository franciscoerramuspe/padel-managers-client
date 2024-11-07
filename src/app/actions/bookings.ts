'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export async function createBooking(data: {
  courtId: string;
  date: Date;
  timeRange: string;
  players: string[];
}) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }

    const [startTime, endTime] = data.timeRange.split(' - ');
    const bookingDate = format(data.date, 'yyyy-MM-dd', { locale: es });

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert([
        {
          court_id: data.courtId,
          booking_date: bookingDate,
          start_time: startTime,
          end_time: endTime,
          status: 'confirmed',
          booked_by: user.id,
          players: data.players,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { booking };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

export async function checkUserAuth() {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
