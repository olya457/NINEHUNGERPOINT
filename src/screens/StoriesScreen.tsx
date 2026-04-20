import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SafeScreen from '../components/SafeScreen';
import { STORIES } from '../data/stories';
import { RootStackParamList } from '../types';
import { COLORS } from '../theme/colors';

type NavType = NativeStackNavigationProp<RootStackParamList>;

const StoriesScreen = () => {
  const navigation = useNavigation<NavType>();

  return (
    <SafeScreen>
      <FlatList
        data={STORIES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Food Stories</Text>
            <Text style={styles.subtitle}>Explore German culinary culture</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('StoryDetail', { storyId: item.id })}
            activeOpacity={0.85}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        )}
      />
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 140,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  chevron: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default StoriesScreen;