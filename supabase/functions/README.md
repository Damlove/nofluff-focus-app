# Supabase Edge Functions

This directory contains Supabase Edge Functions that run on Deno runtime.

## Available Functions

### 1. `generate-anti-motivation`
Generates personalized anti-motivation messages based on user failure patterns and sarcasm level.

**Endpoint**: `POST /functions/v1/generate-anti-motivation`

**Request Body**:
```json
{
  "userId": "string",
  "failureType": "app_opened" | "session_abandoned" | "essay_skipped" | "time_limit_exceeded",
  "appName": "string (optional)",
  "sessionDuration": "number (optional)",
  "sarcasmLevel": "number (optional, 1-5)"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Generated anti-motivation message",
  "sarcasmLevel": 3
}
```

### 2. `send-push-notification`
Sends push notifications to user devices via OneSignal.

**Endpoint**: `POST /functions/v1/send-push-notification`

**Request Body**:
```json
{
  "userId": "string",
  "title": "string",
  "body": "string",
  "data": "object (optional)",
  "scheduledTime": "string (optional, ISO format)"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Notification successfully sent to OneSignal for delivery.",
  "oneSignalId": "string"
}
```

## Development

### Local Development
```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase (includes Edge Functions)
supabase start

# Serve functions locally
supabase functions serve --env-file .env.local
```

### Environment Variables
Set these in your Supabase project dashboard under Edge Functions > Secrets:

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `ONESIGNAL_APP_ID`: Your OneSignal app ID
- `ONESIGNAL_API_KEY`: Your OneSignal REST API key
- `OPENAI_API_KEY`: Your OpenAI API key (for future AI features)

### Deployment
```bash
# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy generate-anti-motivation
supabase functions deploy send-push-notification
```

## Notes

- These functions run on Deno runtime, not Node.js
- Use `Deno.env.get()` to access environment variables
- Import from Deno standard library: `https://deno.land/std@0.177.0/`
- Import Supabase client: `https://esm.sh/@supabase/supabase-js@2`
- All functions include CORS headers for web requests
