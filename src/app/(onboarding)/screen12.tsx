import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import CustomIcon from '@/components/CustomIcon';

// --- Centralized Content ---
const content = {
  headline: 'You start a session.',
  subHeadline: 'We block distracting app. And that’s it!',
  skipLink: 'Skip',
  buttonText: 'Continue',
  skipWalkthroughText: 'Skip walkthrough..', // Added new text
};

// --- Sub-components for Clean Code ---
const Header = () => {
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
      
      <Pressable onPress={() => console.log('Skip pressed')}>
        <Text style={styles.skipLink}>{content.skipLink}</Text>
      </Pressable>
    </View>
  );
};

const MainContent = () => (
  <View style={styles.contentContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.headline}>{content.headline}</Text>
      <Text style={styles.subHeadline}>{content.subHeadline}</Text>
    </View>
    <Image
      source={require('@/assets/images/screen12.png')}
      style={styles.illustrationImage}
      resizeMode="contain"
    />
    <LinearGradient
      colors={['rgba(8, 8, 8, 0.0)', '#080808']}
      style={styles.gradient}
      locations={[0, 0.8]}
    />
  </View>
);

// --- THIS IS THE UPDATED FOOTER COMPONENT ---
const Footer = ({ onNextPress }: { onNextPress: () => void }) => (
  <View style={styles.footer}>
    {/* The new skip link is added here */}
    <Pressable onPress={() => console.log('Skip walkthrough pressed')}>
      <Text style={styles.skipWalkthroughLink}>{content.skipWalkthroughText}</Text>
    </Pressable>

    <Pressable style={styles.primaryButton} onPress={onNextPress}>
      <Text style={styles.buttonText}>{content.buttonText}</Text>
    </Pressable>
  </View>
);

// --- Main Screen Component ---
// Renamed for clarity
const SetFocusSessionScreen = () => {
  const router = useRouter();
  const handleNextPress = () => {
    router.push('/(onboarding)/screen13' as any); // Updated navigation path
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <MainContent />
      <Footer onNextPress={handleNextPress} />
    </SafeAreaView>
  );
};

// --- StyleSheet ---
const styles = StyleSheet.create({
  //... your existing styles for container, header, etc. are unchanged
  container: { flex: 1, backgroundColor: '#080808' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 70, paddingHorizontal: 20 },
  backButton: { width: 40, height: 40, backgroundColor: '#212121', borderWidth: 1, borderColor: '#2D2D2D', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  skipLink: { fontFamily: 'HelveticaNowDisplay-Regular', fontSize: 16, color: '#CFCFCF' },
  logoContainer: { position: 'absolute', left: 0, right: 0, top: 0, height: '100%', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' },
  logoIcon: { width: 140, height: 50 },
  contentContainer: { flex: 1, justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 30 },
  textContainer: { alignItems: 'center', gap: 12, },
  headline: { color: '#F8FFDA', fontSize: 42, fontFamily: 'HelveticaNowDisplay-Bold', textAlign: 'center', width: 400, lineHeight: 45, marginBottom: 0, letterSpacing: 0.5, },
  subHeadline: { color: '#CFCFCF', fontSize: 18, fontFamily: 'HelveticaNowDisplay-Regular', textAlign: 'center', width: 400, lineHeight: 24, },
  illustrationImage: { width: 375, height: 500, alignItems: 'center', },

  // --- FOOTER STYLES UPDATED ---
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center', // Center the content (skip link and button)
    gap: 16, // Add space between the skip link and the button
  },
  skipWalkthroughLink: {
    fontFamily: 'HelveticaNowDisplay-Regular',
    fontSize: 18, // Adjust size as needed
    color: '#CFCFCF', // Light gray color
  },
  primaryButton: {
    backgroundColor: '#D1FF1A',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Make the button take the full width of the footer padding
  },
  buttonText: {
    color: '#171717',
    fontSize: 20,
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%', 
  },
});

export default SetFocusSessionScreen;