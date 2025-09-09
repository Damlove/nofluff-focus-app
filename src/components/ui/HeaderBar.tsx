import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CustomIcon from '@/components/CustomIcon';

interface HeaderBarProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: any;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightComponent,
  style,
  titleStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            activeOpacity={0.7}
          >
            <CustomIcon name="Back-Chevron" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerSection}>
        {title && (
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>

      <View style={styles.rightSection}>
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#080808',
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#212121',
    borderWidth: 1,
    borderColor: '#2D2D2D',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  title: {
    fontSize: 18,
    fontFamily: 'HelveticaNowDisplay-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
