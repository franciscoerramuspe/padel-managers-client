import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../../src/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } } // Changed from courtId to id to match folder structure
) {
  try {
    const { data, error } = await supabase
      .from('courts')
      .select('availability')
      .eq('id', params.id) // Changed from params.courtId to params.id
      .single();

    if (error) throw error;

    // Add null check for data
    if (!data) {
      return NextResponse.json({ error: 'Court not found' }, { status: 404 });
    }

    return NextResponse.json(data.availability);
  } catch (error) {
    console.error('Error fetching court availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch court availability' },
      { status: 500 }
    );
  }
}
