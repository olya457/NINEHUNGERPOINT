import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Share,
  Platform,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';
import { COLORS } from '../theme/colors';
import { getStoryById } from '../data/stories';

type RouteType = RouteProp<RootStackParamList, 'StoryDetail'>;
type NavType = NativeStackNavigationProp<RootStackParamList>;

const StoryDetailScreen = () => {
  const route = useRoute<RouteType>();
  const navigation = useNavigation<NavType>();
  const insets = useSafeAreaInsets();
  const story = getStoryById(route.params.storyId);

  const topPad = Math.max(insets.top, 20) + (Platform.OS === 'android' ? 20 : 0);

  if (!story) return null;

  const onShare = async () => {
    try {
      await Share.share({ message: `${story.title}\n\n${story.subtitle}` });
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad }]}>
        <TouchableOpacity style={styles.roundBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.btnIcon}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundBtn} onPress={onShare}>
          <Text style={styles.btnIconSmall}>↗</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.body}>{story.content}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
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
  content: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 20,
    lineHeight: 34,
  },
  body: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 26,
  },
});

export default StoryDetailScreen;