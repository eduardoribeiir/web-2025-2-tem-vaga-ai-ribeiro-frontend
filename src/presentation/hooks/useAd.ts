import { useState, useEffect } from 'react';
import { Ad } from '../../domain/entities/Ad';
import { AdsRepository } from '../../infrastructure/repositories/AdsRepository';
import { GetAdByIdUseCase } from '../../application/useCases/GetAdByIdUseCase';

const adsRepository = new AdsRepository();
const getAdByIdUseCase = new GetAdByIdUseCase(adsRepository);

export const useAd = (id: string) => {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      const data = await getAdByIdUseCase.execute(id);
      setAd(data);
      setLoading(false);
    };
    fetchAd();
  }, [id]);

  return { ad, loading };
};