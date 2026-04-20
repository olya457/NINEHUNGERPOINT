import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafeScreen from '../components/SafeScreen';
import { QUIZ_LEVELS, getLevelById, PASS_THRESHOLD } from '../data/quiz';
import { PLACES } from '../data/places';
import { RootStackParamList, CategoryId } from '../types';
import { COLORS } from '../theme/colors';

type NavType = NativeStackNavigationProp<RootStackParamList>;

const STORAGE_KEY = 'quiz_current_level_v1';

const QuizScreen = () => {
  const navigation = useNavigation<NavType>();
  const { width, height } = useWindowDimensions();
  const isSmall = width < 360 || height < 680;

  const topShift = 20;
  const hPad = isSmall ? 16 : 20;
  const titleSize = isSmall ? 26 : 30;
  const subtitleSize = isSmall ? 13 : 14;
  const questionSize = isSmall ? 17 : 20;
  const optionTextSize = isSmall ? 14 : 15;
  const optionPadV = isSmall ? 14 : 18;
  const optionPadH = isSmall ? 16 : 20;
  const spacerHeight = isSmall ? 24 : 40;
  const badgeSize = isSmall ? 11 : 12;

  const [currentLevelId, setCurrentLevelId] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({});

  const loadLevel = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = stored ? parseInt(stored, 10) : 1;
      const safe =
        isNaN(parsed) || parsed < 1
          ? 1
          : parsed > QUIZ_LEVELS.length
          ? QUIZ_LEVELS.length
          : parsed;
      setCurrentLevelId(safe);
    } catch {
      setCurrentLevelId(1);
    }
    setStep(0);
    setCorrectCount(0);
    setTagCounts({});
  };

  useEffect(() => {
    loadLevel();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadLevel();
    }, []),
  );

  if (currentLevelId === null) {
    return (
      <SafeScreen>
        <View style={styles.loading}>
          <ActivityIndicator color={COLORS.primary} />
        </View>
      </SafeScreen>
    );
  }

  const level = getLevelById(currentLevelId);
  const question = level.questions[step];
  const totalQuestions = level.questions.length;

  const handleAnswer = async (optionIndex: number) => {
    const option = question.options[optionIndex];
    const isCorrect = !!option.correct;

    const newCorrect = correctCount + (isCorrect ? 1 : 0);
    const newCounts = { ...tagCounts };
    option.tags.forEach(tag => {
      newCounts[tag] = (newCounts[tag] || 0) + 1;
    });

    if (step < totalQuestions - 1) {
      setCorrectCount(newCorrect);
      setTagCounts(newCounts);
      setStep(step + 1);
      return;
    }

    let bestTag: CategoryId = 'classic';
    let bestCount = -1;
    (Object.keys(newCounts) as CategoryId[]).forEach(tag => {
      if (newCounts[tag] > bestCount) {
        bestCount = newCounts[tag];
        bestTag = tag;
      }
    });

    const candidates = PLACES.filter(p => p.category === bestTag);
    const pick =
      candidates.length > 0
        ? candidates.sort((a, b) => b.rating - a.rating)[0]
        : PLACES[0];

    const passed = newCorrect >= PASS_THRESHOLD;
    const isLastLevel = level.id >= QUIZ_LEVELS.length;

    if (passed && !isLastLevel) {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, String(level.id + 1));
      } catch {}
    }

    setStep(0);
    setCorrectCount(0);
    setTagCounts({});

    navigation.navigate('QuizResult', {
      placeId: pick.id,
      levelId: level.id,
      correct: newCorrect,
      total: totalQuestions,
      passed,
      isLastLevel,
    });
  };

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingHorizontal: hPad, paddingTop: 10 + topShift },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressRow}>
          {level.questions.map((_, i) => (
            <View
              key={i}
              style={[styles.progressDot, i <= step && styles.progressDotActive]}
            />
          ))}
          <Text style={styles.progressText}>
            {step + 1}/{totalQuestions}
          </Text>
        </View>

        <Text style={[styles.levelBadge, { fontSize: badgeSize }]}>
          LEVEL {level.id} · {level.title}
        </Text>
        <Text style={[styles.title, { fontSize: titleSize }]}>Hunger Check</Text>
        <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>
          Score {PASS_THRESHOLD}/{totalQuestions} correct to unlock the next level
        </Text>

        <View style={{ height: spacerHeight }} />

        <Text style={[styles.question, { fontSize: questionSize }]}>
          {question.question}
        </Text>

        <View style={styles.optionsWrap}>
          {question.options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.option,
                { paddingVertical: optionPadV, paddingHorizontal: optionPadH },
              ]}
              onPress={() => handleAnswer(i)}
              activeOpacity={0.8}
            >
              <Text style={[styles.optionText, { fontSize: optionTextSize }]}>
                {opt.text}
              </Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 140,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressDot: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.cardBackgroundLight,
    marginRight: 4,
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
  },
  progressText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginLeft: 8,
  },
  levelBadge: {
    color: COLORS.primary,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  question: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsWrap: {
    marginTop: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    flex: 1,
    paddingRight: 10,
  },
  chevron: {
    color: COLORS.textMuted,
    fontSize: 22,
    fontWeight: '600',
  },
});

export default QuizScreen;