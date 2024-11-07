import { NextRequest } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const searchParams = request.nextUrl.searchParams;
  const courtId = searchParams.get('courtId');
  const date = searchParams.get('date');

  if (!courtId || !date) {
    return new Response('Missing parameters', { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  // Set up Supabase realtime subscription
  const subscription = supabase
    .channel('booking-updates')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'bookings',
        filter: `court_id=eq.${courtId},booking_date=eq.${date}`,
      },
      async () => {
        // Fetch updated availability
        const { data: availability } = await supabase
          .from('courts')
          .select('availability')
          .eq('id', courtId)
          .single();

        // Send update through SSE
        const data = `data: ${JSON.stringify(availability)}\n\n`;
        await writer.write(encoder.encode(data));
      }
    )
    .subscribe();

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
