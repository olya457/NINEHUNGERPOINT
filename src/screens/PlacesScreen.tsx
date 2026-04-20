import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SafeScreen from '../components/SafeScreen';
import CategoryCard from '../components/CategoryCard';
import PlaceCard from '../components/PlaceCard';
import { CATEGORIES } from '../data/categories';
import { PLACES } from '../data/places';
import { CategoryId, RootStackParamList } from '../types';
import { COLORS } from '../theme/colors';

type NavType = NativeStackNavigationProp<RootStackParamList>;

const PlacesScreen = () => {
  const navigation = useNavigation<NavType>();
  const [selected, setSelected] = useState<CategoryId | null>(null);

  const filtered = useMemo(() => {
    if (!selected) return PLACES;
    return PLACES.filter(p => p.category === selected);
  }, [selected]);

  const renderHeader = () => (
    <View>
      <Text style={styles.headerTitle}>Places</Text>
      <Text style={styles.headerSubtitle}>Discover the best spots in Germany</Text>

      <View style={styles.categoriesGrid}>
        <View style={styles.categoryRow}>
          <CategoryCard
            category={CATEGORIES[0]}
            selected={selected === CATEGORIES[0].id}
            onPress={() => setSelected(selected === CATEGORIES[0].id ? null : CATEGORIES[0].id)}
          />
          <View style={{ width: 10 }} />
          <CategoryCard
            category={CATEGORIES[1]}
            selected={selected === CATEGORIES[1].id}
            onPress={() => setSelected(selected === CATEGORIES[1].id ? null : CATEGORIES[1].id)}
          />
        </View>
        <View style={{ height: 10 }} />
        <View style={styles.categoryRow}>
          <CategoryCard
            category={CATEGORIES[2]}
            selected={selected === CATEGORIES[2].id}
            onPress={() => setSelected(selected === CATEGORIES[2].id ? null : CATEGORIES[2].id)}
          />
          <View style={{ width: 10 }} />
          <CategoryCard
            category={CATEGORIES[3]}
            selected={selected === CATEGORIES[3].id}
            onPress={() => setSelected(selected === CATEGORIES[3].id ? null : CATEGORIES[3].id)}
          />
        </View>
      </View>

      <View style={{ height: 16 }} />
    </View>
  );

  return (
    <SafeScreen>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <PlaceCard
            place={item}
            onPress={() => navigation.navigate('PlaceDetail', { placeId: item.id })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 140,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 32,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
    marginBottom: 20,
  },
  categoriesGrid: {},
  categoryRow: {
    flexDirection: 'row',
  },
});

export default PlacesScreen;