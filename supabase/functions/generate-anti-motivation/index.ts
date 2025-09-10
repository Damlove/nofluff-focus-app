import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface AntiMotivationRequest {
  userId: string;
  failureType: 'app_opened' | 'session_abandoned' | 'essay_skipped' | 'time_limit_exceeded';
  appName?: string;
  sessionDuration?: number;
  sarcasmLevel?: number;
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
    const { userId, failureType, appName, sessionDuration, sarcasmLevel = 3 }: AntiMotivationRequest = await req.json()

    if (!userId || !failureType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: userId, failureType' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get user settings for personalization
    const { data: settings } = await supabaseClient
      .from('settings')
      .select('sarcasm_level, primary_focus_goal')
      .eq('user_id', userId)
      .single()

    const userSarcasmLevel = settings?.sarcasm_level || sarcasmLevel
    const focusGoal = settings?.primary_focus_goal || 'productivity'

    // Generate anti-motivation message based on failure type
    const message = await generateAntiMotivationMessage({
      failureType,
      appName,
      sessionDuration,
      sarcasmLevel: userSarcasmLevel,
      focusGoal,
    })

    // Log the generated message
    await supabaseClient
      .from('anti_motivation_logs')
      .insert({
        user_id: userId,
        failure_type: failureType,
        app_name: appName,
        message,
        sarcasm_level: userSarcasmLevel,
        created_at: new Date().toISOString(),
      })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message,
        sarcasmLevel: userSarcasmLevel 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error generating anti-motivation message:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate anti-motivation message',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

async function generateAntiMotivationMessage({
  failureType,
  appName,
  sessionDuration,
  sarcasmLevel,
  focusGoal,
}: {
  failureType: string;
  appName?: string;
  sessionDuration?: number;
  sarcasmLevel: number;
  focusGoal: string;
}): Promise<string> {
  
  // Define message templates based on sarcasm level
  const templates = {
    1: { // Low sarcasm - gentle reminders
      app_opened: [
        `Hey, remember your ${focusGoal} goal? Maybe try focusing for a bit longer.`,
        `That ${appName || 'app'} can wait. Your ${focusGoal} is more important right now.`,
        `Just a gentle reminder: you're supposed to be focusing on ${focusGoal}.`,
      ],
      session_abandoned: [
        `It's okay, everyone has off days. Try again when you're ready.`,
        `Don't worry about it. Your ${focusGoal} journey continues tomorrow.`,
        `That's alright. Focus is a skill that takes practice.`,
      ],
      essay_skipped: [
        `Writing helps clarify your commitment to ${focusGoal}. Maybe try a shorter version?`,
        `The essay is just a few sentences about why ${focusGoal} matters to you.`,
        `Even a brief note about your ${focusGoal} goals can help.`,
      ],
      time_limit_exceeded: [
        `Time's up! How did you do with your ${focusGoal} session?`,
        `That's your focus time complete. Ready to tackle ${focusGoal}?`,
        `Session finished. Hope you made progress on ${focusGoal}!`,
      ],
    },
    2: { // Medium sarcasm - mild teasing
      app_opened: [
        `Oh look, ${appName || 'another distraction'}. How surprising.`,
        `Really? ${appName || 'This app'} right now? Your ${focusGoal} can wait, I guess.`,
        `Of course you opened ${appName || 'that app'}. Your ${focusGoal} goals are clearly very important.`,
      ],
      session_abandoned: [
        `Well, that didn't last long. Your ${focusGoal} dreams must not be that important.`,
        `Giving up already? I'm sure your ${focusGoal} goals will achieve themselves.`,
        `Another session abandoned. Your ${focusGoal} is probably fine with mediocrity.`,
      ],
      essay_skipped: [
        `Can't even write a few words about why ${focusGoal} matters? That's commitment.`,
        `Too hard to explain why ${focusGoal} is important? I'm sure it's not that important then.`,
        `Skipping the essay? Your ${focusGoal} goals must be really well thought out.`,
      ],
      time_limit_exceeded: [
        `Time's up! Did you actually focus on ${focusGoal} or just pretend to?`,
        `Session complete. I'm sure you made amazing progress on ${focusGoal}.`,
        `That's it for today. Your ${focusGoal} is probably very impressed.`,
      ],
    },
    3: { // High sarcasm - moderate roasting
      app_opened: [
        `Wow, ${appName || 'another app'}. Your ${focusGoal} goals must be thrilled.`,
        `Of course you opened ${appName || 'that'}. Your ${focusGoal} can definitely wait for this.`,
        `Great job! ${appName || 'This app'} is definitely more important than ${focusGoal}.`,
      ],
      session_abandoned: [
        `Another session bites the dust. Your ${focusGoal} goals are probably used to disappointment.`,
        `Giving up again? Your ${focusGoal} dreams are probably getting tired of being abandoned.`,
        `Well, that was predictable. Your ${focusGoal} goals must love being second priority.`,
      ],
      essay_skipped: [
        `Can't even write about why ${focusGoal} matters? That's some serious commitment right there.`,
        `Too lazy to explain your ${focusGoal} goals? I'm sure they're very well thought out.`,
        `Skipping the essay? Your ${focusGoal} must not be that important to you then.`,
      ],
      time_limit_exceeded: [
        `Time's up! I'm sure you made incredible progress on ${focusGoal}.`,
        `Session complete. Your ${focusGoal} is probably very proud of your dedication.`,
        `That's it for today. Your ${focusGoal} goals must be so impressed.`,
      ],
    },
    4: { // Very high sarcasm - heavy roasting
      app_opened: [
        `Oh perfect! ${appName || 'Another distraction'}! Your ${focusGoal} goals are absolutely loving this.`,
        `Brilliant choice! ${appName || 'This app'} is definitely more important than ${focusGoal}.`,
        `Excellent prioritization! ${appName || 'This'} over ${focusGoal}? Genius.`,
      ],
      session_abandoned: [
        `Shocking! Another abandoned session. Your ${focusGoal} goals must be so surprised.`,
        `Wow, giving up again? Your ${focusGoal} dreams are probably getting used to being let down.`,
        `Another failure! Your ${focusGoal} goals are probably throwing a party right now.`,
      ],
      essay_skipped: [
        `Can't even write about ${focusGoal}? Your goals must be incredibly well-defined.`,
        `Too much effort to explain why ${focusGoal} matters? That's some serious dedication.`,
        `Skipping the essay? Your ${focusGoal} goals are probably very impressed with your commitment.`,
      ],
      time_limit_exceeded: [
        `Time's up! Your ${focusGoal} is probably amazed by your incredible focus.`,
        `Session complete! Your ${focusGoal} goals must be so proud of your dedication.`,
        `That's it! Your ${focusGoal} is probably celebrating your amazing progress.`,
      ],
    },
    5: { // Maximum sarcasm - brutal roasting
      app_opened: [
        `OH WOW! ${appName || 'ANOTHER APP'}! Your ${focusGoal} goals are absolutely THRILLED!`,
        `BRILLIANT! ${appName || 'This'} over ${focusGoal}? Your priorities are PERFECT!`,
        `AMAZING! ${appName || 'This app'} is definitely more important than ${focusGoal}!`,
      ],
      session_abandoned: [
        `SHOCKING! Another abandoned session! Your ${focusGoal} goals are SO surprised!`,
        `WOW! Giving up again? Your ${focusGoal} dreams are probably THRILLED!`,
        `ANOTHER FAILURE! Your ${focusGoal} goals are probably CELEBRATING!`,
      ],
      essay_skipped: [
        `Can't write about ${focusGoal}? Your goals are SO well thought out!`,
        `Too hard to explain ${focusGoal}? That's some SERIOUS commitment!`,
        `Skipping the essay? Your ${focusGoal} goals are SO impressed!`,
      ],
      time_limit_exceeded: [
        `Time's up! Your ${focusGoal} is AMAZED by your incredible focus!`,
        `Session complete! Your ${focusGoal} goals are SO proud!`,
        `That's it! Your ${focusGoal} is CELEBRATING your amazing progress!`,
      ],
    },
  }

  const levelTemplates = templates[sarcasmLevel as keyof typeof templates] || templates[3]
  const typeTemplates = levelTemplates[failureType as keyof typeof levelTemplates] || levelTemplates.app_opened
  
  // Select random template
  const randomIndex = Math.floor(Math.random() * typeTemplates.length)
  return typeTemplates[randomIndex]
}
