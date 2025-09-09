import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  disabled?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  maxLength?: number;
  showCharacterCount?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  disabled = false,
  style,
  inputStyle,
  maxLength,
  showCharacterCount = false,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = [
    styles.container,
    error && styles.errorContainer,
    isFocused && styles.focusedContainer,
    disabled && styles.disabledContainer,
    style,
  ];

  const textInputStyle = [
    styles.input,
    multiline && styles.multilineInput,
    error && styles.errorInput,
    disabled && styles.disabledInput,
    inputStyle,
  ];

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={textInputStyle}
          placeholder={placeholder}
          placeholderTextColor="#8E8E93"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={toggleSecureEntry}
            disabled={disabled}
          >
            <FontAwesome
              name={isSecure ? 'eye-slash' : 'eye'}
              size={20}
              color="#8E8E93"
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {showCharacterCount && maxLength && (
        <Text style={styles.characterCount}>
          {value.length}/{maxLength}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  
  label: {
    fontSize: 16,
    fontFamily: 'HelveticaNowDisplay-Medium',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#2D2D2D',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'HelveticaNowDisplay-Regular',
    color: '#FFFFFF',
    backgroundColor: '#212121',
  },
  
  multilineInput: {
    height: 'auto',
    minHeight: 48,
    paddingTop: 12,
    paddingBottom: 12,
    textAlignVertical: 'top',
  },
  
  focusedContainer: {
    // Add focus styles if needed
  },
  
  focusedInput: {
    borderColor: '#D1FF1A',
  },
  
  errorContainer: {
    // Add error container styles if needed
  },
  
  errorInput: {
    borderColor: '#FF6B6B',
  },
  
  disabledContainer: {
    opacity: 0.5,
  },
  
  disabledInput: {
    backgroundColor: '#1A1A1A',
  },
  
  eyeButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  
  errorText: {
    fontSize: 14,
    fontFamily: 'HelveticaNowDisplay-Regular',
    color: '#FF6B6B',
    marginTop: 4,
  },
  
  characterCount: {
    fontSize: 12,
    fontFamily: 'HelveticaNowDisplay-Regular',
    color: '#8E8E93',
    textAlign: 'right',
    marginTop: 4,
  },
});
