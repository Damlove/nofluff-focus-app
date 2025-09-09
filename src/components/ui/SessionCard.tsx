import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FocusSession } from '@/types/database';

interface SessionCardProps {
  session: FocusSession;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  style?: ViewStyle;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onPress,
  onEdit,
  onDelete,
  showActions = false,
  style,
}) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return 'Not scheduled';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#D1FF1A';
      case 'completed': return '#4ECDC4';
      case 'failed': return '#FF6B6B';
      case 'cancelled': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return 'play-circle';
      case 'completed': return 'check-circle';
      case 'failed': return 'times-circle';
      case 'cancelled': return 'ban';
      default: return 'clock-o';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {session.title}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(session.status) }]}>
            <FontAwesome
              name={getStatusIcon(session.status) as any}
              size={12}
              color="#000000"
            />
            <Text style={styles.statusText}>{session.status}</Text>
          </View>
        </View>
        
        {showActions && (
          <View style={styles.actions}>
            {onEdit && (
              <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
                <FontAwesome name="edit" size={16} color="#8E8E93" />
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
                <FontAwesome name="trash" size={16} color="#FF6B6B" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {session.description && (
        <Text style={styles.description} numberOfLines={2}>
          {session.description}
        </Text>
      )}

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <FontAwesome name="clock-o" size={14} color="#8E8E93" />
          <Text style={styles.detailText}>{formatDuration(session.duration_minutes)}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <FontAwesome name="calendar" size={14} color="#8E8E93" />
          <Text style={styles.detailText}>{formatDateTime(session.scheduled_at)}</Text>
        </View>
        
        {session.app_lock_enabled && (
          <View style={styles.detailItem}>
            <FontAwesome name="lock" size={14} color="#D1FF1A" />
            <Text style={styles.detailText}>App Lock</Text>
          </View>
        )}
        
        {session.essay_required && (
          <View style={styles.detailItem}>
            <FontAwesome name="file-text-o" size={14} color="#D1FF1A" />
            <Text style={styles.detailText}>Essay Required</Text>
          </View>
        )}
      </View>

      {session.total_focus_time > 0 && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>Focus Time:</Text>
          <Text style={styles.progressValue}>
            {formatDuration(session.total_focus_time)} / {formatDuration(session.duration_minutes)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212121',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  title: {
    fontSize: 18,
    fontFamily: 'HelveticaNowDisplay-Bold',
    color: '#FFFFFF',
    flex: 1,
  },
  
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  
  statusText: {
    fontSize: 12,
    fontFamily: 'HelveticaNowDisplay-Bold',
    color: '#000000',
    textTransform: 'capitalize',
  },
  
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#2D2D2D',
  },
  
  description: {
    fontSize: 14,
    fontFamily: 'HelveticaNowDisplay-Regular',
    color: '#CFCFCF',
    marginBottom: 12,
    lineHeight: 20,
  },
  
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  
  detailText: {
    fontSize: 12,
    fontFamily: 'HelveticaNowDisplay-Regular',
    color: '#8E8E93',
  },
  
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#2D2D2D',
  },
  
  progressLabel: {
    fontSize: 12,
    fontFamily: 'HelveticaNowDisplay-Regular',
    color: '#8E8E93',
  },
  
  progressValue: {
    fontSize: 12,
    fontFamily: 'HelveticaNowDisplay-Bold',
    color: '#D1FF1A',
  },
});
