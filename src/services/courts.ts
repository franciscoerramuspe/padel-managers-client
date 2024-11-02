import { supabase } from '@/lib/supabase'

export const fetchAvailability = async (date: Date) => {
  const { data, error } = await supabase
    .from('courts')
    .select('*')
    
  if (error) {
    throw error
  }

  return data || []
} 