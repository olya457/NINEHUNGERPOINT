import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';
import { COLORS } from '../theme/colors';
import { getPlaceById } from '../data/places';
import { useFavorites } from '../context/FavoritesContext';

type RouteType = RouteProp<RootStackParamList, 'QuizResult'>;
type NavType = NativeStackNavigationProp<RootStackParamList>;

const QuizResultScreen = () => {
  const route = useRoute<RouteType>();
  const navigation = useNavigation<NavType>();
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { placeId, levelId, correct, total, passed, isLastLevel } = route.params;
  const place = getPlaceById(placeId);
  if (!place) return null;

  const fav = isFavorite(place.id);
  const topOffset = Math.max(insets.top, 20) + (Platform.OS === 'android' ? 20 : 0);

  const showNextLevel = passed && !isLastLevel;
  const showFinished = passed && isLastLevel;

  const onPrimary = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image source={place.image} style={styles.image} resizeMode="cover" />
          <View style={[styles.topBar, { top: topOffset }]}>
            <View style={[styles.badge, !passed && styles.badgeFail]}>
              <Text style={styles.badgeText}>
                {passed ? '🎯 LEVEL PASSED' : '❌ TRY AGAIN'}
              </Text>
            </View>
            <TouchableOpacity style={styles.roundBtn} onPress={() => toggleFavorite(place.id)}>
              <Text style={styles.btnIconSmall}>{fav ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.levelLine}>
            LEVEL {levelId} · SCORE {correct}/{total}
          </Text>
          <Text style={styles.name}>{place.name}</Text>
          <Text style={styles.description}>{place.description}</Text>

          <View style={styles.infoCard}>
            <Text style={styles.pinIcon}>📍</Text>
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>{place.address}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.pinIcon}>📍</Text>
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoLabel}>Coordinates</Text>
              <Text style={styles.infoValue}>
                {place.latitude.toFixed(4)}° N, {place.longitude.toFixed(4)}° E
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, !passed && styles.retryBtn]}
            onPress={onPrimary}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>
              {showFinished
                ? 'All Levels Complete 🏆'
                : showNextLevel
                ? 'Next Level →'
                : 'Try Again'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    height: 280,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  topBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  badgeFail: {
    backgroundColor: '#c0392b',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10,22,40,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIconSmall: {
    color: '#fff',
    fontSize: 16,
  },
  body: {
    padding: 20,
  },
  levelLine: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pinIcon: {
    fontSize: 16,
  },
  infoTextWrap: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  infoValue: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 26,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  retryBtn: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default QuizResultScreen;