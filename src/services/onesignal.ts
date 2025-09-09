import { Platform } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { supabase } from './supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface OneSignalConfig {
  appId: string;
  apiKey?: string;
}

class OneSignalService {
  private isInitialized: boolean = false;
  private playerId: string | null = null;

  async initialize(config: OneSignalConfig): Promise<boolean> {
    try {
      if (this.isInitialized) {
        return true;
      }

      // Initialize OneSignal
      OneSignal.initialize(config.appId);

      // Set up event listeners
      this.setupEventListeners();

      // Get the player ID
      const deviceState = await OneSignal.getDeviceState();
      this.playerId = deviceState?.userId || null;

      this.isInitialized = true;
      console.log('OneSignal initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize OneSignal:', error);
      return false;
    }
  }

  private setupEventListeners(): void {
    // Handle notification received
    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('OneSignal notification clicked:', event);
      this.handleNotificationClick(event);
    });

    // Handle notification received while app is in foreground
    OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
      console.log('OneSignal notification received in foreground:', event);
      // You can customize the notification display here
    });

    // Handle permission changes
    OneSignal.Notifications.addEventListener('permissionChanged', (permission) => {
      console.log('OneSignal permission changed:', permission);
    });
  }

  private handleNotificationClick(event: any): void {
    // Handle notification click based on the notification data
    const data = event.notification.additionalData;
    
    if (data?.type === 'focus_reminder') {
      // Navigate to focus session
      console.log('Focus reminder clicked');
    } else if (data?.type === 'milestone_achieved') {
      // Navigate to milestone celebration
      console.log('Milestone notification clicked');
    } else if (data?.type === 'session_failed') {
      // Navigate to failure log
      console.log('Session failure notification clicked');
    }
  }

  async requestPermission(): Promise<boolean> {
    try {
      const permission = await OneSignal.Notifications.requestPermission(true);
      return permission;
    } catch (error) {
      console.error('Failed to request OneSignal permission:', error);
      return false;
    }
  }

  async getPlayerId(): Promise<string | null> {
    try {
      if (this.playerId) {
        return this.playerId;
      }

      const deviceState = await OneSignal.getDeviceState();
      this.playerId = deviceState?.userId || null;
      return this.playerId;
    } catch (error) {
      console.error('Failed to get OneSignal player ID:', error);
      return null;
    }
  }

  async storePlayerIdToDatabase(userId: string): Promise<boolean> {
    try {
      const playerId = await this.getPlayerId();
      if (!playerId) {
        console.error('No OneSignal player ID available');
        return false;
      }

      const { error } = await supabase
        .from('devices')
        .upsert({
          user_id: userId,
          device_id: playerId,
          platform: Platform.OS as 'ios' | 'android' | 'web',
          onesignal_player_id: playerId,
          is_active: true,
          last_seen_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Failed to store OneSignal player ID:', error);
        return false;
      }

      console.log('OneSignal player ID stored successfully');
      return true;
    } catch (error) {
      console.error('Failed to store OneSignal player ID:', error);
      return false;
    }
  }

  async sendTag(key: string, value: string): Promise<boolean> {
    try {
      OneSignal.User.addTag(key, value);
      return true;
    } catch (error) {
      console.error('Failed to send OneSignal tag:', error);
      return false;
    }
  }

  async removeTag(key: string): Promise<boolean> {
    try {
      OneSignal.User.removeTag(key);
      return true;
    } catch (error) {
      console.error('Failed to remove OneSignal tag:', error);
      return false;
    }
  }

  async setExternalUserId(userId: string): Promise<boolean> {
    try {
      OneSignal.login(userId);
      return true;
    } catch (error) {
      console.error('Failed to set OneSignal external user ID:', error);
      return false;
    }
  }

  async logout(): Promise<boolean> {
    try {
      OneSignal.logout();
      return true;
    } catch (error) {
      console.error('Failed to logout from OneSignal:', error);
      return false;
    }
  }

  // Notification scheduling methods
  async scheduleLocalNotification(
    title: string,
    body: string,
    scheduledTime: Date,
    data?: any
  ): Promise<boolean> {
    try {
      // OneSignal doesn't have direct local notification scheduling
      // This would typically be handled by the backend or edge functions
      console.log('Scheduling local notification:', { title, body, scheduledTime, data });
      return true;
    } catch (error) {
      console.error('Failed to schedule local notification:', error);
      return false;
    }
  }

  async cancelScheduledNotification(notificationId: string): Promise<boolean> {
    try {
      // OneSignal doesn't have direct local notification cancellation
      console.log('Canceling scheduled notification:', notificationId);
      return true;
    } catch (error) {
      console.error('Failed to cancel scheduled notification:', error);
      return false;
    }
  }
}

// Export singleton instance
export const oneSignalService = new OneSignalService();

// Hook for using OneSignal in React components
export const useOneSignal = () => {
  const { user } = useAuth();

  const initializeOneSignal = async (config: OneSignalConfig) => {
    const success = await oneSignalService.initialize(config);
    if (success && user) {
      await oneSignalService.setExternalUserId(user.id);
      await oneSignalService.storePlayerIdToDatabase(user.id);
    }
    return success;
  };

  const requestPermission = async () => {
    return await oneSignalService.requestPermission();
  };

  const sendTag = async (key: string, value: string) => {
    return await oneSignalService.sendTag(key, value);
  };

  const removeTag = async (key: string) => {
    return await oneSignalService.removeTag(key);
  };

  return {
    initializeOneSignal,
    requestPermission,
    sendTag,
    removeTag,
    getPlayerId: oneSignalService.getPlayerId.bind(oneSignalService),
  };
};
