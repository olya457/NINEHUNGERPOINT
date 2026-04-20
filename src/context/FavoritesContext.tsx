import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@nhp_favorites';
const ONBOARDED_KEY = '@nhp_onboarded';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  hasOnboarded: boolean;
  completeOnboarding: () => void;
  isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const f = await AsyncStorage.getItem(FAVORITES_KEY);
        const o = await AsyncStorage.getItem(ONBOARDED_KEY);
        if (f) setFavorites(JSON.parse(f));
        if (o === 'true') setHasOnboarded(true);
      } catch (e) {}
      setIsLoaded(true);
    })();
  }, []);

  const persistFavorites = async (list: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
    } catch (e) {}
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      persistFavorites(next);
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const completeOnboarding = async () => {
    setHasOnboarded(true);
    try {
      await AsyncStorage.setItem(ONBOARDED_KEY, 'true');
    } catch (e) {}
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, hasOnboarded, completeOnboarding, isLoaded }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};