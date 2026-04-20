import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { COLORS } from './src/theme/colors';

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <SafeAreaProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <RootNavigator />
          </NavigationContainer>
        </FavoritesProvider>
      </SafeAreaProvider>
    </View>
  );
};

export default App;