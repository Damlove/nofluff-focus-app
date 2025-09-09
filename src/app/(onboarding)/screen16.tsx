import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import CustomIcon from '@/components/CustomIcon';

// --- Centralized Content ---
const content = {
  headline: 'Please answer a few questions to help tailor NoFluff to your needs.',
  subHeadline: 'The more we know, the better we tailor NoFluff to your life. Ready to reveal your truth?',
  footerText: 'This helps us give you a personalized experience - Your data is completely safe',
  buttonText: 'Let’s Customize',
};

// --- Sub-components for Clean Code ---
// Header for this screen does not have a "Skip" button
const HeaderNoSkip = () => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <CustomIcon name="Back-Chevron" size={16} color="#FFFFFF" />
      </Pressable>
      
      <View style={styles.logoContainer}>
        <Image 
          source={require('@/assets/images/Nofluff logo.png')}
          style={styles.logoIcon}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.headerRightPlaceholder} />
    </View>
  );
};

// MainContent is just the text block
const MainContent = () => (
  <View style={styles.contentContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.headline}>{content.headline}</Text>
      <Text style={styles.subHeadline}>{content.subHeadline}</Text>
    </View>
  </View>
);

const Footer = ({ onNextPress }: { onNextPress: () => void }) => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>{content.footerText}</Text>
    <Pressable style={styles.primaryButton} onPress={onNextPress}>
      <Text style={styles.buttonText}>{content.buttonText}</Text>
    </Pressable>
  </View>
);

// --- Main Screen Component ---
const PreSurveyScreen = () => {
  const router = useRouter();
  const handleNextPress = () => {
    router.push('/(onboarding)/18' as any); // Navigate to the next screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNoSkip />
      <MainContent />
      <Footer onNextPress={handleNextPress} />
    </SafeAreaView>
  );
};

// --- StyleSheet ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#080808' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    height: 70, 
    paddingHorizontal: 20 
  },
  backButton: { 
    width: 40, 
    height: 40, 
    backgroundColor: '#212121', 
    borderWidth: 1, 
    borderColor: '#2D2D2D', 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerRightPlaceholder: {
    width: 40, // Match the back button width to keep logo centered
  },
  logoContainer: { 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: 0, 
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'center', 
    pointerEvents: 'none' 
  },
  logoIcon: { 
    width: 140, 
    height: 50 
  },
  
  // --- LAYOUT STYLES ---
  contentContainer: {
    flex: 1,
    justifyContent: 'center', // This vertically centers the text block
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  textContainer: {
    alignItems: 'center',
    gap: 16, // Space between headline and sub-headline
  },
  headline: {
    fontFamily: 'HelveticaNowDisplay-Bold',
    fontSize: 42,
    color: '#F8FFDA',
    textAlign: 'center',
    width: 300,
    lineHeight: 48,
  },
  subHeadline: {
    fontFamily: 'HelveticaNowDisplay-Regular',
    fontSize: 18,
    color: '#CFCFCF',
    textAlign: 'center',
    width: 300,
    lineHeight: 24,
  },
  
  // --- FOOTER STYLES ---
  footer: { 
    paddingHorizontal: 20, 
    paddingBottom: 40,
    alignItems: 'center',
    gap: 16, // Space between footer text and button
  },
  footerText: {
    fontFamily: 'HelveticaNowDisplay-Medium',
    fontSize: 16,
    color: '#F8FFDA',
    width: 280,
    textAlign: 'center',
  },
  primaryButton: { 
    backgroundColor: '#D1FF1A', 
    borderRadius: 20, 
    paddingVertical: 20, 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%' 
  },
  buttonText: { 
    color: '#171717', 
    fontSize: 20, 
    fontFamily: 'HelveticaNowDisplay-Bold' 
  },
});

export default PreSurveyScreen;