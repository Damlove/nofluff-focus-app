import React from 'react';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

// --- IMPORTANT ---
// Please verify the filenames in the 'require' statements below
// match your files in the 'src/assets/fonts/' folder exactly.

// This creates the actual icon component from your IcoMoon files
const IconSet = createIconSetFromIcoMoon(
  require('../assets/fonts/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

/**
 * This is the component you will use everywhere in your app to show a custom icon.
 */
const CustomIcon = ({ name, size, color }) => {
  // This hook loads your custom font into the app's memory when the app starts.
  const [fontsLoaded, fontError] = useFonts({
    'IcoMoon': require('../assets/fonts/icomoon.ttf'),
  });

  // While the font is loading, we render nothing to avoid errors.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // If the font fails to load, we can log the error for debugging.
  if (fontError) {
    console.error('Error loading custom icon font:', fontError);
    return null; 
  }

  // Once the font is loaded, we can safely render the icon.
  return <IconSet name={name} size={size} color={color} />;
};

export default CustomIcon;