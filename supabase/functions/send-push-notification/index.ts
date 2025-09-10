import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

// Define the shape of the incoming request data
interface NotificationPayload {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, any>; // Use a more specific type for JSON data
  scheduledTime?: string;
}

serve(async (req) => {
  // Handle CORS preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Securely create a Supabase client with the service role key
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Parse the JSON payload from the request
    const { userId, title, body, data, scheduledTime }: NotificationPayload = await req.json();

    // Validate the required fields
    if (!userId || !title || !body) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: userId, title, body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // --- THIS IS THE FIX ---
    // Fetch ALL active devices for the user, not just a single one.
    const { data: devices, error: deviceError } = await supabaseClient
      .from('devices')
      .select('onesignal_player_id')
      .eq('user_id', userId)
      .eq('is_active', true);

    if (deviceError) throw deviceError;

    // Check if any devices were found
    if (!devices || devices.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No active devices found for this user.' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract just the player IDs into an array of strings
    const playerIds = devices.map(d => d.onesignal_player_id).filter(id => id);

    // Call the OneSignal API to send the notification
    const oneSignalResponse = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Deno.env.get('ONESIGNAL_API_KEY')}`,
      },
      body: JSON.stringify({
        app_id: Deno.env.get('ONESIGNAL_APP_ID'),
        include_player_ids: playerIds, // Send to all of the user's devices
        headings: { en: title },
        contents: { en: body },
        data: data || {},
        send_after: scheduledTime,
      }),
    });

    if (!oneSignalResponse.ok) {
      const errorText = await oneSignalResponse.text();
      throw new Error(`OneSignal API error: ${oneSignalResponse.status} ${errorText}`);
    }

    const oneSignalResult = await oneSignalResponse.json();

    // Log the successful notification send to our database
    await supabaseClient
      .from('notification_logs')
      .insert({
        user_id: userId,
        title,
        body,
        data: data || {},
        onesignal_id: oneSignalResult.id,
        status: 'sent',
      });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification successfully sent to OneSignal for delivery.',
        oneSignalId: oneSignalResult.id,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});