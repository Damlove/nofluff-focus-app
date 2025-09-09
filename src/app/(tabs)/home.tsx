import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useFocusSession } from '@/hooks/useFocusSession';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { IconButton } from '@/components/ui/IconButton';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  const { user } = useAuth();
  const { activeSession, startSession, endSession } = useFocusSession();

  const handleStartFocus = async () => {
    const success = await startSession({
      title: 'Quick Focus Session',
      description: 'A focused work session',
      duration_minutes: 25,
      app_limits: ['com.instagram.app', 'com.twitter.ios', 'com.facebook.Facebook'],
      app_lock_enabled: true,
      essay_required: true,
    });

    if (success) {
      console.log('Focus session started successfully');
    }
  };

  const handleEndFocus = async () => {
    if (activeSession) {
      await endSession(activeSession.id, true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Welcome back, {user?.email?.split('@')[0] || 'User'}!
        </Text>
        <Text style={styles.subtitle}>
          Ready to focus and get things done?
        </Text>
      </View>

      {activeSession ? (
        <View style={styles.activeSessionCard}>
          <Text style={styles.activeSessionTitle}>Active Focus Session</Text>
          <Text style={styles.activeSessionDescription}>
            {activeSession.title}
          </Text>
          <Text style={styles.activeSessionDuration}>
            {activeSession.duration_minutes} minutes
          </Text>
          <PrimaryButton
            title="End Session"
            onPress={handleEndFocus}
            variant="danger"
            style={styles.endButton}
          />
        </View>
      ) : (
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionCard} onPress={handleStartFocus}>
            <View style={styles.actionIcon}>
              <FontAwesome name="play" size={24} color="#D1FF1A" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Start Focus Session</Text>
              <Text style={styles.actionDescription}>
                Begin a 25-minute focused work session
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <FontAwesome name="calendar" size={24} color="#4ECDC4" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Schedule Session</Text>
              <Text style={styles.actionDescription}>
                Plan your focus time in advance
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <FontAwesome name="cog" size={24} color="#FF6B6B" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>App Limits</Text>
              <Text style={styles.actionDescription}>
                Block distracting apps during focus
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0m</Text>
            <Text style={styles.statLabel}>Focus Time</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Apps Blocked</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Milestones</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },
  
  header: {
    padding: 20,
    paddingTop: 40,
  },
  
  greeting: {
    fontSize: 28,
    fontFamily: 'HelveticaNowDisplay-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 16,
    fontFamily: 'HelveticaNowDisplay-Regular',
    color: '#CFCFCF',
  },
  
  activeSessionCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#212121',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1FF1A',
  },
  
  activeSessionTitle: {
    fontSize: 18,
    fontFamily: 'HelveticaNowDisplay-Bold',
    color: '#D1FF1A',
    marginBottom: 8,
  },
  
  activeSessionDescription: {
    fontSize: 16,
    fontFamily: 'HelveticaNowDisplay-Regular',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  
  activeSessionDuration: {
    fontSize: 14,
    fontFamily: 'HelveticaNowDisplay-Regular',
    color: '#CFCFCF',
    marginBottom: 16,
  },
  
  endButton: {
    marginTop: 8,
  },
  
  quickActions: {
    padding: 20,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'HelveticaNowDisplay-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#212121',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  actionContent: {
    flex: 1,
  },
  
  actionTitle: {
    fontSize: 16,
    fontFamily: 'HelveticaNowDisplay-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  
  actionDescription: {
    fontSize: 14,
    fontFamily: 'HelveticaNowDisplay-Regular',
    color: '#CFCFCF',
  },
  
  statsSection: {
    padding: 20,
  },
  
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  statCard: {
    width: '48%',
    padding: 16,
    backgroundColor: '#212121',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  
  statNumber: {
    fontSize: 24,
    fontFamily: 'HelveticaNowDisplay-Bold',
    color: '#D1FF1A',
    marginBottom: 4,
  },
  
  statLabel: {
    fontSize: 12,
    fontFamily: 'HelveticaNowDisplay-Regular',
    color: '#CFCFCF',
    textAlign: 'center',
  },
});
