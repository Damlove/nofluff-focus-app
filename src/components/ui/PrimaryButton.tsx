import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const buttonTextStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#171717' : '#D1FF1A'} 
          size="small" 
        />
      ) : (
        <Text style={buttonTextStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  // Variants
  primary: {
    backgroundColor: '#D1FF1A',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#D1FF1A',
  },
  danger: {
    backgroundColor: '#FF6B6B',
  },
  
  // Sizes
  small: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    minHeight: 44,
  },
  medium: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    minHeight: 56,
  },
  large: {
    paddingVertical: 22,
    paddingHorizontal: 32,
    minHeight: 64,
  },
  
  // States
  disabled: {
    opacity: 0.5,
  },
  
  // Text styles
  text: {
    fontFamily: 'HelveticaNowDisplay-Bold',
    textAlign: 'center',
  },
  primaryText: {
    color: '#171717',
  },
  secondaryText: {
    color: '#D1FF1A',
  },
  dangerText: {
    color: '#FFFFFF',
  },
  
  // Text sizes
  smallText: {
    fontSize: 16,
  },
  mediumText: {
    fontSize: 18,
  },
  largeText: {
    fontSize: 20,
  },
  
  disabledText: {
    opacity: 0.7,
  },
});
