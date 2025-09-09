import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import CustomIcon from '@/components/CustomIcon';

// --- Centralized Content (No Changes) ---
const content = {
  headline: 'You pledge your commitment.',
  subHeadline: 'Minimum of 500 words. You can’t copy and paste.',
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

// --- MainContent is Re-structured for Correct Positioning ---
const MainContent = () => (
  <View style={styles.contentContainer}>
    {/* Item 1: The text block at the top */}
    <View style={styles.textContainer}>
      <Text style={styles.headline}>{content.headline}</Text>
      <Text style={styles.subHeadline}>{content.subHeadline}</Text>
    </View>

    {/* Item 2: The pledge box in the middle */}
    <View style={styles.pledgeContainer}>
      <Image
        source={require('@/assets/images/screen10.png')}
        style={styles.pledgeImage}
        resizeMode="contain"
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)']}
        style={styles.pledgeOverlay}
      />
      <View style={styles.pledgeImageTopWrapper}>
        <Image
          source={require('@/assets/images/screen10-top.png')}
          style={styles.pledgeImageTop}
          resizeMode="contain"
        />
      </View>
    </View>
    
    {/* Item 3: An empty, invisible spacer to push the other two items up */}
    <View />
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

// --- Main Screen Component (No Changes) ---
const PledgeScreen = () => {
  const router = useRouter();
  const handleNextPress = () => {
    router.push('/(onboarding)/screen11' as any);
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
  // All other styles are unchanged
  container: { flex: 1, backgroundColor: '#080808' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 70, paddingHorizontal: 20 },
  backButton: { width: 40, height: 40, backgroundColor: '#212121', borderWidth: 1, borderColor: '#2D2D2D', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  skipLink: { fontFamily: 'HelveticaNowDisplay-Regular', fontSize: 16, color: '#CFCFCF' },
  logoContainer: { position: 'absolute', left: 0, right: 0, top: 0, height: '100%', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' },
  logoIcon: { width: 140, height: 50 },
  footer: { paddingHorizontal: 20, paddingBottom: 40, alignItems: 'center', gap: 16 },
  skipWalkthroughLink: { fontFamily: 'HelveticaNowDisplay-Regular', fontSize: 18, color: '#CFCFCF' },
  primaryButton: { backgroundColor: '#D1FF1A', borderRadius: 20, paddingVertical: 20, alignItems: 'center', justifyContent: 'center', width: '100%' },
  buttonText: { color: '#171717', fontSize: 20, fontFamily: 'HelveticaNowDisplay-Bold' },

  // --- THIS IS THE CORRECTED LAYOUT STYLE ---
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between', // This is the key
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30, // Adds space between the header and the text
    paddingBottom: 20, // Adds a bit of space from the footer
  },
  textContainer: {
    alignItems: 'center',
    gap: 12,
  },
  headline: {
    color: '#F8FFDA',
    fontSize: 48,
    fontFamily: 'HelveticaNowDisplay-Bold',
    lineHeight: 55,
    textAlign: 'center',
  },
  subHeadline: {
    color: '#CFCFCF',
    fontSize: 18,
    fontFamily: 'HelveticaNowDisplay-Regular',
    width: 170,
    lineHeight: 25,
    textAlign: 'center',
  },
  pledgeContainer: {
    width: '100%',
  },
  pledgeImage: {
    width: '100%',
    height: 150,
  },
  pledgeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  pledgeImageTopWrapper: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pledgeImageTop: {
    width: 83,
    height: 87,
  },
});

export default PledgeScreen;