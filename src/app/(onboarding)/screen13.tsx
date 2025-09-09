import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
// LinearGradient is no longer needed
import { useRouter } from 'expo-router';
import CustomIcon from '@/components/CustomIcon';

// --- Centralized Content ---
const content = {
  headline: 'Real-Time Accountability That Forces Action.',
  subHeadline: 'Spend 30 minutes doom-scrolling? We’ll call you out. Open a food delivery app before the gym? You’ll hear from us.',
  skipLink: 'Skip',
  buttonText: 'Continue',
  skipWalkthroughText: 'Skip walkthrough..',
};

// --- Sub-components (No Changes) ---
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

// MainContent now ONLY contains the text elements
const MainContent = () => (
  <View style={styles.contentContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.headline}>{content.headline}</Text>
      <Text style={styles.subHeadline}>{content.subHeadline}</Text>
    </View>
    {/* An empty View acts as a spacer to push the text up */}
    <View style={{ flex: 1 }} />
  </View>
);

const Footer = ({ onNextPress }: { onNextPress: () => void }) => (
  <View style={styles.footer}>
    <Pressable onPress={() => console.log('Skip walkthrough pressed')}>
      <Text style={styles.skipWalkthroughLink}>{content.skipWalkthroughText}</Text>
    </Pressable>

    <Pressable style={styles.primaryButton} onPress={onNextPress}>
      <Text style={styles.buttonText}>{content.buttonText}</Text>
    </Pressable>
  </View>
);

// --- Main Screen Component ---
const AccountabilityScreen = () => {
  const router = useRouter();
  const handleNextPress = () => {
    router.push('/(onboarding)/screen14' as any);
  };
  return (
    // The main container is now a simple View to allow for absolute positioning
    <View style={styles.container}>
      {/* Layer 1: The full-screen background image */}
      <Image
        source={require('@/assets/images/screen13-new.png')}
        style={styles.backgroundImage}
        resizeMode="cover" // 'cover' will ensure it fills the screen without distortion
      />
      
      {/* Layer 2: All of your UI content, inside a SafeAreaView for safety */}
      <SafeAreaView style={styles.contentOverlay}>
        <Header />
        <MainContent />
        <Footer onNextPress={handleNextPress} />
      </SafeAreaView>
    </View>
  );
};

// --- StyleSheet ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#080808', // Fallback color
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0, // Send it to the very back
  },
  contentOverlay: {
    flex: 1, // This makes the content fill the screen on top of the image
    zIndex: 1, // Ensure all UI is on top of the background
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    height: 70, 
    paddingHorizontal: 20 
  },
  backButton: { width: 40, height: 40, backgroundColor: 'rgba(33, 33, 33, 0.7)', borderWidth: 1, borderColor: '#2D2D2D', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  skipLink: { fontFamily: 'HelveticaNowDisplay-Regular', fontSize: 16, color: '#CFCFCF' },
  logoContainer: { position: 'absolute', left: 0, right: 0, top: 0, height: '100%', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' },
  logoIcon: { width: 140, height: 50 },
  footer: { 
    paddingHorizontal: 20, 
    paddingBottom: 40, 
    alignItems: 'center', 
    gap: 16 
  },
  skipWalkthroughLink: { fontFamily: 'HelveticaNowDisplay-Regular', fontSize: 18, color: '#CFCFCF' },
  primaryButton: { backgroundColor: '#D1FF1A', borderRadius: 20, paddingVertical: 20, alignItems: 'center', justifyContent: 'center', width: '100%' },
  buttonText: { color: '#171717', fontSize: 20, fontFamily: 'HelveticaNowDisplay-Bold' },

  contentContainer: { 
    flex: 1, 
    justifyContent: 'flex-start',
    alignItems: 'center', 
    paddingHorizontal: 30,
  },
  textContainer: { 
    alignItems: 'center', 
    gap: 16, 
    marginTop: '10%',
  },
  headline: { 
    color: '#F8FFDA', 
    fontSize: 42, 
    fontFamily: 'HelveticaNowDisplay-Bold', 
    textAlign: 'center',
    width: 350, 
    lineHeight: 48,
  },
  subHeadline: { 
    color: '#CFCFCF', 
    fontSize: 18, 
    fontFamily: 'HelveticaNowDisplay-Regular', 
    textAlign: 'center',
    width: 300, 
    lineHeight: 24, 

  },
})

export default AccountabilityScreen;