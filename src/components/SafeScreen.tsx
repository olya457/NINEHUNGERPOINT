import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';

interface Props {
  children: ReactNode;
  paddingTop?: boolean;
  paddingBottom?: boolean;
}

const SafeScreen: React.FC<Props> = ({ children, paddingTop = true, paddingBottom = true }) => {
  const insets = useSafeAreaInsets();
  const androidExtra = Platform.OS === 'android' ? 20 : 0;
  const topPad = paddingTop ? Math.max(insets.top, 0) + androidExtra : 0;
  const bottomPad = paddingBottom ? Math.max(insets.bottom, 0) + androidExtra : 0;

  return (
    <View style={[styles.container, { paddingTop: topPad, paddingBottom: bottomPad }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

export default SafeScreen;