import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CustomIcon from '@/components/CustomIcon';

interface IconButtonProps {
  iconName?: string;
  customIconName?: string;
  onPress: () => void;
  size?: number;
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
  variant?: 'circular' | 'rounded' | 'square';
}

export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  customIconName,
  onPress,
  size = 24,
  color = '#FFFFFF',
  backgroundColor = '#212121',
  disabled = false,
  style,
  variant = 'circular',
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    { backgroundColor },
    disabled && styles.disabled,
    style,
  ];

  const iconSize = variant === 'small' ? size * 0.8 : size;

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {customIconName ? (
        <CustomIcon name={customIconName} size={iconSize} color={color} />
      ) : iconName ? (
        <FontAwesome name={iconName as any} size={iconSize} color={color} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    minHeight: 44,
  },
  
  circular: {
    borderRadius: 22,
    width: 44,
    height: 44,
  },
  
  rounded: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  
  square: {
    borderRadius: 4,
    width: 44,
    height: 44,
  },
  
  disabled: {
    opacity: 0.5,
  },
});
