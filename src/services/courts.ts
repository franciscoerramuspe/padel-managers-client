import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

export const fetchAvailability = async (date: Date) => {
  const { data, error } = await supabase.from('courts').select('*');

  if (error) {
    throw error;
  }

  return data || [];
};

export const fetchCourtAvailability = async (courtId: string, date: Date) => {
  try {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const response = await fetch(
      `/api/availability/court/${courtId}?date=${formattedDate}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch court availability');
    }

    return data; // Returns an object with id, name, and availability
  } catch (error) {
    console.error('Error fetching court availability:', error);
    return null;
  }
};
