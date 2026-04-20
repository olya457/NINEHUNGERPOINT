import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';
import { COLORS } from '../theme/colors';
import { useFavorites } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');

type NavType = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

const SLIDES = [
  {
    image: require('../assets/onboard_1.png'),
    title: "Discover Germany's Best",
    subtitle:
      'Explore authentic German cuisine from traditional brewhouses to modern fusion restaurants',
  },
  {
    image: require('../assets/onboard_2.png'),
    title: 'Categorized & Curated',
    subtitle: "Find exactly what you're craving with our carefully organized categories",
  },
  {
    image: require('../assets/onboard_3.png'),
    title: 'Interactive Map',
    subtitle: 'Navigate German food culture with our interactive location-based map',
  },
  {
    image: require('../assets/onboard_4.png'),
    title: 'Personalized Recommendations',
    subtitle: 'Take our Hunger Check quiz to find your perfect dining spot',
  },
  {
    image: require('../assets/onboard_5.png'),
    title: 'Save Your Favorites',
    subtitle: 'Keep track of places you love and want to visit',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation<NavType>();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useFavorites();

  const topPad = Math.max(insets.top, 20) + (Platform.OS === 'android' ? 20 : 0);
  const bottomPad = Math.max(insets.bottom, 20) + (Platform.OS === 'android' ? 20 : 0);

  const finish = async () => {
    await completeOnboarding();
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  const goNext = () => {
    if (index < SLIDES.length - 1) {
      const next = index + 1;
      setIndex(next);
      listRef.current?.scrollToIndex({ index: next, animated: true });
    } else {
      finish();
    }
  };

  const skip = () => finish();

  return (
    <View style={[styles.container, { paddingTop: topPad, paddingBottom: bottomPad }]}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.imageWrap}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.bottomRow}>
        {index < SLIDES.length - 1 ? (
          <>
            <TouchableOpacity onPress={skip} style={styles.skipBtn}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goNext} style={styles.nextBtn} activeOpacity={0.8}>
              <Text style={styles.nextText}>Next ›</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={finish} style={styles.getStartedBtn} activeOpacity={0.8}>
            <Text style={styles.nextText}>Get Started ›</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  imageWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 12,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    paddingBottom: 40,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textMuted,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 22,
    backgroundColor: COLORS.primary,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  skipBtn: {
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  skipText: {
    color: COLORS.textSecondary,
    fontSize: 15,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 28,
    minWidth: 140,
  },
  getStartedBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 28,
  },
  nextText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default OnboardingScreen;