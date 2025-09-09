import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import CustomIcon from '@/components/CustomIcon';

// --- Centralized Content ---
const content = {
  headlineStart: 'What could you do with an extra ',
  headlineBoldItalic: '1,095 hours?',
  subHeadline: 'More Money? More Skills? More Freedom?',
  skipLink: 'Skip',
  buttonText: 'Claim Your Time',
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
      <Text style={styles.headline}>
        {content.headlineStart}
        <Text style={styles.headlineBoldItalic}>
          {content.headlineBoldItalic}
        </Text>
      </Text>
      <Text style={styles.subHeadline}>{content.subHeadline}</Text>
    </View>
    <Image
      source={require('@/assets/images/mascot-welcome.png')} // Make sure this image exists
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

const Footer = ({ onNextPress }: { onNextPress: () => void }) => (
  <View style={styles.footer}>
    <Pressable style={styles.primaryButton} onPress={onNextPress}>
      <Text style={styles.buttonText}>{content.buttonText}</Text>
    </Pressable>
  </View>
);

// --- Main Screen Component ---
const ExtraTimeScreen = () => {
  const router = useRouter();

  const handleNextPress = () => {
    router.push('/(onboarding)/screen07' as any); 
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
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 20,
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
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  logoIcon: {
    width: 140,
    height: 50,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  textContainer: {
    alignItems: 'center',
    gap: 12,
  },
  headline: {
    color: '#F8FFDA',
    fontSize: 36,
    fontFamily: 'HelveticaNowDisplay-Bold',
    textAlign: 'center',
    width: 350,
    lineHeight: 45,
    letterSpacing: 0.5,
  },
  
  // --- THIS IS THE FINAL SOLUTION USING A SKEW TRANSFORM ---
  headlineBoldItalic: {
    fontFamily: 'HelveticaNowDisplay-Bold',
    transform: [{ skewX: '-15deg' }] // This applies a 10-degree slant to the text
  },
  subHeadline: {
    color: '#CFCFCF',
    fontSize: 18,
    fontFamily: 'HelveticaNowDisplay-Regular',
    textAlign: 'center',
    width: 300,
    lineHeight: 24,
  },
  illustrationImage: {
    width: 250,
    height: 375,
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#D1FF1A',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
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

export default ExtraTimeScreen;