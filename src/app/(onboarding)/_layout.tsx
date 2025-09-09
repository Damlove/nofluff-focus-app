// Located at: src/app/(onboarding)/_layout.tsx

import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      {/* We will add more screens here as we build them, e.g., '03_philosophy' */}
    </Stack>
  );
}