import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { Place } from '../types';
import { COLORS } from '../theme/colors';
import { useFavorites } from '../context/FavoritesContext';

interface Props {
  place: Place;
  onPress: () => void;
}

const PlaceCard: React.FC<Props> = ({ place, onPress }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(place.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={place.image} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={2}>
            {place.name}
          </Text>
          <TouchableOpacity onPress={() => toggleFavorite(place.id)} hitSlop={12}>
            <Text style={styles.heartIcon}>{fav ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {place.shortDescription}
        </Text>
        <TouchableOpacity style={styles.openBtn} onPress={onPress}>
          <Text style={styles.openBtnText}>Open</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginRight: 8,
  },
  heartIcon: {
    fontSize: 18,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  openBtn: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 6,
  },
  openBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default PlaceCard;