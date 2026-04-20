import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Category } from '../types';
import { COLORS } from '../theme/colors';

interface Props {
  category: Category;
  selected: boolean;
  onPress: () => void;
}

const CategoryCard: React.FC<Props> = ({ category, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.title, selected && styles.titleSelected]}>{category.title}</Text>
      <Text style={[styles.subtitle, selected && styles.subtitleSelected]}>
        {category.subtitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14,
    padding: 14,
    minHeight: 86,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  titleSelected: {
    color: '#fff',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  subtitleSelected: {
    color: 'rgba(255,255,255,0.9)',
  },
});

export default CategoryCard;