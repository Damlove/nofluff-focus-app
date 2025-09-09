# Supabase Setup and Migrations

This directory contains the database schema, migrations, and setup files for the NoFluff Focus app.

## Structure

- `migrations/` - Database migration files
  - `001_initial_schema.sql` - Initial database schema
  - `002_rls_policies.sql` - Row Level Security policies
  - `003_seed_data.sql` - Default data and triggers

## Database Schema

### Core Tables

1. **profiles** - User profile information
2. **settings** - User preferences and configuration
3. **focus_sessions** - Focus session data and scheduling
4. **failure_logs** - Track when users break focus
5. **milestones** - Available achievements
6. **user_milestones** - User progress toward milestones
7. **devices** - Device registration for push notifications
8. **app_usage_logs** - Track app usage during focus sessions

### Key Features

- **Row Level Security (RLS)** - All tables have RLS enabled with user-specific policies
- **Automatic Timestamps** - Created/updated timestamps with triggers
- **Data Integrity** - Foreign key constraints and check constraints
- **Performance** - Indexes on frequently queried columns

## Running Migrations

### Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### Manual Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run each migration file in order:
   - `001_initial_schema.sql`
   - `002_rls_policies.sql`
   - `003_seed_data.sql`

## Environment Variables

Make sure to set these environment variables:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Edge Functions

Edge functions are located in the `supabase/functions/` directory and handle:
- Push notifications
- OpenAI integration
- Webhook processing

## Security

- All user data is protected by RLS policies
- Service role has full access for edge functions
- User can only access their own data
- Sensitive operations require authentication
