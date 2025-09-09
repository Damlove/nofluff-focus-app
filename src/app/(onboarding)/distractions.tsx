import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import CustomIcon from '@/components/CustomIcon';

// --- Centralized Content ---
// Content is updated to match your Figma description
const content = {
  headline: 'These apps aren’t “just distractions” They are engineered to steal your focus.',
  subHeadline: 'It’s not a fair fight.',
  skipLink: 'Skip',
  buttonText: 'Fight Back',
};

// --- Sub-components for Clean Code ---

// The Header component remains consistent
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

// The MainContent component is updated with the new text and image
const MainContent = () => (
  <View style={styles.contentContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.headline}>{content.headline}</Text>
      <Text style={styles.subHeadline}>{content.subHeadline}</Text>
    </View>
    <Image
      source={require('@/assets/images/mascot-distraction02.png')} // Image updated
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

// The Footer component is updated with the new button text
const Footer = ({ onNextPress }: { onNextPress: () => void }) => (
  <View style={styles.footer}>
    <Pressable style={styles.primaryButton} onPress={onNextPress}>
      <Text style={styles.buttonText}>{content.buttonText}</Text>
    </Pressable>
  </View>
);

// --- Main Screen Component ---

const NotLazyScreen = () => {
  const router = useRouter();

  const handleNextPress = () => {
    // Navigate to the next screen in the onboarding flow
    router.push('/(onboarding)/time-loss' as any); 
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
// Styles have been translated from your detailed descriptions

const styles = StyleSheet.create({
  // Main container
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
    flex: 1,
    justifyContent: 'space-around', // Positions text/image with space between
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  textContainer: {
    alignItems: 'center',
    gap: 12, // spacing.gap-12
  },
  headline: {
    color: '#F8FFDA',
    fontSize: 36,
    fontFamily: 'HelveticaNowDisplay-Bold',
    textAlign: 'center',
    width: 310,
    lineHeight: 45,
    marginBottom: 0,
    letterSpacing: 0.5,
  },
  subHeadline: {
    color: '#CFCFCF',
    fontSize: 18,
    fontFamily: 'HelveticaNowDisplay-Regular',
    textAlign: 'center',
    width: 350,
    lineHeight: 24, // Added for better readability
  },
  illustrationImage: {
    width: 250, // Take full width available
    height: 375, 
    alignItems: 'center'// Adjust height as needed
  },

  // Footer Styles
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#D1FF1A',
    borderRadius: 20, // radius: 20px
    paddingVertical: 20, // Approximating padding-top-25
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#171717',
    fontSize: 20, // sizes.size-20
    fontFamily: 'HelveticaNowDisplay-Bold', // weights.weight-700
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

export default NotLazyScreen;