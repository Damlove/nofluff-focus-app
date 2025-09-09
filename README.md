# NoFluff Focus App

A React Native focus app that helps users block distractions and maintain focus through app blocking, commitment essays, and anti-motivation messages.

## Features

- **Focus Sessions**: Create and manage timed focus sessions
- **App Blocking**: Block distracting apps during focus time using Screen Time API
- **Commitment Essays**: Write essays to commit to focus goals
- **Anti-Motivation**: Receive sarcastic messages when breaking focus
- **Milestones**: Track progress and achievements
- **Push Notifications**: Get reminders and updates
- **Paywall Integration**: Superwall integration for premium features

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Supabase** for backend and database
- **OneSignal** for push notifications
- **Superwall** for paywall management
- **OpenAI** for anti-motivation message generation

## Project Structure

```
src/
├── app/                    # Expo Router app structure
│   ├── (onboarding)/      # Onboarding flow screens
│   ├── (tabs)/           # Main app tabs
│   ├── session/          # Session-related screens
│   └── Profile/          # Profile and settings
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   └── __tests__/       # Component tests
├── contexts/            # React contexts for state management
├── hooks/               # Custom React hooks
├── services/            # External service integrations
├── types/               # TypeScript type definitions
└── constants/           # App constants and themes
```

## Setup

### Prerequisites

- Node.js 18+
- Expo CLI
- Supabase account
- OneSignal account
- Superwall account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nofluff-focus-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your API keys
```

4. Set up Supabase:
```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

5. Start the development server:
```bash
npm start
```

## Environment Variables

```env
# Supabase
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OneSignal
EXPO_PUBLIC_ONESIGNAL_APP_ID=your_onesignal_app_id
ONESIGNAL_API_KEY=your_onesignal_api_key

# Superwall
EXPO_PUBLIC_SUPERWALL_API_KEY=your_superwall_api_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

## Database Schema

The app uses Supabase with the following main tables:

- **profiles**: User profile information
- **settings**: User preferences and configuration
- **focus_sessions**: Focus session data and scheduling
- **failure_logs**: Track when users break focus
- **milestones**: Available achievements
- **user_milestones**: User progress toward milestones
- **devices**: Device registration for push notifications
- **app_usage_logs**: Track app usage during focus sessions

## Key Features Implementation

### Focus Sessions
- Create, schedule, and manage focus sessions
- Track session progress and completion
- Block distracting apps during sessions

### App Blocking
- iOS: Screen Time API integration
- Android: Digital Wellbeing API with fallback strategies
- In-app blocking overlays

### Anti-Motivation System
- Sarcastic messages when breaking focus
- Configurable sarcasm levels (1-5)
- Personalized based on user goals

### Push Notifications
- Session reminders
- Milestone celebrations
- Failure notifications

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Building

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## Deployment

The app uses GitHub Actions for CI/CD:

1. Tests run on every push/PR
2. Builds are created for main branch
3. Deploy to app stores via Expo

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@noflufffocus.com or create an issue in the repository.
