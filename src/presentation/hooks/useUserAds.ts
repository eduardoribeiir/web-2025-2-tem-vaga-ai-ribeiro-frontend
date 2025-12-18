import { useState, useEffect } from 'react';
import { Ad } from '../../domain/entities/Ad';
import { adsRepositoryInstance } from '../../infrastructure/repositories/adsRepositoryInstance';
import { GetUserAdsUseCase } from '../../application/useCases/GetUserAdsUseCase';

const getUserAdsUseCase = new GetUserAdsUseCase(adsRepositoryInstance);

export const useUserAds = (userEmail: string) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAds = async () => {
    setLoading(true);
    const data = await getUserAdsUseCase.execute(userEmail);
    setAds(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAds();
  }, [userEmail]);

  return { ads, loading, refetch: fetchAds };
};