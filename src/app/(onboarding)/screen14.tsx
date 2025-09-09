import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
// We don't need LinearGradient for this screen.
import { useRouter } from 'expo-router';
import CustomIcon from '@/components/CustomIcon';

// --- Centralized Content ---
const content = {
  headline: 'Quit Early? Face the Essay Gate.',
  subHeadline: "Try to break the session? You'll have to write a 500-word essay explaining your excuses-more painful than pushing through.",
  bottomText: 'Our aim for this long process is for you not to quit and continue being productive.',
  skipLink: 'Skip',
  buttonText: 'Okay i get it',
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

// MainContent is now updated with the Image
const MainContent = () => (
  <View style={styles.contentContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.headline}>{content.headline}</Text>
      <Text style={styles.subHeadline}>{content.subHeadline}</Text>
    </View>
    
    <Image
      // This is the image of the essay gate UI
      source={require('@/assets/images/screen14.png')} 
      style={styles.illustrationImage}
      resizeMode="contain"
    />
    
    {/* The text at the bottom, before the footer */}
    <Text style={styles.bottomText}>{content.bottomText}</Text>
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
const EssayGateScreen = () => {
  const router = useRouter();
  const handleNextPress = () => {
    router.push('/(onboarding)/screen15' as any); // Navigate to the next screen
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
  footer: { paddingHorizontal: 20, paddingBottom: 40, alignItems: 'center', gap: 16 },
  skipWalkthroughLink: { fontFamily: 'HelveticaNowDisplay-Regular', fontSize: 18, color: '#CFCFCF', padding: 10 },
  primaryButton: { backgroundColor: '#D1FF1A', borderRadius: 20, paddingVertical: 20, alignItems: 'center', justifyContent: 'center', width: '100%' },
  buttonText: { color: '#171717', fontSize: 20, fontFamily: 'HelveticaNowDisplay-Bold' },

  // --- THIS IS THE CORRECTED LAYOUT ---
  contentContainer: { 
    flex: 1, 
    justifyContent: 'space-between', // Pushes content to top, middle, and bottom
    alignItems: 'center', 
    paddingHorizontal: 30,
    paddingTop: '5%', // Add a bit of space from the header
  },
  textContainer: { 
    alignItems: 'center', 
    gap: 12, 
    width: '100%',
  },
  headline: { 
    color: '#F8FFDA', 
    fontSize: 42, // Adjusted font size
    fontFamily: 'HelveticaNowDisplay-Bold', 
    textAlign: 'center',
    lineHeight: 48, // Adjusted line height
  },
  subHeadline: { 
    color: '#CFCFCF', 
    fontSize: 18, 
    fontFamily: 'HelveticaNowDisplay-Regular', 
    textAlign: 'center',
    lineHeight: 24, 
    width: '95%',
  },
  illustrationImage: { 
    width: 253, // Explicit width from your request
    height: 315, // Explicit height from your request
  },
  bottomText: {
    fontFamily: 'HelveticaNowDisplay-Medium',
    fontSize: 14,
    color: '#F8FFDA',
    textAlign: 'center',
    width: 250, // Constrain width to encourage wrapping
  },
});

export default EssayGateScreen;