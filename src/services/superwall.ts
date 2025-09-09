import Superwall from '@superwall/react-native-superwall';
import { Platform } from 'react-native';

export interface SuperwallConfig {
  apiKey: string;
}

export interface PaywallEvent {
  event: string;
  properties?: Record<string, any>;
}

class SuperwallService {
  private isInitialized: boolean = false;
  private config: SuperwallConfig | null = null;

  async initialize(config: SuperwallConfig): Promise<boolean> {
    try {
      if (this.isInitialized) {
        return true;
      }

      this.config = config;

      // Initialize Superwall
      await Superwall.configure(config.apiKey);

      // Set up event listeners
      this.setupEventListeners();

      this.isInitialized = true;
      console.log('Superwall initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize Superwall:', error);
      return false;
    }
  }

  private setupEventListeners(): void {
    // Handle paywall presentation
    Superwall.on('paywallWillPresent', (paywallInfo) => {
      console.log('Paywall will present:', paywallInfo);
    });

    Superwall.on('paywallDidPresent', (paywallInfo) => {
      console.log('Paywall did present:', paywallInfo);
    });

    Superwall.on('paywallWillDismiss', (paywallInfo) => {
      console.log('Paywall will dismiss:', paywallInfo);
    });

    Superwall.on('paywallDidDismiss', (paywallInfo) => {
      console.log('Paywall did dismiss:', paywallInfo);
    });

    // Handle purchase events
    Superwall.on('subscriptionStatusDidChange', (newValue) => {
      console.log('Subscription status changed:', newValue);
    });

    Superwall.on('transactionAbandon', (transactionInfo) => {
      console.log('Transaction abandoned:', transactionInfo);
    });

    Superwall.on('transactionComplete', (transactionInfo) => {
      console.log('Transaction completed:', transactionInfo);
    });

    Superwall.on('transactionFail', (error) => {
      console.log('Transaction failed:', error);
    });

    Superwall.on('transactionRestore', (transactionInfo) => {
      console.log('Transaction restored:', transactionInfo);
    });

    Superwall.on('transactionStart', (product) => {
      console.log('Transaction started:', product);
    });
  }

  async identify(userId: string, attributes?: Record<string, any>): Promise<boolean> {
    try {
      await Superwall.identify(userId, attributes);
      console.log('Superwall user identified:', userId);
      return true;
    } catch (error) {
      console.error('Failed to identify user in Superwall:', error);
      return false;
    }
  }

  async reset(): Promise<boolean> {
    try {
      await Superwall.reset();
      console.log('Superwall reset successfully');
      return true;
    } catch (error) {
      console.error('Failed to reset Superwall:', error);
      return false;
    }
  }

  async setUserAttributes(attributes: Record<string, any>): Promise<boolean> {
    try {
      await Superwall.setUserAttributes(attributes);
      console.log('Superwall user attributes set:', attributes);
      return true;
    } catch (error) {
      console.error('Failed to set user attributes in Superwall:', error);
      return false;
    }
  }

  async track(event: string, properties?: Record<string, any>): Promise<boolean> {
    try {
      await Superwall.track(event, properties);
      console.log('Superwall event tracked:', event, properties);
      return true;
    } catch (error) {
      console.error('Failed to track event in Superwall:', error);
      return false;
    }
  }

  async presentPaywall(event: string, properties?: Record<string, any>): Promise<boolean> {
    try {
      await Superwall.register(event, properties);
      console.log('Superwall paywall presented for event:', event);
      return true;
    } catch (error) {
      console.error('Failed to present paywall:', error);
      return false;
    }
  }

  async getSubscriptionStatus(): Promise<any> {
    try {
      const status = await Superwall.getSubscriptionStatus();
      console.log('Superwall subscription status:', status);
      return status;
    } catch (error) {
      console.error('Failed to get subscription status:', error);
      return null;
    }
  }

  async restorePurchases(): Promise<boolean> {
    try {
      await Superwall.restorePurchases();
      console.log('Superwall purchases restored');
      return true;
    } catch (error) {
      console.error('Failed to restore purchases:', error);
      return false;
    }
  }

  // Feature gating methods
  async isFeatureAvailable(feature: string): Promise<boolean> {
    try {
      const status = await Superwall.getSubscriptionStatus();
      // This would check if the user has access to the feature
      // based on their subscription status
      return status === 'ACTIVE';
    } catch (error) {
      console.error('Failed to check feature availability:', error);
      return false;
    }
  }

  async checkFeatureAccess(feature: string): Promise<boolean> {
    try {
      // This would check if the user has access to the feature
      // and present paywall if they don't
      const hasAccess = await this.isFeatureAvailable(feature);
      if (!hasAccess) {
        await this.presentPaywall(`feature_${feature}_access`);
      }
      return hasAccess;
    } catch (error) {
      console.error('Failed to check feature access:', error);
      return false;
    }
  }

  // Common paywall events for the app
  async presentUpgradePaywall(): Promise<boolean> {
    return await this.presentPaywall('upgrade_prompt');
  }

  async presentFeaturePaywall(feature: string): Promise<boolean> {
    return await this.presentPaywall(`feature_${feature}_paywall`);
  }

  async presentSessionLimitPaywall(): Promise<boolean> {
    return await this.presentPaywall('session_limit_reached');
  }

  async presentMilestonePaywall(): Promise<boolean> {
    return await this.presentPaywall('milestone_celebration');
  }
}

// Export singleton instance
export const superwallService = new SuperwallService();

// Hook for using Superwall in React components
export const useSuperwall = () => {
  const initializeSuperwall = async (config: SuperwallConfig) => {
    return await superwallService.initialize(config);
  };

  const identifyUser = async (userId: string, attributes?: Record<string, any>) => {
    return await superwallService.identify(userId, attributes);
  };

  const trackEvent = async (event: string, properties?: Record<string, any>) => {
    return await superwallService.track(event, properties);
  };

  const presentPaywall = async (event: string, properties?: Record<string, any>) => {
    return await superwallService.presentPaywall(event, properties);
  };

  const getSubscriptionStatus = async () => {
    return await superwallService.getSubscriptionStatus();
  };

  const restorePurchases = async () => {
    return await superwallService.restorePurchases();
  };

  const isFeatureAvailable = async (feature: string) => {
    return await superwallService.isFeatureAvailable(feature);
  };

  const checkFeatureAccess = async (feature: string) => {
    return await superwallService.checkFeatureAccess(feature);
  };

  return {
    initializeSuperwall,
    identifyUser,
    trackEvent,
    presentPaywall,
    getSubscriptionStatus,
    restorePurchases,
    isFeatureAvailable,
    checkFeatureAccess,
    presentUpgradePaywall: superwallService.presentUpgradePaywall.bind(superwallService),
    presentFeaturePaywall: superwallService.presentFeaturePaywall.bind(superwallService),
    presentSessionLimitPaywall: superwallService.presentSessionLimitPaywall.bind(superwallService),
    presentMilestonePaywall: superwallService.presentMilestonePaywall.bind(superwallService),
  };
};
