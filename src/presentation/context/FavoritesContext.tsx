import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { httpClient } from '../../infrastructure/api/HttpClient';

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
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const init = async () => {
      if (isAuthenticated) {
        try {
          const favAds = await httpClient.get<any[]>('/favorites');
          const ids = favAds.map(a => a.id?.toString());
          setFavoritesState(ids);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
          return;
        } catch {
          // fallback to local storage
        }
      }
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavoritesState(JSON.parse(stored));
      }
    };
    init();
  }, [isAuthenticated]);

  const persist = (ids: string[]) => {
    setFavoritesState(ids);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  };

  const toggleFavorite = async (adId: string) => {
    console.log('Toggling favorite for ad:', adId, 'isAuthenticated:', isAuthenticated);
    
    if (isAuthenticated) {
      try {
        console.log('Calling API:', `/favorites/${adId}/toggle`);
        const result = await httpClient.post<{ favorited: boolean }>(`/favorites/${adId}/toggle`, {});
        console.log('API Response:', result);
        
        if (result.favorited) {
          persist(Array.from(new Set([...favorites, adId])));
        } else {
          persist(favorites.filter(id => id !== adId));
        }
        return;
      } catch (error) {
        console.error('Erro ao favoritar:', error);
        // fallback to local behavior
      }
    }
    
    // Local fallback
    console.log('Using local storage fallback');
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
