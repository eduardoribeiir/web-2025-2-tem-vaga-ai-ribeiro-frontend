import { Ad } from '../../domain/entities/Ad';
import { IAdsRepository } from '../../domain/repositories/IAdsRepository';

export class GetUserAdsUseCase {
  constructor(private adsRepository: IAdsRepository) {}

  async execute(userEmail: string): Promise<Ad[]> {
    return this.adsRepository.getByUser(userEmail);
  }
}