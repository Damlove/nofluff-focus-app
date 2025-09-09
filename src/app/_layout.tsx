import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

// Import all custom context providers, INCLUDING the useAuth hook
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { SessionProvider } from '@/contexts/SessionContext';
import { FocusSessionsProvider } from '@/contexts/FocusSessionsContext';
import { MilestoneProvider } from '@/contexts/MilestoneContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { LockProvider } from '@/contexts/LockContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// This is the gatekeeper component that handles auth-based navigation.
function InitialLayout() {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until the auth state is known before making navigation decisions.
    if (isLoadingAuth) {
      return;
    }

    // If the user is authenticated, redirect them to the main app.
    if (isAuthenticated) {
      router.replace('/(tabs)/home');
    } 
    // If not authenticated, the router will automatically render the initial route,
    // which should be the `(onboarding)` group. No `else` is needed.

  }, [isAuthenticated, isLoadingAuth, router]);

  // While checking for an existing session, the splash screen remains visible.
  if (isLoadingAuth) {
    return null;
  }

  // This Stack renders the correct navigator (onboarding or tabs) based on the URL.
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      <Stack.Screen name="paywall" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="session" options={{ headerShown: false }} />
    </Stack>
  );
}

// This is the main component for the file, now clean and organized.
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
    'HelveticaNowDisplay-Bold': require('@/assets/fonts/HelveticaNowDisplay-Bold.ttf'),
    'HelveticaNowDisplay-Regular': require('@/assets/fonts/HelveticaNowDisplay-Regular.ttf'),
    'HelveticaNowDisplay-Medium': require('@/assets/fonts/HelveticaNowDisplay-Medium.ttf'),
    'IcoMoon': require('@/assets/fonts/icomoon.ttf'),
  });

  useEffect(() => {
    if (error) {
      console.error("Font loading error:", error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // All providers are wrapped here, in one clean place.
  return (
    <AuthProvider>
      <SettingsProvider>
        <SessionProvider>
          <FocusSessionsProvider>
            <MilestoneProvider>
              <OnboardingProvider>
                <LockProvider>
                  <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <InitialLayout />
                  </ThemeProvider>
                </LockProvider>
              </OnboardingProvider>
            </MilestoneProvider>
          </FocusSessionsProvider>
        </SessionProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}