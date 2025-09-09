import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

const SplashScreen = () => {
  const router = useRouter();

  const handleStartPress = () => {
    // Corrected: Navigate to 'welcome', not '02_WelcomeScreen'
    router.push('/(onboarding)/welcome'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>NOFLUFF</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Start" 
          onPress={handleStartPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});

export default SplashScreen;