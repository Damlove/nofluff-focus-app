import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useFocusSessions } from '@/contexts/FocusSessionsContext';
import { useAuth } from '@/contexts/AuthContext';
import { SessionCard } from '@/components/ui/SessionCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { IconButton } from '@/components/ui/IconButton';
import { FontAwesome } from '@expo/vector-icons';
import { FocusSession } from '@/types/database';

export default function BlocksScreen() {
  const { scheduledSessions, fetchScheduledSessions, createScheduledSession } = useFocusSessions();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadSessions();
    }
  }, [user]);

  const loadSessions = async () => {
    setIsLoading(true);
    try {
      await fetchScheduledSessions();
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSession = async () => {
    if (!user) return;

    try {
      await createScheduledSession({
        user_id: user.id,
        title: 'New Focus Session',
        description: 'A focused work session',
        duration_minutes: 25,
        scheduled_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
        app_limits: [],
        app_lock_enabled: false,
        essay_required: true,
      });
      
      await loadSessions();
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const handleEditSession = (session: FocusSession) => {
    console.log('Edit session:', session.id);
    // TODO: Navigate to edit session screen
  };

  const handleDeleteSession = async (sessionId: string) => {
    console.log('Delete session:', sessionId);
    // TODO: Implement delete session
  };

  const renderSession = ({ item }: { item: FocusSession }) => (
    <SessionCard
      session={item}
      onEdit={() => handleEditSession(item)}
      onDelete={() => handleDeleteSession(item.id)}
      showActions={true}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <FontAwesome name="calendar-plus-o" size={64} color="#8E8E93" />
      <Text style={styles.emptyTitle}>No Focus Sessions</Text>
      <Text style={styles.emptyDescription}>
        Create your first focus session to start blocking distractions and getting things done.
      </Text>
      <PrimaryButton
        title="Create Session"
        onPress={handleCreateSession}
        style={styles.createButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Focus Sessions</Text>
        <IconButton
          iconName="plus"
          onPress={handleCreateSession}
          backgroundColor="#D1FF1A"
          color="#171717"
        />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading sessions...</Text>
        </View>
      ) : scheduledSessions.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={scheduledSessions}
          renderItem={renderSession}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  
  title: {
    fontSize: 28,
    fontFamily: 'HelveticaNowDisplay-Bold',
    color: '#FFFFFF',
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    fontSize: 16,
    fontFamily: 'HelveticaNowDisplay-Regular',
    color: '#CFCFCF',
  },
  
  listContainer: {
    padding: 20,
  },
  
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'HelveticaNowDisplay-Bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  
  emptyDescription: {
    fontSize: 16,
    fontFamily: 'HelveticaNowDisplay-Regular',
    color: '#CFCFCF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  
  createButton: {
    minWidth: 200,
  },
});
