import { useState, useEffect } from 'react';
import { Ad } from '../../domain/entities/Ad';
import { adsRepositoryInstance } from '../../infrastructure/repositories/adsRepositoryInstance';
import { GetAdsUseCase } from '../../application/useCases/GetAdsUseCase';

const getAdsUseCase = new GetAdsUseCase(adsRepositoryInstance);

export const useAds = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAdsUseCase.execute();
        setAds(data);
      } catch (err) {
        console.error('Erro ao buscar anúncios:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar anúncios');
        setAds([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  const getAdById = async (id: string): Promise<Ad | null> => {
    return await adsRepositoryInstance.getById(id);
  };

  return { ads, loading, error, getAdById };
};