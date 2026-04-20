import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';

const ICON_MAP: Record<string, { active: string; inactive: string }> = {
  Places: { active: '📍', inactive: '📍' },
  Map: { active: '🗺️', inactive: '🗺️' },
  Quiz: { active: '❓', inactive: '❓' },
  Stories: { active: '📖', inactive: '📖' },
  Saved: { active: '❤️', inactive: '🤍' },
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const bottomOffset = Platform.OS === 'ios' ? 20 : 30;
  const bottomPosition = Math.max(insets.bottom, 0) + bottomOffset;

  return (
    <View style={[styles.wrapper, { bottom: bottomPosition }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const icons = ICON_MAP[route.name] || { active: '•', inactive: '•' };
          const icon = isFocused ? icons.active : icons.inactive;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <View style={[styles.iconWrap, isFocused && styles.iconWrapActive]}>
                <Text style={styles.iconText}>{icon}</Text>
              </View>
              <Text
                style={[
                  styles.label,
                  { color: isFocused ? COLORS.primary : COLORS.textSecondary },
                ]}
              >
                {String(label)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  iconWrapActive: {
    backgroundColor: COLORS.activeTabBg,
  },
  iconText: {
    fontSize: 18,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
  },
});

export default CustomTabBar;