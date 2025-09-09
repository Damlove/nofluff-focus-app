import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import CustomIcon from '@/components/CustomIcon'; // <-- IMPORT ADDED

// --- Centralized Content ---
const content = {
  headline: 'You don’t need motivation. You need discipline.',
  subHeadline: 'Empty quotes and feel-good platitudes only fuel your excuses but they never deliver results.',
  skipLink: 'Skip',
  buttonText: 'Continue',
};

// --- Sub-components for Clean Code ---

const Header = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        {/* ICON REPLACED HERE */}
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
  // This View is the container for the main content and the gradient overlay
  <View style={styles.contentContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.headline}>{content.headline}</Text>
      <Text style={styles.subHeadline}>{content.subHeadline}</Text>
    </View>
    <Image
      source={require('@/assets/images/Mascot-intro.png')}
      style={styles.illustrationImage}
      resizeMode="contain"
    />
    {/* The gradient is now an overlay ONLY on the MainContent */}
    <LinearGradient
        colors={['rgba(8, 8, 8, 0.0)', '#080808']}
        style={styles.gradient}
        locations={[0, 0.8]} // Gradient starts fading from 0% and is solid at 80%
      />
  </View>
);

const Footer = ({ onNextPress }: { onNextPress: () => void }) => (
  <View style={styles.footer}>
    <Pressable style={styles.primaryButton} onPress={onNextPress}>
      <Text style={styles.buttonText}>{content.buttonText}</Text>
    </Pressable>
  </View>
);

// --- Main Screen Component ---

const IntroScreen = () => {
  const router = useRouter();

  const handleNextPress = () => {
    router.push('/(onboarding)/not-lazy'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <MainContent />
      <Footer onNextPress={handleNextPress} />
    </SafeAreaView>
  );
};

// --- The Single, Correct StyleSheet ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This pushes the back button and skip link to the edges
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 20,
    // The header itself acts as the positioning container for the logo
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
  skipLink: {
    fontFamily: 'HelveticaNowDisplay-Regular',
    fontSize: 16,
    color: '#CFCFCF',
  },
  // THIS IS THE KEY FIX:
  logoContainer: {
    position: 'absolute',
    // Position it relative to the entire header width
    left: 0,
    right: 0,
    top: 0,
    height: '100%', // Take up the full height of the header
    alignItems: 'center', // Horizontally center the content
    justifyContent: 'center', // Vertically center the content
    // This pointerEvents prop is important. It makes the container non-interactive,
    // so you can't accidentally press the logo container instead of the buttons underneath.
    pointerEvents: 'none',
  },
  logoIcon: {
    width: 140,
    height: 50,
  },

  // Main Content Styles
  contentContainer: {
    flex: 1, // This makes it take up all available space
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  textContainer: {
    alignItems: 'center',
  },
  headline: {
    color: '#F8FFDA',
    fontSize: 40,
    fontFamily: 'HelveticaNowDisplay-Bold',
    textAlign: 'center',
    width: 304,
    lineHeight: 45,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subHeadline: {
    color: '#CFCFCF',
    fontSize: 18,
    fontFamily: 'HelveticaNowDisplay-Regular',
    textAlign: 'center',
    width: 304,
    lineHeight: 24,
  },
  illustrationImage: {
    width: 250,
    height: 375,
  },

  // Footer Styles
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#D1FF1A',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#171717',
    fontSize: 20,
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  
  // Gradient is positioned relative to its parent (MainContent)
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%', 
  },
});

export default IntroScreen;