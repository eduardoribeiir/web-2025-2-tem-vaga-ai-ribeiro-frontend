import { useState, useEffect } from 'react';
import { Ad } from '../../domain/entities/Ad';
import { adsRepositoryInstance } from '../../infrastructure/repositories/adsRepositoryInstance';
import { GetUserAdsUseCase } from '../../application/useCases/GetUserAdsUseCase';

const getUserAdsUseCase = new GetUserAdsUseCase(adsRepositoryInstance);

export const useUserAds = (userEmail: string) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAds = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserAdsUseCase.execute(userEmail);
      setAds(data);
    } catch (err) {
      console.error('Erro ao buscar anúncios do usuário:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar anúncios');
      setAds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchAds();
    }
  }, [userEmail]);

  return { ads, loading, error, refetch: fetchAds };
};