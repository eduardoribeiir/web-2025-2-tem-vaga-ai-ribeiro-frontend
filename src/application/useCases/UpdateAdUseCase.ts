import { Ad } from '../../domain/entities/Ad';
import { IAdsRepository } from '../../domain/repositories/IAdsRepository';

export class UpdateAdUseCase {
  constructor(private adsRepository: IAdsRepository) {}

  async execute(id: string, updates: Partial<Ad>): Promise<Ad | null> {
    return await this.adsRepository.update(id, updates);
  }
}
