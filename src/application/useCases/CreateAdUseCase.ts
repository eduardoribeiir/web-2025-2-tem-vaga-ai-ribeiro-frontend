import { Ad } from '../../domain/entities/Ad';
import { IAdsRepository } from '../../domain/repositories/IAdsRepository';

export class CreateAdUseCase {
  constructor(private adsRepository: IAdsRepository) {}

  async execute(ad: Omit<Ad, 'id'>): Promise<Ad> {
    return this.adsRepository.create(ad);
  }
}
