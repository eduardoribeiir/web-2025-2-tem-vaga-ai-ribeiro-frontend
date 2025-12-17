import { Ad } from '../../domain/entities/Ad';
import { IAdsRepository } from '../../domain/repositories/IAdsRepository';

export class GetAdByIdUseCase {
  constructor(private adsRepository: IAdsRepository) {}

  async execute(id: string): Promise<Ad | null> {
    return this.adsRepository.getById(id);
  }
}