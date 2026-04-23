import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Linking,
  Share,
  Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PLACES } from '../data/places';
import { Place } from '../types';
import { COLORS } from '../theme/colors';
import { useFavorites } from '../context/FavoritesContext';

const INITIAL_REGION: Region = {
  latitude: 51.1657,
  longitude: 10.4515,
  latitudeDelta: 6,
  longitudeDelta: 6,
};

const { width: SCREEN_W } = Dimensions.get('window');

const MapScreen = () => {
  const insets = useSafeAreaInsets();
  const [preview, setPreview] = useState<Place | null>(null);
  const [selected, setSelected] = useState<Place | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const mapRef = useRef<MapView>(null);
  const regionRef = useRef<Region>(INITIAL_REGION);

  const topOffset = Math.max(insets.top, 20) + (Platform.OS === 'android' ? 20 : 0);

  const onRegionChangeComplete = (r: Region) => {
    regionRef.current = r;
  };

  const focusOnPlace = (place: Place) => {
    mapRef.current?.animateToRegion(
      {
        latitude: place.latitude,
        longitude: place.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      500,
    );
    setPreview(place);
  };

  const resetView = () => {
    mapRef.current?.animateToRegion(INITIAL_REGION, 500);
    setPreview(null);
  };

  const zoomIn = () => {
    const r = regionRef.current;
    mapRef.current?.animateToRegion(
      {
        latitude: r.latitude,
        longitude: r.longitude,
        latitudeDelta: Math.max(r.latitudeDelta / 2, 0.002),
        longitudeDelta: Math.max(r.longitudeDelta / 2, 0.002),
      },
      300,
    );
  };

  const zoomOut = () => {
    const r = regionRef.current;
    mapRef.current?.animateToRegion(
      {
        latitude: r.latitude,
        longitude: r.longitude,
        latitudeDelta: Math.min(r.latitudeDelta * 2, 180),
        longitudeDelta: Math.min(r.longitudeDelta * 2, 180),
      },
      300,
    );
  };

  if (selected) {
    const fav = isFavorite(selected.id);

    const onShare = async () => {
      try {
        await Share.share({
          message: `Check out ${selected.name} in ${selected.city}! ${selected.address}`,
        });
      } catch (e) {}
    };

    const openInMaps = () => {
      const url = Platform.select({
        ios: `maps:0,0?q=${selected.latitude},${selected.longitude}`,
        android: `geo:0,0?q=${selected.latitude},${selected.longitude}`,
      });
      if (url) Linking.openURL(url);
    };

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imageContainer}>
            <Image source={selected.image} style={styles.image} resizeMode="cover" />
            <View style={[styles.headerOverlay, { top: topOffset }]}>
              <TouchableOpacity style={styles.roundBtn} onPress={() => setSelected(null)}>
                <Text style={styles.btnIcon}>‹</Text>
              </TouchableOpacity>
              <View style={styles.headerRight}>
                <TouchableOpacity style={styles.roundBtn} onPress={onShare}>
                  <Text style={styles.btnIconSmall}>↗</Text>
                </TouchableOpacity>
                <View style={{ width: 10 }} />
                <TouchableOpacity
                  style={styles.roundBtn}
                  onPress={() => toggleFavorite(selected.id)}
                >
                  <Text style={styles.btnIconSmall}>{fav ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <TouchableOpacity style={styles.mapBtn} onPress={openInMaps} activeOpacity={0.85}>
              <Text style={styles.mapBtnText}>📍 View on Map</Text>
            </TouchableOpacity>
            <Text style={styles.name}>{selected.name}</Text>
            <Text style={styles.description}>{selected.description}</Text>

            <View style={styles.infoCard}>
              <Text style={styles.pinIcon}>📍</Text>
              <View style={styles.infoTextWrap}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{selected.address}</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.pinIcon}>📍</Text>
              <View style={styles.infoTextWrap}>
                <Text style={styles.infoLabel}>Coordinates</Text>
                <Text style={styles.infoValue}>
                  {selected.latitude.toFixed(4)}° N, {selected.longitude.toFixed(4)}° E
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        onRegionChangeComplete={onRegionChangeComplete}
        onPress={() => setPreview(null)}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        rotateEnabled={true}
        pitchEnabled={false}
      >
        {PLACES.map(p => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.latitude, longitude: p.longitude }}
            pinColor={COLORS.primary}
            onPress={(e) => {
              e.stopPropagation?.();
              focusOnPlace(p);
            }}
          />
        ))}
      </MapView>

      <View style={[styles.mapHeader, { top: topOffset }]} pointerEvents="none">
        <Text style={styles.mapTitle}>Map View</Text>
        <Text style={styles.mapSubtitle}>Explore locations across Germany</Text>
      </View>

      <View style={styles.controlsColumn} pointerEvents="box-none">
        <TouchableOpacity style={styles.ctrlBtn} onPress={zoomIn} activeOpacity={0.85}>
          <Text style={styles.ctrlBtnText}>＋</Text>
        </TouchableOpacity>
        <View style={styles.ctrlDivider} />
        <TouchableOpacity style={styles.ctrlBtn} onPress={zoomOut} activeOpacity={0.85}>
          <Text style={styles.ctrlBtnText}>−</Text>
        </TouchableOpacity>
        <View style={styles.ctrlDivider} />
        <TouchableOpacity style={styles.ctrlBtn} onPress={resetView} activeOpacity={0.85}>
          <Text style={styles.ctrlBtnTextSmall}>🧭</Text>
        </TouchableOpacity>
      </View>

      {preview && (
        <View style={styles.previewWrap} pointerEvents="box-none">
          <View style={styles.previewCard}>
            <TouchableOpacity
              style={styles.previewClose}
              onPress={() => setPreview(null)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.previewCloseText}>✕</Text>
            </TouchableOpacity>

            <Image source={preview.image} style={styles.previewImage} resizeMode="cover" />

            <View style={styles.previewBody}>
              <Text style={styles.previewTitle} numberOfLines={1}>
                {preview.name}
              </Text>
              {!!preview.city && (
                <Text style={styles.previewCity} numberOfLines={1}>
                  {preview.city}
                </Text>
              )}

              <TouchableOpacity
                style={styles.previewOpenBtn}
                activeOpacity={0.85}
                onPress={() => {
                  const p = preview;
                  setPreview(null);
                  setSelected(p);
                }}
              >
                <Text style={styles.previewOpenText}>Open</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const CARD_WIDTH = Math.min(SCREEN_W - 48, 340);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mapHeader: {
    position: 'absolute',
    left: 20,
    right: 80,
  },
  mapTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.85)',
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 1 },
  },
  mapSubtitle: {
    color: '#E6E6E6',
    fontSize: 14,
    marginTop: 2,
    textShadowColor: 'rgba(0,0,0,0.85)',
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 1 },
  },

  controlsColumn: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -82 }],
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  ctrlBtn: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctrlBtnText: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 26,
  },
  ctrlBtnTextSmall: {
    fontSize: 20,
  },
  ctrlDivider: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  previewWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  previewClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(10,22,40,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewCloseText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  previewImage: {
    width: '100%',
    height: 160,
  },
  previewBody: {
    padding: 14,
  },
  previewTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  previewCity: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 2,
    marginBottom: 12,
  },
  previewOpenBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 22,
    alignItems: 'center',
    marginTop: 4,
  },
  previewOpenText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
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
  mapBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
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

export default MapScreen;