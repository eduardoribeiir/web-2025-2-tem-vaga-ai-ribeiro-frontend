import { useState, useEffect } from 'react';
import { Ad } from '../../domain/entities/Ad';
import { adsRepositoryInstance } from '../../infrastructure/repositories/adsRepositoryInstance';
import { GetAdsUseCase } from '../../application/useCases/GetAdsUseCase';

const getAdsUseCase = new GetAdsUseCase(adsRepositoryInstance);

export const useAds = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      const data = await getAdsUseCase.execute();
      setAds(data);
      setLoading(false);
    };
    fetchAds();
  }, []);

  const getAdById = async (id: string): Promise<Ad | null> => {
    return await adsRepositoryInstance.getById(id);
  };

  return { ads, loading, getAdById };
};