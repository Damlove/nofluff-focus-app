import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import CustomIcon from '@/components/CustomIcon';

// --- Centralized Content ---
const content = {
  headlineLine1: 'Let’s walk you through',
  headlineLine2_start: 'how ',
  headlineLine2_bold: 'NOFLUFF',
  headlineLine2_end: ' works.',
  skipLink: 'Skip',
  buttonText: 'Walk Me Through',
};

// --- Special component for the dual-color text effect (No Changes) ---
const DualColorText = ({ text }: { text: string }) => {
  return (
    <View style={styles.dualColorContainer}>
      <Text style={[styles.headlineBold, styles.dualColorBottom]}>{text}</Text>
      <View style={styles.dualColorTopWrapper}>
        <Text style={[styles.headlineBold, styles.dualColorTop]}>{text}</Text>
      </View>
    </View>
  );
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

// --- MainContent is Re-structured for Correct Line Breaks ---
const MainContent = () => (
  <View style={styles.contentContainer}>
    <View style={styles.imageContainer}>
      <Image
        source={require('@/assets/images/screen09.png')} 
        style={styles.illustrationImage}
        resizeMode="contain"
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.0)', '#000000']}
        style={styles.gradient}
      />
    </View>

    <View style={styles.textContainer}>
      {/* Line 1 */}
      <Text style={styles.headline}>
        {content.headlineLine1}
      </Text>
      {/* Line 2 is a row of components */}
      <View style={styles.headlineRow}>
        <Text style={styles.headline}>{content.headlineLine2_start}</Text>
        <DualColorText text={content.headlineLine2_bold} />
        <Text style={styles.headline}>{content.headlineLine2_end}</Text>
      </View>
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

// --- Main Screen Component ---
const WalkthroughScreen = () => {
  const router = useRouter();

  const handleNextPress = () => {
    router.push('/(onboarding)/screen09' as any); 
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
  //... container, header, etc. styles are unchanged
  container: { flex: 1, backgroundColor: '#000000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 70, paddingHorizontal: 20 },
  backButton: { width: 40, height: 40, backgroundColor: '#333333', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  skipLink: { fontFamily: 'HelveticaNowDisplay-Regular', fontSize: 16, color: '#FFFFFF' },
  logoContainer: { position: 'absolute', left: 0, right: 0, top: 0, height: '100%', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' },
  logoIcon: { width: 140, height: 50 },
  contentContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imageContainer: { width: '100%', height: '70%', alignItems: 'center', justifyContent: 'center' },
  illustrationImage: { width: '80%', height: '100%' },
  gradient: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '100%' },
  footer: { paddingHorizontal: 20, paddingBottom: 40 },
  primaryButton: { backgroundColor: '#D1FF1A', borderRadius: 16, paddingVertical: 18, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#000000', fontSize: 18, fontFamily: 'HelveticaNowDisplay-Bold' },

  // --- STYLES FOR THE CORRECTED LAYOUT ---
  textContainer: {
    marginTop: -100,
    alignItems: 'center', // This will center-align the two lines of text
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: 'HelveticaNowDisplay-Bold',
    textAlign: 'center',
    lineHeight: 36,
  },
  headlineRow: {
    flexDirection: 'row', // This makes "how", "NOFLUFF", and "works." sit side-by-side
    alignItems: 'center', // This vertically aligns the text with the DualColorText component
  },
  headlineBold: {
    fontSize: 28,
    fontFamily: 'HelveticaNowDisplay-Bold',
  },
  dualColorContainer: {
    position: 'relative',
    height: 36, 
  },
  dualColorBottom: {
    color: '#F8FFDA', 
  },
  dualColorTopWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    overflow: 'hidden',
  },
  dualColorTop: {
    color: '#F8FFDA',
  },
});

export default WalkthroughScreen;