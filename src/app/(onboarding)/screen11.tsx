import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import CustomIcon from '@/components/CustomIcon';

// --- Centralized Content ---
const content = {
  headlineLine1: 'Science Says',
  headlineLine2: 'Commitment Works.',
  bodyLine1: 'According to behavioral economist Dan Ariely.',
  bodyLine2: 'People are significantly more likely to finish tasks with built-in friction like writing out excuses.',
  bodyLine3: 'This isn’t just theory; it’s proven that putting skin in the game boosts your commitment.',
  skipLink: 'Skip',
  skipWalkthroughText: 'Skip walkthrough..',
  buttonText: 'Continue',
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

const MainContent = () => (
  <View style={styles.contentContainer}>
    <View>
        <View style={styles.textContainer}>
        <Text style={styles.headline}>{content.headlineLine1}</Text>
        <Text style={styles.headline}>{content.headlineLine2}</Text>
        </View>

        <View style={styles.bodyContainer}>
        <Text style={styles.bodyText}>{content.bodyLine1}</Text>
        <Text style={styles.bodyText}>{content.bodyLine2}</Text>
        <Text style={styles.bodyText}>{content.bodyLine3}</Text>
        </View>
    </View>
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
const ScienceScreen = () => {
  const router = useRouter();
  const handleNextPress = () => {
    router.push('/(onboarding)/screen12' as any);
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

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },
  headline: {
    color: '#F8FFDA',
    fontSize: 42, // Change this value as you need
    fontFamily: 'HelveticaNowDisplay-Bold',
    lineHeight: 48,
    textAlign: 'center',
    width: '100%', // <-- THIS IS THE FIX
  },
  bodyContainer: {
    marginTop: 24,
    alignItems: 'center',
    width: '100%',
    gap: 24,
  },
  bodyText: {
    color: '#CFCFCF',
    fontSize: 20,
    fontFamily: 'HelveticaNowDisplay-Regular',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default ScienceScreen;