import { ImageSourcePropType } from 'react-native';

export type CategoryId = 'classic' | 'street' | 'cafes' | 'modern';

export interface Category {
  id: CategoryId;
  title: string;
  subtitle: string;
}

export interface Place {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  rating: number;
  image: ImageSourcePropType;
  shortDescription: string;
  description: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
}

export interface QuizOption {
  text: string;
  tags: CategoryId[];
  correct?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  Main: undefined;
  PlaceDetail: { placeId: string };
  StoryDetail: { storyId: string };
  QuizResult: {
    placeId: string;
    levelId: number;
    correct: number;
    total: number;
    passed: boolean;
    isLastLevel: boolean;
  };
};

export type TabParamList = {
  Places: undefined;
  Map: undefined;
  Quiz: undefined;
  Stories: undefined;
  Saved: undefined;
};