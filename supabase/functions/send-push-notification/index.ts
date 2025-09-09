import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NotificationPayload {
  userId: string;
  title: string;
  body: string;
  data?: any;
  scheduledTime?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse request body
    const { userId, title, body, data, scheduledTime }: NotificationPayload = await req.json()

    if (!userId || !title || !body) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: userId, title, body' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get user's OneSignal player ID
    const { data: device, error: deviceError } = await supabaseClient
      .from('devices')
      .select('onesignal_player_id')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single()

    if (deviceError || !device?.onesignal_player_id) {
      return new Response(
        JSON.stringify({ error: 'User device not found or OneSignal not configured' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Send notification via OneSignal API
    const oneSignalResponse = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Deno.env.get('ONESIGNAL_API_KEY')}`,
      },
      body: JSON.stringify({
        app_id: Deno.env.get('ONESIGNAL_APP_ID'),
        include_player_ids: [device.onesignal_player_id],
        headings: { en: title },
        contents: { en: body },
        data: data || {},
        send_after: scheduledTime || undefined,
      }),
    })

    if (!oneSignalResponse.ok) {
      const errorText = await oneSignalResponse.text()
      throw new Error(`OneSignal API error: ${errorText}`)
    }

    const oneSignalResult = await oneSignalResponse.json()

    // Log notification in database
    await supabaseClient
      .from('notification_logs')
      .insert({
        user_id: userId,
        title,
        body,
        data: data || {},
        onesignal_id: oneSignalResult.id,
        status: 'sent',
        sent_at: new Date().toISOString(),
      })

    return new Response(
      JSON.stringify({ 
        success: true, 
        notificationId: oneSignalResult.id,
        message: 'Notification sent successfully' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error sending push notification:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send notification',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
