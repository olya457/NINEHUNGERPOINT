import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Share,
  Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';
import { COLORS } from '../theme/colors';
import { getPlaceById } from '../data/places';
import { useFavorites } from '../context/FavoritesContext';

type RouteType = RouteProp<RootStackParamList, 'PlaceDetail'>;
type NavType = NativeStackNavigationProp<RootStackParamList>;

const PlaceDetailScreen = () => {
  const route = useRoute<RouteType>();
  const navigation = useNavigation<NavType>();
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite } = useFavorites();
  const place = getPlaceById(route.params.placeId);
  const [mapOpen, setMapOpen] = useState(false);

  if (!place) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Place not found</Text>
      </View>
    );
  }

  const fav = isFavorite(place.id);
  const topOffset = Math.max(insets.top, 20) + (Platform.OS === 'android' ? 20 : 0);

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out ${place.name} in ${place.city}! ${place.address}`,
      });
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image source={place.image} style={styles.image} resizeMode="cover" />
          <View style={[styles.headerOverlay, { top: topOffset }]}>
            <TouchableOpacity style={styles.roundBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.btnIcon}>‹</Text>
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.roundBtn} onPress={onShare}>
                <Text style={styles.btnIconSmall}>↗</Text>
              </TouchableOpacity>
              <View style={{ width: 10 }} />
              <TouchableOpacity style={styles.roundBtn} onPress={() => toggleFavorite(place.id)}>
                <Text style={styles.btnIconSmall}>{fav ? '❤️' : '🤍'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <TouchableOpacity
            style={[styles.mapBtn, mapOpen && styles.mapBtnClose]}
            onPress={() => setMapOpen(!mapOpen)}
            activeOpacity={0.85}
          >
            <Text style={styles.mapBtnText}>
              {mapOpen ? '✕ Close Map' : '📍 View on Map'}
            </Text>
          </TouchableOpacity>

          {mapOpen && (
            <View style={styles.mapWrapper}>
              <MapView
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                style={styles.map}
                initialRegion={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
                showsUserLocation={false}
                showsMyLocationButton={false}
                showsCompass={false}
                pitchEnabled={false}
              >
                <Marker
                  coordinate={{ latitude: place.latitude, longitude: place.longitude }}
                  title={place.name}
                  description={place.address}
                  pinColor={COLORS.primary}
                />
              </MapView>
            </View>
          )}

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
  errorText: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: 80,
  },
  imageContainer: {
    height: 280,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10,22,40,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIcon: {
    color: '#fff',
    fontSize: 26,
    lineHeight: 28,
    marginTop: -2,
  },
  btnIconSmall: {
    color: '#fff',
    fontSize: 16,
  },
  body: {
    padding: 20,
  },
  mapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 26,
    marginBottom: 20,
    marginTop: -40,
  },
  mapBtnClose: {
    backgroundColor: COLORS.cardBackgroundLight,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  mapBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  mapWrapper: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardBackground,
  },
  map: {
    width: '100%',
    height: '100%',
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
    marginBottom: 16,
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
});

export default PlaceDetailScreen;