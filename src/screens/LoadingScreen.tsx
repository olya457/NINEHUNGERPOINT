import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS } from '../theme/colors';
import { useFavorites } from '../context/FavoritesContext';

type NavType = NativeStackNavigationProp<RootStackParamList, 'Loading'>;

const LoadingScreen = () => {
  const navigation = useNavigation<NavType>();
  const { hasOnboarded, isLoaded } = useFavorites();

  useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: hasOnboarded ? 'Main' : 'Onboarding' }],
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [isLoaded, hasOnboarded, navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 260,
    height: 360,
  },
});

export default LoadingScreen;