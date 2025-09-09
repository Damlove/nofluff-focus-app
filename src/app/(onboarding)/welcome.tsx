import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'; // <-- Import the gradient

// --- Centralized Content ---
const content = {
  headline: 'The app that makes you work, or face your excuses.',
  signInLink: 'Existing user? Sign in',
  buttonText: 'Let\'s Go',
};

// --- Sub-components for Clean Code ---

const Header = () => (
  <View style={styles.header}>
    <Image 
      source={require('@/assets/images/Nofluff logo.png')}
      style={styles.logoIcon}
      resizeMode="contain"
    />
  </View>
);

const MainContent = () => (
  // The MainContent now needs to be a container for the gradient
  <View style={styles.contentContainer}>
    <Text style={styles.headline}>{content.headline}</Text>
    <Image
      source={require('@/assets/images/mascot-welcome.png')}
      style={styles.illustrationImage}
      resizeMode="contain"
    />
    {/* The gradient is now INSIDE this component, so it's behind the footer */}
    <LinearGradient
      colors={['rgba(8, 8, 8, 0)', '#080808']} // Fades from transparent to solid black
      style={styles.gradient}
      locations={[0, 0.46]}
    />
  </View>
);

interface FooterProps {
  onNextPress: () => void;
  onSignInPress: () => void;
}

const Footer = ({ onNextPress, onSignInPress }: FooterProps) => (
  <View style={styles.footer}>
    <Pressable onPress={onSignInPress}>
      <Text style={styles.signInText}>{content.signInLink}</Text>
    </Pressable>
    <Pressable style={styles.primaryButton} onPress={onNextPress}>
      <Text style={styles.buttonText}>{content.buttonText}</Text>
    </Pressable>
  </View>
);

// --- Main Screen Component ---

const WelcomeScreen = () => {
  const router = useRouter();

  const handleNextPress = () => {
    router.push('/(onboarding)/intro' as any); 
  };

  const handleSignInPress = () => {
    console.log('Sign in pressed');
  };

  return (
    // We wrap the entire screen in a container to ensure the background color is consistent
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <MainContent />
        <Footer 
          onNextPress={handleNextPress} 
          onSignInPress={handleSignInPress} 
        />
      </SafeAreaView>
    </View>
  );
};

// --- StyleSheet ---

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },
  safeArea: {
    flex: 1,
  },
  
  // Header Styles
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 70, 
  },
  logoIcon: {
    width: 140,
    height: 50,
    alignSelf: 'center',
  },

  // Main Content Styles
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around', 
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  headline: {
    color: '#F8FFDA',
    fontSize: 40,
    fontWeight: '700', 
    fontFamily: 'HelveticaNowDisplay-Bold',
    textAlign: 'center',
    lineHeight: 45,
    width: 333,
    letterSpacing: 0.5,
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
  signInText: {
    color: '#CFCFCF',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'HelveticaNowDisplay-Regular',
    textAlign: 'center',
    paddingTop: 10,
    marginBottom: 15,
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
    fontWeight: '700',
    fontFamily: 'HelveticaNowDisplay-Bold',
  },

  // NEW Gradient Style
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '35%', // Fade covers the bottom half of the content area
  },
});

export default WelcomeScreen;