import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useOnboarding } from '@/contexts/OnboardingContext';

// --- Centralized Content ---
const content = {
  question: 'How many hours do you lose to distractions daily?',
  instruction: 'Pick a category. Guessing is okay too.',
  buttonText: 'Lock Me In',
};

const options = [
    { label: 'Less Than 1h', value: 1 },
    { label: '1-3h', value: 2 },
    { label: '3-5h', value: 4 },
    { label: 'More than 5h', value: 6 },
];

// --- Main Screen Component ---
const HoursWastedScreen = () => {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleNextPress = () => {
    if (selectedValue === null) return;
    updateOnboardingData({ estimated_daily_loss: selectedValue });
    router.push('/(onboarding)/19' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
        </Pressable>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: '20%' }]} /> 
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.headline}>{content.question}</Text>
          <Text style={styles.subHeadline}>{content.instruction}</Text>
        </View>

        <View style={styles.selectionCard}>
          {options.map((option) => (
            <Pressable 
              key={option.value} 
              style={[
                styles.optionButton, 
                selectedValue === option.value && styles.optionButtonSelected
              ]}
              onPress={() => setSelectedValue(option.value)}
            >
              <Text style={[
                styles.optionButtonText,
                selectedValue === option.value && styles.optionButtonTextSelected
              ]}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable 
          style={[styles.primaryButton, selectedValue === null && styles.primaryButtonDisabled]} 
          onPress={handleNextPress}
          disabled={selectedValue === null}
        >
          <Text style={styles.buttonText}>{content.buttonText}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}; // <-- THE MISSING CLOSING BRACE AND SEMICOLON ARE NOW HERE.

// --- StyleSheet ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#080808' },
  header: { flexDirection: 'row', alignItems: 'center', height: 70, paddingHorizontal: 20, gap: 16 },
  backButton: { width: 40, height: 40, backgroundColor: '#212121', borderWidth: 1, borderColor: '#2D2D2D', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  progressBarContainer: { flex: 1, height: 8, backgroundColor: '#3D3D3D', borderRadius: 11, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#D1FF1A' },
  contentContainer: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 20, paddingTop: '10%' },
  textContainer: { alignItems: 'center', gap: 12, marginBottom: 40 },
  headline: { fontFamily: 'HelveticaNowDisplay-Bold', fontSize: 36, color: '#F8FFDA', textAlign: 'center', lineHeight: 44 },
  subHeadline: { fontFamily: 'HelveticaNowDisplay-Regular', fontSize: 16, color: '#CFCFCF', textAlign: 'center' },
  selectionCard: { width: '100%', backgroundColor: '#0D0D0D', borderWidth: 1, borderColor: '#2D2D2D', borderRadius: 22, padding: 20, gap: 15 },
  optionButton: { backgroundColor: '#121212', borderWidth: 1, borderColor: '#2D2D2D', borderRadius: 15, paddingVertical: 18, alignItems: 'center' },
  optionButtonSelected: { backgroundColor: '#D1FF1A', borderColor: '#D1FF1A' },
  optionButtonText: { fontFamily: 'HelveticaNowDisplay-Regular', fontSize: 20, color: '#FFFFFF' },
  optionButtonTextSelected: { color: '#171717', fontFamily: 'HelveticaNowDisplay-Bold' },
  footer: { paddingHorizontal: 20, paddingBottom: 40 },
  primaryButton: { backgroundColor: '#D1FF1A', borderRadius: 20, paddingVertical: 20, alignItems: 'center', justifyContent: 'center' },
  primaryButtonDisabled: { backgroundColor: '#a4b33c', opacity: 0.7 },
  buttonText: { color: '#171717', fontSize: 20, fontFamily: 'HelveticaNowDisplay-Bold' },
});

export default HoursWastedScreen;