/**
 * Get Ads Use Case - With filtering and sorting logic
 */
import { Ad } from '../../domain/entities/Ad';
import { IAdsRepository } from '../../domain/repositories/IAdsRepository';

export interface GetAdsFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  bedrooms?: number;
  status?: string;
}

export class GetAdsUseCaseRefactored {
  constructor(private adsRepository: IAdsRepository) {}

  async execute(filters?: GetAdsFilters): Promise<Ad[]> {
    // Get all ads from repository
    const ads = await this.adsRepository.getAll();

    // Apply client-side filtering if needed
    // (In a real app, this should be done server-side)
    return this.applyFilters(ads, filters);
  }

  private applyFilters(ads: Ad[], filters?: GetAdsFilters): Ad[] {
    if (!filters) return ads;

    return ads.filter(ad => {
      if (filters.category && ad.category !== filters.category) {
        return false;
      }

      if (filters.minPrice !== undefined && ad.price !== undefined && ad.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice !== undefined && ad.price !== undefined && ad.price > filters.maxPrice) {
        return false;
      }

      if (filters.location && !ad.location?.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      if (filters.bedrooms !== undefined && ad.bedrooms !== filters.bedrooms) {
        return false;
      }

      if (filters.status && ad.status !== filters.status) {
        return false;
      }

      return true;
    });
  }

  /**
   * Sort ads by price
   */
  sortByPrice(ads: Ad[], ascending: boolean = true): Ad[] {
    return [...ads].sort((a, b) => {
      const aPrice = a.price ?? 0;
      const bPrice = b.price ?? 0;
      return ascending ? aPrice - bPrice : bPrice - aPrice;
    });
  }

  /**
   * Sort ads by date (newest first)
   */
  sortByDate(ads: Ad[]): Ad[] {
    return [...ads].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
  }
}
