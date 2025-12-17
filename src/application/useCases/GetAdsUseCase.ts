import { Ad } from '../../domain/entities/Ad';
import { IAdsRepository } from '../../domain/repositories/IAdsRepository';

export class GetAdsUseCase {
  constructor(private adsRepository: IAdsRepository) {}

  async execute(): Promise<Ad[]> {
    return this.adsRepository.getAll();
  }
}