import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (adId: string) => boolean;
  toggleFavorite: (adId: string) => void;
  setFavorites: (ids: string[]) => void;
}

const STORAGE_KEY = 'temVagaAi.favorites';

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavoritesState] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavoritesState(JSON.parse(stored));
    }
  }, []);

  const persist = (ids: string[]) => {
    setFavoritesState(ids);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  };

  const toggleFavorite = (adId: string) => {
    if (favorites.includes(adId)) {
      persist(favorites.filter(id => id !== adId));
    } else {
      persist([...favorites, adId]);
    }
  };

  const value = useMemo(
    () => ({
      favorites,
      isFavorite: (adId: string) => favorites.includes(adId),
      toggleFavorite,
      setFavorites: persist,
    }),
    [favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return ctx;
};
