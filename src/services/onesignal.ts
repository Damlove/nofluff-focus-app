import { Platform } from 'react-native';
import { OneSignal } from 'react-native-onesignal';
import { supabase } from './supabase/client';

/**
 * Initializes the OneSignal SDK with your App ID.
 * This should be called once when the app starts.
 */
export const initializeOneSignal = () => {
  const oneSignalAppId = process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID;
  if (!oneSignalAppId) {
    console.error("CRITICAL: OneSignal App ID is not configured in .env file.");
    return;
  }
  
  // This is the correct v4 method.
  OneSignal.initialize(oneSignalAppId);
  
  // This is the correct v4 method for requesting permission.
  OneSignal.Notifications.requestPermission(true);
};

/**
 * Associates the OneSignal device with your Supabase user ID.
 * @param userId The user's unique ID from Supabase Auth.
 */
export const loginToOneSignal = async (userId: string) => {
  if (!userId) return;

  try {
    // This is the correct v4 method for setting the external user ID.
    OneSignal.login(userId);
    console.log(`OneSignal user logged in with ID: ${userId}`);

    // This is the correct v4 method for getting the player ID.
    const playerId = OneSignal.User.pushSubscription.getPushSubscriptionId();

    if (playerId) {
      const { error } = await supabase
        .from('devices')
        .upsert({
          user_id: userId,
          device_id: playerId,
          platform: Platform.OS as 'ios' | 'android',
          onesignal_player_id: playerId,
          is_active: true,
          last_seen_at: new Date().toISOString(),
        });
      
      if (error) throw error;
      console.log("Successfully saved OneSignal Player ID to Supabase.");
    }
  } catch (e) {
    console.error("Error logging in to OneSignal:", e);
  }
};

/**
 * Disassociates the device from the Supabase user ID upon logout.
 */
export const logoutFromOneSignal = async () => {
  try {
    // This is the correct v4 method.
    OneSignal.logout();
    console.log("OneSignal user logged out.");
  } catch (e) {
    console.error("Error logging out from OneSignal:", e);
  }
};

/**
 * Send a tag to OneSignal for user segmentation.
 */
export const sendTagToOneSignal = (key: string, value: string) => {
  try {
    // This is the correct v4 method.
    OneSignal.User.addTag(key, value);
    console.log(`OneSignal tag sent: ${key} = ${value}`);
  } catch (e) {
    console.error("Error sending tag to OneSignal:", e);
  }
};