import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SafeScreen from '../components/SafeScreen';
import { PLACES } from '../data/places';
import { RootStackParamList } from '../types';
import { COLORS } from '../theme/colors';
import { useFavorites } from '../context/FavoritesContext';

type NavType = NativeStackNavigationProp<RootStackParamList>;

const SavedScreen = () => {
  const navigation = useNavigation<NavType>();
  const { favorites, toggleFavorite } = useFavorites();
  const savedPlaces = PLACES.filter(p => favorites.includes(p.id));
  const { width, height } = useWindowDimensions();

  const isSmall = width < 360 || height < 680;
  const topShift = 20;
  const hPad = isSmall ? 16 : 20;

  const titleSize = isSmall ? 26 : 30;
  const subtitleSize = isSmall ? 13 : 14;
  const emptyTitleSize = isSmall ? 16 : 18;
  const emptyTextSize = isSmall ? 13 : 14;
  const bigHeartSize = isSmall ? 48 : 56;
  const exploreBtnPadH = isSmall ? 32 : 40;
  const exploreBtnPadV = isSmall ? 12 : 14;
  const exploreTextSize = isSmall ? 14 : 15;
  const cardImageSize = isSmall ? 70 : 80;
  const cardNameSize = isSmall ? 14 : 15;

  const goToPlaces = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Main',
        params: { screen: 'Places' },
      }),
    );
  };

  if (savedPlaces.length === 0) {
    return (
      <SafeScreen>
        <View style={[styles.headerWrap, { paddingHorizontal: hPad, marginTop: topShift }]}>
          <Text style={[styles.title, { fontSize: titleSize }]}>Saved Spots</Text>
          <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>0 places saved</Text>
        </View>
        <View style={[styles.emptyWrap, { paddingHorizontal: isSmall ? 28 : 40 }]}>
          <Text style={[styles.bigHeart, { fontSize: bigHeartSize }]}>🤍</Text>
          <Text style={[styles.emptyTitle, { fontSize: emptyTitleSize }]}>No saved spots yet</Text>
          <Text style={[styles.emptyText, { fontSize: emptyTextSize }]}>
            Start exploring and save your favorite places to see them here
          </Text>
          <TouchableOpacity
            style={[
              styles.exploreBtn,
              { paddingHorizontal: exploreBtnPadH, paddingVertical: exploreBtnPadV },
            ]}
            onPress={goToPlaces}
            activeOpacity={0.85}
          >
            <Text style={[styles.exploreText, { fontSize: exploreTextSize }]}>Explore Places</Text>
          </TouchableOpacity>
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <FlatList
        data={savedPlaces}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.list,
          { paddingHorizontal: hPad, paddingTop: 10 + topShift },
        ]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ marginBottom: 12 }}>
            <Text style={[styles.title, { fontSize: titleSize }]}>Saved Spots</Text>
            <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>
              {savedPlaces.length} places saved
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PlaceDetail', { placeId: item.id })}
            activeOpacity={0.9}
          >
            <Image
              source={item.image}
              style={[styles.cardImage, { width: cardImageSize, height: cardImageSize }]}
            />
            <View style={styles.cardBody}>
              <Text style={[styles.cardName, { fontSize: cardNameSize }]} numberOfLines={2}>
                {item.name}
              </Text>
              <View style={styles.metaRow}>
                <Text style={styles.starIcon}>⭐</Text>
                <Text style={styles.metaRating}>{item.rating.toFixed(1)}</Text>
                <Text style={styles.metaDot}> • </Text>
                <Text style={styles.metaCategory} numberOfLines={1}>
                  {item.categoryLabel}
                </Text>
              </View>
              <View style={styles.addressRow}>
                <Text style={styles.pinSmall}>📍</Text>
                <Text style={styles.addressText} numberOfLines={2}>
                  {item.address}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              hitSlop={12}
              onPress={() => toggleFavorite(item.id)}
              style={styles.heartBtn}
            >
              <Text style={styles.heartIcon}>❤️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    paddingTop: 10,
  },
  title: {
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  list: {
    paddingBottom: 140,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigHeart: {
    marginBottom: 20,
  },
  emptyTitle: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  exploreBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 26,
  },
  exploreText: {
    color: '#fff',
    fontWeight: '700',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardImage: {
    borderRadius: 12,
  },
  cardBody: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cardName: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  starIcon: {
    fontSize: 11,
  },
  metaRating: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  metaDot: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  metaCategory: {
    color: COLORS.textSecondary,
    fontSize: 12,
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  pinSmall: {
    fontSize: 11,
  },
  addressText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginLeft: 4,
    flex: 1,
  },
  heartBtn: {
    padding: 4,
  },
  heartIcon: {
    fontSize: 18,
  },
});

export default SavedScreen;