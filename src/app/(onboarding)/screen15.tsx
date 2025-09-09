import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import CustomIcon from '@/components/CustomIcon';

// --- Centralized Content (No Changes) ---
const content = {
  introText: 'Enough about us',
  headlineLine1: "Let's Focus on",
  headlineLine2_highlight: 'you',
  headlineLine2_fade: "because it's",
  headlineLine3: 'about you.',
  buttonText: 'Let’s go',
};

// --- Sub-components (No Changes) ---
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

// --- MainContent is Re-ordered Correctly ---
const MainContent = () => (
  <View style={styles.contentContainer}>
    {/* 1. Text container is now first */}
    <View style={styles.textContainer}>
      <Text style={styles.introText}>{content.introText}</Text>
      
      <Text style={styles.headline}>
        <Text style={styles.headlineFaded}>{content.headlineLine1}{'\n'}</Text>
        <Text style={styles.headlineHighlight}>{content.headlineLine2_highlight} </Text>
        <Text style={styles.headlineFaded}>{content.headlineLine2_fade}{'\n'}</Text>
        <Text style={styles.headlineHighlight}>{content.headlineLine3}</Text>
      </Text>
    </View>
    
    {/* 2. Image container is now second */}
    <View style={styles.imageContainer}>
      <Image
        source={require('@/assets/images/screen15.png')} 
        style={styles.illustrationImage}
        resizeMode="contain"
      />
      <LinearGradient
        colors={['rgba(8, 8, 8, 0.0)', '#080808']}
        style={styles.gradient}
      />
    </View>
  </View>
);

const Footer = ({ onNextPress }: { onNextPress: () => void }) => (
  <View style={styles.footer}>
    <Pressable style={styles.primaryButton} onPress={onNextPress}>
      <Text style={styles.buttonText}>{content.buttonText}</Text>
    </Pressable>
  </View>
);

// --- Main Screen Component (No Changes) ---
const FocusOnYouScreen = () => {
  const router = useRouter();
  const handleNextPress = () => {
    router.push('/(onboarding)/screen16' as any);
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
  //... container, header, footer styles are unchanged
  container: { flex: 1, backgroundColor: '#080808' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 70, paddingHorizontal: 20 },
  backButton: { width: 40, height: 40, backgroundColor: '#212121', borderWidth: 1, borderColor: '#2D2D2D', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  headerRightPlaceholder: { width: 40, height: 40 },
  logoContainer: { position: 'absolute', left: 0, right: 0, top: 0, height: '100%', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' },
  logoIcon: { width: 140, height: 50 },
  footer: { paddingHorizontal: 20, paddingBottom: 40 },
  primaryButton: { backgroundColor: '#D1FF1A', borderRadius: 20, paddingVertical: 20, alignItems: 'center', justifyContent: 'center', width: '100%' },
  buttonText: { color: '#171717', fontSize: 20, fontFamily: 'HelveticaNowDisplay-Bold' },

  // --- THIS IS THE CORRECTED LAYOUT ---
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around', // This will space the text and image evenly
    paddingHorizontal: 30,
  },
  textContainer: {
    alignItems: 'center',
    gap: 16,
  },
  introText: {
    fontFamily: 'HelveticaNowDisplay-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headline: {
    fontFamily: 'HelveticaNowDisplay-Bold',
    fontSize: 42,
    textAlign: 'center',
    lineHeight: 52,
  },
  headlineFaded: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  headlineHighlight: {
    color: '#F8FFDA',
  },
  imageContainer: {
    width: '100%',
    height: '50%', // Give the image a defined height
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationImage: {
    width: '80%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
});

export default FocusOnYouScreen;